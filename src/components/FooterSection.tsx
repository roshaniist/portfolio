import { FileDown, Github, Linkedin, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypewriterText } from "./HeroSection";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

interface FooterSectionProps {
  prefersReducedMotion: boolean;
}

const FooterSection = ({ prefersReducedMotion }: FooterSectionProps) => {
  return (
    <>
      {/* Floating resume button */}
      <Button
        asChild
        className="fixed bottom-5 right-4 z-[60] h-11 rounded-full btn-glow bg-brand px-4 text-brand-foreground hover:bg-brand/90 sm:right-6"
      >
        <a href="https://drive.google.com/file/d/1uYzMQRkMNn5bAlQhRwt45uuGu1VgqIXv/view?usp=sharing" target="_blank" rel="noreferrer">
          <FileDown className="mr-2 h-4 w-4" /> Download Resume
        </a>
      </Button>

      <footer className="relative border-t border-glass-border/10 py-10">
        {/* Neon top border glow */}
        <div className="section-divider absolute top-0 left-0" />

        <div className="flex w-full flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-lg font-semibold text-shimmer">
              <TypewriterText text="Roshan Kumar" reducedMotion={prefersReducedMotion} speed={34} />
            </p>
            <p className="text-sm text-muted-foreground">Designing scalable and efficient software solutions with Java and Spring Boot.</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-neon-cyan transition-colors">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://github.com/roshaniist" target="_blank" rel="noreferrer" className="hover:text-neon-cyan transition-colors">
              <Github className="h-4 w-4 text-neon-cyan" />
            </a>
            <a href="https://www.linkedin.com/in/roshankr01u/" target="_blank" rel="noreferrer" className="hover:text-neon-cyan transition-colors">
              <Linkedin className="h-4 w-4 text-neon-cyan" />
            </a>
            <a href="https://www.geeksforgeeks.org/profile/kumarroshan62013?tab=activity" target="_blank" rel="noreferrer" className="hover:text-neon-cyan transition-colors">
              <Terminal className="h-4 w-4 text-neon-cyan" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} • Made with ❤️ by Roshan Kumar</p>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
