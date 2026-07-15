import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send } from "lucide-react";
import useScrollAnimation, { fadeInUp, staggerContainer } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const iconMap: Record<string, any> = { GitHub: Github, LinkedIn: Linkedin, Twitter: Twitter, Email: Mail };

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const ContactSection = () => {
  const { ref, isInView } = useScrollAnimation(0.15);
  const { data } = usePortfolio();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Invalid input");
      return;
    }
    setSending(true);
    const { name, email, message } = parsed.data;
    const { error } = await supabase.from("contact_messages").insert({ name, email, message });

    setSending(false);
    if (error) {
      toast.error("Failed to send message. Please try again.");
      return;
    }
    toast.success("Message sent successfully.");
    setForm({ name: "", email: "", message: "" });
  };


  return (
    <section id="contact" className="section-padding">
      <div className="container-narrow">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <motion.p variants={fadeInUp} className="label-eyebrow mb-4">
            Contact
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl font-extrabold mb-5 text-[#3D4852]"
          >
            Let's Work Together
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-[#6B7280] leading-[1.7]">
            Open to freelance projects, full-time roles, and collaborations. Drop a line — I reply within 24 hours.
          </motion.p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={onSubmit}
            className="neu-card p-8 md:p-10 space-y-5"
          >
            <input
              required
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="neu-input"
            />
            <input
              required
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="neu-input"
            />
            <textarea
              required
              rows={5}
              placeholder="Tell me about your project…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="neu-input resize-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="neu-btn-primary w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm disabled:opacity-60"
            >
              {sending ? "Sending…" : (<><Send size={16} /> Send Message</>)}
            </button>
          </motion.form>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <a
              href={`mailto:${data.contact.email}`}
              className="neu-chip"
            >
              <Mail size={14} className="text-[#6C63FF]" /> {data.contact.email}
            </a>
            {data.contact.socials.map((s) => {
              const Icon = iconMap[s.platform] || Github;
              return (
                <a key={s.platform} href={s.url} className="neu-chip">
                  <Icon size={14} className="text-[#6C63FF]" /> {s.platform}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
