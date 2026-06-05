import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, Pencil, Eye, Settings, X, RotateCcw, Save, ChevronDown, ChevronRight, Plus, Trash2, Upload, ImageIcon, KeyRound } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { usePortfolio, PortfolioData } from "@/contexts/PortfolioContext";
import { toast } from "sonner";

const AdminLoginButton = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const { login } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success("Admin access granted!");
      setShowLogin(false);
      setPassword("");
    } else {
      toast.error("Wrong password");
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setShowLogin(true)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass text-muted-foreground hover:text-primary transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Admin Login"
      >
        <Lock size={18} />
      </motion.button>

      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowLogin(false)}
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 w-full max-w-sm glow-box"
            >
              <h3 className="text-xl font-bold mb-4 gradient-text">Admin Login</h3>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary mb-4"
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium"
              >
                Login
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ChangePasswordModal = ({ onClose }: { onClose: () => void }) => {
  const { changePassword } = useAdmin();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (next.length < 4) {
      toast.error("New password must be at least 4 characters");
      return;
    }
    if (next !== confirm) {
      toast.error("Passwords don't match");
      return;
    }
    if (changePassword(current, next)) {
      toast.success("Password changed successfully!");
      onClose();
    } else {
      toast.error("Current password is incorrect");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.form
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-8 w-full max-w-sm glow-box space-y-3"
      >
        <h3 className="text-xl font-bold gradient-text mb-2">Change Password</h3>
        <input
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder="Current password"
          className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          autoFocus
        />
        <input
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          placeholder="New password (min 4 chars)"
          className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm new password"
          className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
        />
        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl glass text-muted-foreground hover:text-foreground font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium"
          >
            Update
          </button>
        </div>
        <p className="text-xs text-muted-foreground text-center pt-1">
          Stored locally in this browser. Default: <code>admin123</code>
        </p>
      </motion.form>
    </motion.div>
  );
};

const AdminToolbar = () => {
  const { isEditMode, toggleEditMode, logout } = useAdmin();
  const [showPanel, setShowPanel] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-[90] glass border-b border-primary/20 px-4 py-2 flex items-center justify-between md:ml-[72px]"
      >
        <div className="flex items-center gap-2">
          <Settings size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Admin Mode</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleEditMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isEditMode
                ? "bg-primary text-primary-foreground"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {isEditMode ? <Eye size={14} /> : <Pencil size={14} />}
            {isEditMode ? "Preview" : "Edit Mode"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPanel(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium glass text-muted-foreground hover:text-foreground"
          >
            <Settings size={14} />
            Full Editor
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium glass text-muted-foreground hover:text-foreground"
            title="Change Password"
          >
            <KeyRound size={14} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium glass text-muted-foreground hover:text-destructive"
          >
            <LogOut size={14} />
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showPanel && <FullEditorPanel onClose={() => setShowPanel(false)} />}
        {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />}
      </AnimatePresence>
    </>
  );
};


// Collapsible section for the editor
const EditorSection = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-muted/30 transition-colors"
      >
        {title}
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImageUpload = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-border" />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-muted/50 border border-border flex items-center justify-center">
            <ImageIcon size={20} className="text-muted-foreground" />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs bg-primary/10 text-primary cursor-pointer hover:bg-primary/20 transition-colors">
            <Upload size={12} />
            Upload
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
          {value && (
            <button onClick={() => onChange("")} className="text-xs text-destructive hover:underline">Remove</button>
          )}
        </div>
      </div>
    </div>
  );
};

const FieldInput = ({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) => (
  <div>
    <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary resize-none"
      />
    ) : (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
      />
    )}
  </div>
);

