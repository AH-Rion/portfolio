import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";
import useScrollAnimation, { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/hooks/useScrollAnimation";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { toast } from "sonner";

const iconMap: Record<string, any> = { GitHub: Github, LinkedIn: Linkedin, Twitter: Twitter };

const ContactSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const { data } = usePortfolio();
  const { contact } = data;
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const contactInfo = [
    { icon: Mail, label: "Email", value: contact.email },
    { icon: Phone, label: "Phone", value: contact.phone },
    { icon: MapPin, label: "Location", value: contact.location },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "show" : "hidden"} variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <p className="text-primary font-mono text-sm tracking-widest mb-2">GET IN TOUCH</p>
            <h2 className="text-3xl md:text-4xl font-bold">Let's <span className="gradient-text">Connect</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={fadeInLeft}>
              <p className="text-muted-foreground leading-relaxed mb-8">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</p>
              <div className="space-y-6 mb-10">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <motion.div key={info.label} whileHover={{ x: 5 }} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl glass flex items-center justify-center text-primary glow-box"><Icon size={20} /></div>
                      <div><p className="text-sm text-muted-foreground">{info.label}</p><p className="font-medium">{info.value}</p></div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="flex gap-3">
                {contact.socials.map((social) => {
                  const Icon = iconMap[social.platform] || Github;
                  return (
                    <motion.a key={social.platform} href={social.url} whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.9 }} className="w-11 h-11 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
            <motion.form variants={fadeInRight} onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: "name" as const, label: "Name", type: "text" },
                { name: "email" as const, label: "Email", type: "email" },
                { name: "subject" as const, label: "Subject", type: "text" },
              ].map((field) => (
                <div key={field.name}><input type={field.type} required value={formData[field.name]} onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })} placeholder={field.label} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all" /></div>
              ))}
              <textarea required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Message" rows={5} className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none" />
              <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(190 100% 50% / 0.3)" }} whileTap={{ scale: 0.98 }} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 disabled:opacity-70">
                {sending ? <motion.div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /> : <><Send size={18} />Send Message</>}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
