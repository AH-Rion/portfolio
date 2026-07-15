
# Backend Wiring Plan (Supabase)

Frontend design stays exactly as-is. All work is in data layer, contexts, and the admin panel's auth check.

## 1. Database schema (migration)

**`portfolio_data`** — single-row JSON store for site content
- `id` (text, PK, default `'main'`)
- `data` (jsonb) — matches the current `PortfolioData` shape
- `updated_at` (timestamptz)
- RLS: `SELECT` public (anon + authenticated); `UPDATE`/`INSERT` only admins (via `has_role`)

**`app_role`** enum: `admin`, `user`

**`user_roles`**
- `id` uuid PK, `user_id` uuid → `auth.users`, `role` app_role, unique(user_id, role)
- RLS: users read their own roles; only admins manage
- `has_role(_user_id, _role)` security-definer function

**`contact_messages`**
- `id` uuid PK, `name`, `email`, `message`, `created_at`
- RLS: `INSERT` allowed for anon + authenticated (with zod validation client-side + length checks server-side via check constraints); `SELECT`/`DELETE` admin-only

All tables get proper GRANTs to `anon`/`authenticated`/`service_role` per policy scope.

## 2. Storage

Create public bucket `portfolio-images` for profile photo + project screenshots.
- RLS on `storage.objects`: public read; insert/update/delete restricted to admins.

## 3. Frontend integration (no visual changes)

- **`src/integrations/supabase/client.ts`** — Supabase client using the connected project's URL + publishable key.
- **`src/contexts/PortfolioContext.tsx`** — replace `localStorage` with:
  - Load: `select data from portfolio_data where id='main'` on mount (fallback to defaults if empty).
  - Save: debounced upsert when admin edits.
  - Realtime subscription so open tabs stay in sync.
- **`src/contexts/AdminContext.tsx`** — replace hardcoded password with Supabase auth:
  - `login(email, password)` → `signInWithPassword` → check `has_role(uid, 'admin')`; reject non-admins.
  - `logout()` → `signOut`.
  - `isAdmin` derived from session + role check via `onAuthStateChange`.
  - Keep the same public API (`isAdmin`, `isEditMode`, `login`, `logout`, `toggleEditMode`) so no other component changes.
  - Admin login modal UI stays the same, just adds an email field.
- **`AdminPanel.tsx` image upload** — upload file to `portfolio-images` bucket, store returned public URL in `data.projects[i].image` / `data.profileImage` (instead of base64 in localStorage).
- **`ContactSection.tsx`** — on submit, zod-validate then `insert` into `contact_messages`; show toast on success/error. No layout change.

## 4. First admin user

After deploy, you sign up once via the login modal, then I'll run a one-time SQL insert to grant your user the `admin` role. Everyone else who signs up gets no role and can't edit.

## Technical notes

- Password reset flow deferred — can add later with a `/reset-password` route.
- Realtime is opt-in on the `portfolio_data` table (enabled in migration).
- Zod schemas added for portfolio JSON write + contact form.
- Existing localStorage data is not auto-migrated; on first admin save, defaults or your edits become the source of truth in Supabase.