const NumberInput = ({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) => (
  <div>
    <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
    />
  </div>
);

const FullEditorPanel = ({ onClose }: { onClose: () => void }) => {
  const { data, updateData, resetData } = usePortfolio();
  const [draft, setDraft] = useState<PortfolioData>(JSON.parse(JSON.stringify(data)));

  const update = (path: string, value: any) => {
    const newDraft = JSON.parse(JSON.stringify(draft));
    const keys = path.split(".");
    let obj = newDraft;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setDraft(newDraft);
  };

  const save = () => {
    updateData(draft);
    toast.success("Portfolio updated!");
    onClose();
  };

  const handleReset = () => {
    resetData();
    toast.success("Reset to defaults!");
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg h-full bg-background border-l border-border overflow-y-auto"
      >
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold gradient-text">Portfolio Editor</h2>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs glass text-muted-foreground hover:text-destructive"
            >
              <RotateCcw size={12} />
              Reset
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={save}
              className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs bg-primary text-primary-foreground font-medium"
            >
              <Save size={12} />
              Save
            </motion.button>
            <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Profile Image */}
          <EditorSection title="📸 Profile Photo" defaultOpen>
            <ImageUpload label="Profile Photo (used in Hero & About)" value={draft.profileImage} onChange={(v) => update("profileImage", v)} />
          </EditorSection>

          {/* Hero */}
          <EditorSection title="🏠 Hero Section">
            <FieldInput label="Name" value={draft.hero.name} onChange={(v) => update("hero.name", v)} />
            <FieldInput label="Initials" value={draft.hero.initials} onChange={(v) => update("hero.initials", v)} />
            <FieldInput label="Subtitle" value={draft.hero.subtitle} onChange={(v) => update("hero.subtitle", v)} />
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Roles (comma-separated)</label>
              <input
                value={draft.hero.roles.join(", ")}
                onChange={(e) => update("hero.roles", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <FieldInput label="CV URL" value={draft.hero.cvUrl} onChange={(v) => update("hero.cvUrl", v)} />
          </EditorSection>

          {/* About */}
          <EditorSection title="👤 About Section">
            <FieldInput label="Title" value={draft.about.title} onChange={(v) => update("about.title", v)} />
            <FieldInput label="Highlight Word" value={draft.about.highlight} onChange={(v) => update("about.highlight", v)} />
            <FieldInput label="Description" value={draft.about.description} onChange={(v) => update("about.description", v)} multiline />
            <FieldInput label="Expanded Description" value={draft.about.expandedDescription} onChange={(v) => update("about.expandedDescription", v)} multiline />
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground font-semibold">Stats</label>
              {draft.about.stats.map((stat, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <FieldInput label="Label" value={stat.label} onChange={(v) => { const s = [...draft.about.stats]; s[i] = { ...s[i], label: v }; update("about.stats", s); }} />
                  <NumberInput label="Value" value={stat.value} onChange={(v) => { const s = [...draft.about.stats]; s[i] = { ...s[i], value: v }; update("about.stats", s); }} />
                  <FieldInput label="Suffix" value={stat.suffix} onChange={(v) => { const s = [...draft.about.stats]; s[i] = { ...s[i], suffix: v }; update("about.stats", s); }} />
                </div>
              ))}
            </div>
          </EditorSection>

          {/* Skills */}
          <EditorSection title="⚡ Skills Section">
            {Object.keys(draft.skills.categories).map((cat) => (
              <div key={cat} className="space-y-2">
                <label className="text-xs font-semibold text-primary">{cat}</label>
                {draft.skills.categories[cat].map((skill, i) => (
                  <div key={i} className="flex gap-2 items-end">
                    <FieldInput label="Skill" value={skill.name} onChange={(v) => {
                      const c = { ...draft.skills.categories };
                      c[cat] = [...c[cat]];
                      c[cat][i] = { ...c[cat][i], name: v };
                      update("skills.categories", c);
                    }} />
                    <NumberInput label="Level %" value={skill.level} onChange={(v) => {
                      const c = { ...draft.skills.categories };
                      c[cat] = [...c[cat]];
                      c[cat][i] = { ...c[cat][i], level: Math.min(100, Math.max(0, v)) };
                      update("skills.categories", c);
                    }} />
                    <button onClick={() => {
                      const c = { ...draft.skills.categories };
                      c[cat] = c[cat].filter((_, idx) => idx !== i);
                      update("skills.categories", c);
                    }} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const c = { ...draft.skills.categories };
                    c[cat] = [...c[cat], { name: "New Skill", level: 50 }];
                    update("skills.categories", c);
                  }}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <Plus size={12} /> Add Skill
                </button>
              </div>
            ))}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Secondary Skills (comma-separated)</label>
              <input
                value={draft.skills.secondarySkills.join(", ")}
                onChange={(e) => update("skills.secondarySkills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                className="w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </EditorSection>

          {/* Projects */}
          <EditorSection title="🚀 Projects">
            {draft.projects.map((project, i) => (
              <div key={i} className="border border-border/30 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-primary">Project {i + 1}</span>
                  <button onClick={() => update("projects", draft.projects.filter((_, idx) => idx !== i))} className="text-destructive">
                    <Trash2 size={14} />
                  </button>
                </div>
                <FieldInput label="Title" value={project.title} onChange={(v) => { const p = [...draft.projects]; p[i] = { ...p[i], title: v }; update("projects", p); }} />
                <FieldInput label="Category" value={project.category} onChange={(v) => { const p = [...draft.projects]; p[i] = { ...p[i], category: v }; update("projects", p); }} />
                <FieldInput label="Description" value={project.description} onChange={(v) => { const p = [...draft.projects]; p[i] = { ...p[i], description: v }; update("projects", p); }} multiline />
                <FieldInput label="Tech (comma-separated)" value={project.tech.join(", ")} onChange={(v) => { const p = [...draft.projects]; p[i] = { ...p[i], tech: v.split(",").map(s => s.trim()).filter(Boolean) }; update("projects", p); }} />
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted-foreground">Featured</label>
                  <input
                    type="checkbox"
                    checked={!!project.featured}
                    onChange={(e) => { const p = [...draft.projects]; p[i] = { ...p[i], featured: e.target.checked }; update("projects", p); }}
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => update("projects", [...draft.projects, { id: Date.now(), title: "New Project", category: "Web Apps", description: "", tech: [], featured: false }])}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Plus size={12} /> Add Project
            </button>
          </EditorSection>

          {/* Experience */}
          <EditorSection title="💼 Experience">
            {draft.experience.map((exp, i) => (
              <div key={i} className="border border-border/30 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-primary">Experience {i + 1}</span>
                  <button onClick={() => update("experience", draft.experience.filter((_, idx) => idx !== i))} className="text-destructive">
                    <Trash2 size={14} />
                  </button>
                </div>
                <FieldInput label="Company" value={exp.company} onChange={(v) => { const e = [...draft.experience]; e[i] = { ...e[i], company: v }; update("experience", e); }} />
                <FieldInput label="Role" value={exp.role} onChange={(v) => { const e = [...draft.experience]; e[i] = { ...e[i], role: v }; update("experience", e); }} />
                <FieldInput label="Date" value={exp.date} onChange={(v) => { const e = [...draft.experience]; e[i] = { ...e[i], date: v }; update("experience", e); }} />
                <FieldInput label="Description" value={exp.description} onChange={(v) => { const e = [...draft.experience]; e[i] = { ...e[i], description: v }; update("experience", e); }} multiline />
                <FieldInput label="Tech (comma-separated)" value={exp.tech.join(", ")} onChange={(v) => { const e = [...draft.experience]; e[i] = { ...e[i], tech: v.split(",").map(s => s.trim()).filter(Boolean) }; update("experience", e); }} />
              </div>
            ))}
            <button
              onClick={() => update("experience", [...draft.experience, { company: "Company", role: "Role", date: "2024", description: "", tech: [] }])}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Plus size={12} /> Add Experience
            </button>
          </EditorSection>

          {/* Testimonials */}
          <EditorSection title="💬 Testimonials">
            {draft.testimonials.map((t, i) => (
              <div key={i} className="border border-border/30 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-primary">Testimonial {i + 1}</span>
                  <button onClick={() => update("testimonials", draft.testimonials.filter((_, idx) => idx !== i))} className="text-destructive">
                    <Trash2 size={14} />
                  </button>
                </div>
                <FieldInput label="Name" value={t.name} onChange={(v) => { const ts = [...draft.testimonials]; ts[i] = { ...ts[i], name: v }; update("testimonials", ts); }} />
                <FieldInput label="Role" value={t.role} onChange={(v) => { const ts = [...draft.testimonials]; ts[i] = { ...ts[i], role: v }; update("testimonials", ts); }} />
                <FieldInput label="Text" value={t.text} onChange={(v) => { const ts = [...draft.testimonials]; ts[i] = { ...ts[i], text: v }; update("testimonials", ts); }} multiline />
                <NumberInput label="Rating (1-5)" value={t.rating} onChange={(v) => { const ts = [...draft.testimonials]; ts[i] = { ...ts[i], rating: Math.min(5, Math.max(1, v)) }; update("testimonials", ts); }} />
              </div>
            ))}
            <button
              onClick={() => update("testimonials", [...draft.testimonials, { name: "New Client", role: "Role", text: "", rating: 5 }])}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Plus size={12} /> Add Testimonial
            </button>
          </EditorSection>

          {/* Contact */}
          <EditorSection title="📧 Contact Info">
            <FieldInput label="Email" value={draft.contact.email} onChange={(v) => update("contact.email", v)} />
            <FieldInput label="Phone" value={draft.contact.phone} onChange={(v) => update("contact.phone", v)} />
            <FieldInput label="Location" value={draft.contact.location} onChange={(v) => update("contact.location", v)} />
            {draft.contact.socials.map((s, i) => (
              <div key={i} className="flex gap-2 items-end">
                <FieldInput label="Platform" value={s.platform} onChange={(v) => { const soc = [...draft.contact.socials]; soc[i] = { ...soc[i], platform: v }; update("contact.socials", soc); }} />
                <FieldInput label="URL" value={s.url} onChange={(v) => { const soc = [...draft.contact.socials]; soc[i] = { ...soc[i], url: v }; update("contact.socials", soc); }} />
                <button onClick={() => update("contact.socials", draft.contact.socials.filter((_, idx) => idx !== i))} className="p-2 text-destructive">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </EditorSection>

          {/* Footer */}
          <EditorSection title="📋 Footer">
            <FieldInput label="Name" value={draft.footer.name} onChange={(v) => update("footer.name", v)} />
            <FieldInput label="Tagline" value={draft.footer.tagline} onChange={(v) => update("footer.tagline", v)} />
          </EditorSection>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AdminPanel = () => {
  const { isAdmin } = useAdmin();

  if (!isAdmin) return <AdminLoginButton />;
  return <AdminToolbar />;
};

export default AdminPanel;
