import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const rotatingPhrases = ["Java Developer", "Spring Boot API Builder", "SQL & Debugging Specialist"];
const promptLabels = ["cmd", "powershell", "bash"];
const terminalSnippetLines = [
  "const developer = {",
  '  name: "Roshan Kumar",',
  '  role: "Java Developer",',
  '  focus: "Spring Boot + REST APIs + SQL",',
  '  skills: ["Java", "Spring Boot", "JDBC", "MySQL"],',
  '  motto: "Build scalable and efficient backend systems.",',
  "  passionate: true",
  "};",
];

type TypewriterTextProps = {
  text: string;
  reducedMotion: boolean;
  speed?: number;
  startDelay?: number;
  className?: string;
};

const TypewriterText = forwardRef<HTMLSpanElement, TypewriterTextProps>(
  ({ text, reducedMotion, speed = 26, startDelay = 0, className }, forwardedRef) => {
    const [output, setOutput] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const textRef = useRef<HTMLSpanElement | null>(null);

    const handleRef = useCallback(
      (node: HTMLSpanElement | null) => {
        textRef.current = node;
        if (!forwardedRef) return;
        if (typeof forwardedRef === "function") { forwardedRef(node); return; }
        forwardedRef.current = node;
      },
      [forwardedRef],
    );

    useEffect(() => {
      if (reducedMotion) { setIsVisible(true); return; }
      const node = textRef.current;
      if (!node) return;
      const observer = new IntersectionObserver(
        (entries) => { if (entries[0]?.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
        { threshold: 0.25 },
      );
      observer.observe(node);
      return () => observer.disconnect();
    }, [reducedMotion]);

    useEffect(() => {
      if (!isVisible || reducedMotion) { setOutput(reducedMotion ? text : ""); return; }
      let charIndex = 0;
      let timer: number | null = null;
      const typeNext = () => {
        setOutput(text.slice(0, charIndex));
        if (charIndex >= text.length) return;
        charIndex += 1;
        timer = window.setTimeout(typeNext, speed);
      };
      timer = window.setTimeout(typeNext, startDelay);
      return () => { if (timer) window.clearTimeout(timer); };
    }, [isVisible, reducedMotion, speed, startDelay, text]);

    return <span ref={handleRef} className={className}>{output}</span>;
  }
);
TypewriterText.displayName = "TypewriterText";

export { TypewriterText };

interface HeroSectionProps {
  prefersReducedMotion: boolean;
}

const HeroSection = ({ prefersReducedMotion }: HeroSectionProps) => {
  const [activePhrase, setActivePhrase] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeletingText, setIsDeletingText] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActivePhrase(0);
      setTypedText(rotatingPhrases[0]);
      setIsDeletingText(false);
      return;
    }
    const currentPhrase = rotatingPhrases[activePhrase];
    if (!isDeletingText && typedText === currentPhrase) {
      const t = window.setTimeout(() => setIsDeletingText(true), 1300);
      return () => window.clearTimeout(t);
    }
    if (isDeletingText && typedText === "") {
      setIsDeletingText(false);
      setActivePhrase((p) => (p + 1) % rotatingPhrases.length);
      return;
    }
    const nextText = isDeletingText
      ? currentPhrase.slice(0, Math.max(typedText.length - 1, 0))
      : currentPhrase.slice(0, typedText.length + 1);
    const t = window.setTimeout(() => setTypedText(nextText), isDeletingText ? 40 : 85);
    return () => window.clearTimeout(t);
  }, [activePhrase, isDeletingText, prefersReducedMotion, typedText]);

  const fadeUp = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } };

  return (
    <section className="cosmic-grid relative min-h-screen pt-28">
      {/* Hero gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-hero-radial" />
      <div className="pointer-events-none absolute inset-0 bg-cosmic-mesh" />

      <div className="section-shell grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
          <Badge className="mb-5 border border-neon-cyan/20 bg-surface/70 text-neon-cyan text-xs">
            Java Developer Portfolio
          </Badge>

          <h1 className="text-shimmer" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", fontWeight: 800, lineHeight: 1.1 }}>
            <TypewriterText text="Roshan Kumar" reducedMotion={prefersReducedMotion} speed={46} />
          </h1>

          <p className="mono-code mt-4 flex min-h-8 items-center gap-2 text-sm text-muted-foreground sm:text-base">
            <span className="rounded border border-neon-cyan/30 bg-surface/70 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-neon-cyan">
              {promptLabels[activePhrase % promptLabels.length]}
            </span>
            <span className="text-neon-cyan">&gt;</span>
            <span className="text-foreground">{typedText}</span>
            <span className={`${prefersReducedMotion ? "" : "animate-blink"} text-neon-cyan`}>|</span>
          </p>

          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            Motivated Java Developer with hands-on experience building web applications using Java, Spring Boot, JDBC, REST APIs, and SQL databases.
          </p>

          <div className="mt-8 flex items-center gap-3">
            {[
              { href: "https://github.com/roshaniist", icon: Github, rotate: -2 },
              { href: "https://www.linkedin.com/in/roshankr01u/", icon: Linkedin, rotate: 2 },
              { href: "mailto:kumarroshan62013@gmail.com", icon: Mail, rotate: -1.5 },
            ].map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="glass-card rounded-xl p-3 text-foreground"
                whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: item.rotate }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
              >
                <item.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="btn-glow bg-brand text-brand-foreground hover:bg-brand/90">
              <a href="#contact">Contact Me</a>
            </Button>
            <Button asChild variant="outline" className="border-glass-border/25 bg-surface/50 hover:bg-surface-alt">
              <a href="https://drive.google.com/file/d/1uYzMQRkMNn5bAlQhRwt45uuGu1VgqIXv/view?usp=sharing" target="_blank" rel="noreferrer">
                Get Resume
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Terminal block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mono-code animate-float glass-card p-5 text-sm relative overflow-hidden"
          style={{ boxShadow: "0 20px 80px -30px hsl(var(--neon-cyan) / 0.2)" }}
        >
          {/* Scanline effect */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--neon-cyan) / 0.1) 2px, hsl(var(--neon-cyan) / 0.1) 4px)",
            }}
          />
          <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="rounded border border-neon-cyan/30 bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-neon-cyan">
              termux
            </span>
            <span className="ml-auto">
              <TypewriterText text="developer.ts" reducedMotion={prefersReducedMotion} speed={28} />
            </span>
          </div>
          <pre className="overflow-x-auto">
            {terminalSnippetLines.map((line, index) => (
              <div key={`${line}-${index}`} className="leading-7">
                <span className="mr-2 text-muted-foreground/50 select-none">{String(index + 1).padStart(2, " ")}</span>
                <TypewriterText
                  text={line}
                  reducedMotion={prefersReducedMotion}
                  speed={16}
                  startDelay={index * 260}
                  className="text-surface-foreground"
                />
              </div>
            ))}
          </pre>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
