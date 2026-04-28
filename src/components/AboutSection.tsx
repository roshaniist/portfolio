import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import roshanProfileImage from "@/assets/roshan-profile.jpg";
import { TypewriterText } from "./HeroSection";

const counters = [
  { value: 5, suffix: "+", label: "Projects Built" },
  { value: 350, suffix: "+", label: "DSA Problems" },
  { value: 2, suffix: "", label: "Certificates" },
];

const StatCounter = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const duration = 1000;
    const steps = 40;
    let currentStep = 0;
    const timer = window.setInterval(() => {
      currentStep += 1;
      const progress = Math.min(currentStep / steps, 1);
      setCount(Math.round(progress * value));
      if (progress >= 1) window.clearInterval(timer);
    }, duration / steps);
    return () => window.clearInterval(timer);
  }, [value]);

  return (
    <div className="glass-card rounded-xl p-4 text-center">
      <p className="text-2xl font-bold text-shimmer md:text-3xl">
        {count}{suffix}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

interface AboutSectionProps {
  prefersReducedMotion: boolean;
}

const fadeUp = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } };

const AboutSection = ({ prefersReducedMotion }: AboutSectionProps) => {
  return (
    <section id="about" className="section-shell" style={{ background: "hsl(var(--surface) / 0.25)" }}>
      <span className="section-label">
        <TypewriterText text="Discovery" reducedMotion={prefersReducedMotion} speed={30} />
      </span>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700 }}>
            <TypewriterText text="Engineering products where performance meets imagination." reducedMotion={prefersReducedMotion} speed={18} />
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            I specialize in Java, SQL, and Spring ecosystem technologies with proficiency in layered architecture, role-based access control, and transaction management.
            Seeking a backend engineering role to deliver scalable, production-ready systems.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {counters.map((counter, index) => (
              <motion.div
                key={counter.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
              >
                <StatCounter {...counter} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card overflow-hidden relative group"
        >
          {/* Neon ring glow effect */}
          <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, hsl(var(--neon-cyan) / 0.2), hsl(var(--neon-violet) / 0.2))",
              filter: "blur(20px)",
            }}
          />
          <img
            src={roshanProfileImage}
            alt="Roshan Kumar professional portrait"
            loading="lazy"
            width={480}
            height={480}
            className="relative h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
