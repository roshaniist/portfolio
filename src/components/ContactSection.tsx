import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Globe, Linkedin, Mail, Rocket, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TypewriterText } from "./HeroSection";

const fadeUp = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } };

interface ContactSectionProps {
  prefersReducedMotion: boolean;
}

const ContactSection = ({ prefersReducedMotion }: ContactSectionProps) => {
  const [mailData, setMailData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Portfolio inquiry from ${mailData.name || "Visitor"}`;
    const mailTo = `mailto:kumarroshan62013@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${mailData.name}\nEmail: ${mailData.email}\n\n${mailData.message}`,
    )}`;
    window.location.href = mailTo;
  };

  return (
    <section id="contact" className="section-shell" style={{ background: "hsl(var(--surface) / 0.25)" }}>
      <span className="section-label">
        <TypewriterText text="Communication" reducedMotion={prefersReducedMotion} speed={28} />
      </span>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="glass-card p-6"
        >
          <h3 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", fontWeight: 600 }}>
            <TypewriterText text="Let's Connect" reducedMotion={prefersReducedMotion} speed={34} />
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">Tell me about your backend requirements and project timeline.</p>
          <div className="mt-5 space-y-4">
            <Input
              required
              placeholder="Name"
              value={mailData.name}
              onChange={(e) => setMailData((prev) => ({ ...prev, name: e.target.value }))}
              className="input-glow"
            />
            <Input
              required
              type="email"
              placeholder="Email"
              value={mailData.email}
              onChange={(e) => setMailData((prev) => ({ ...prev, email: e.target.value }))}
              className="input-glow"
            />
            <Textarea
              required
              placeholder="Message"
              rows={6}
              value={mailData.message}
              onChange={(e) => setMailData((prev) => ({ ...prev, message: e.target.value }))}
              className="input-glow"
            />
          </div>
          <Button type="submit" className="mt-5 w-full btn-glow bg-brand text-brand-foreground hover:bg-brand/90">
            Send Message <Send className="ml-2 h-4 w-4" />
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6"
        >
          <h3 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)", fontWeight: 600 }}>
            <TypewriterText text="Signal Channels" reducedMotion={prefersReducedMotion} speed={34} />
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">Open to backend development roles and software engineering collaborations.</p>
          <div className="mt-6 space-y-4 text-sm">
            <a href="mailto:kumarroshan62013@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-neon-cyan transition-colors">
              <Mail className="h-4 w-4 text-neon-cyan" /> 📧 Email: kumarroshan62013@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/roshankr01u/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-neon-cyan transition-colors">
              <Linkedin className="h-4 w-4 text-neon-cyan" /> 💼 LinkedIn: https://www.linkedin.com/in/roshankr01u/
            </a>
            <a href="https://github.com/roshaniist" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-neon-cyan transition-colors">
              <Github className="h-4 w-4 text-neon-cyan" /> GitHub Repositories
            </a>
            <a href="tel:+919572752717" className="flex items-center gap-3 text-muted-foreground hover:text-neon-cyan transition-colors">
              <Globe className="h-4 w-4 text-neon-cyan" /> +91 9572752717
            </a>
          </div>

          <div className="mt-8 rounded-xl border border-neon-cyan/15 p-4" style={{ background: "hsl(var(--surface) / 0.5)" }}>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cosmic">
              <Rocket className="h-3.5 w-3.5" /> Current Focus
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Building scalable Java backend systems with clean architecture, robust APIs, and optimized SQL queries.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
