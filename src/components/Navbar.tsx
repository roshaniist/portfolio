import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  activeSection: string;
  scrollProgress: number;
  prefersReducedMotion: boolean;
}

const Navbar = ({ activeSection, scrollProgress, prefersReducedMotion }: NavbarProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme !== "light";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleThemeToggle = () => {
    const root = document.documentElement;
    if (!prefersReducedMotion) {
      root.classList.add("theme-fade");
      setTimeout(() => root.classList.remove("theme-fade"), 420);
    }
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed left-0 top-0 z-[70] h-0.5"
        style={{
          width: `${scrollProgress * 100}%`,
          background: `linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-violet)))`,
        }}
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-glass-border/10 backdrop-blur-2xl"
        style={{ background: "hsl(var(--background) / 0.7)" }}
      >
        <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 md:px-8">
          {/* Logo */}
          <a href="#" className="text-sm font-bold uppercase tracking-[0.25em] text-shimmer">
            RK
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full"
                      style={{ background: "hsl(var(--neon-cyan))", boxShadow: "0 0 8px hsl(var(--neon-cyan) / 0.5)" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* Right buttons */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleThemeToggle}
              className="group relative h-9 border-glass-border/20 bg-surface/50 px-3 hover:bg-surface-alt"
              aria-label="Toggle theme"
            >
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
                <span className="relative h-4 w-4">
                  <Moon className={`absolute inset-0 h-4 w-4 text-neon-cyan transition-all duration-300 ${isDarkMode ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
                  <Sun className={`absolute inset-0 h-4 w-4 text-neon-cyan transition-all duration-300 ${isDarkMode ? "opacity-0 scale-75" : "opacity-100 scale-100"}`} />
                </span>
              </span>
            </Button>

            <Button asChild size="sm" className="hidden sm:inline-flex btn-glow bg-brand text-brand-foreground hover:bg-brand/90">
              <a href="#contact">Contact Me</a>
            </Button>

            {/* Hamburger */}
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="md:hidden h-9 w-9 p-0 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
            
            {/* Menu panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-72 border-l border-glass-border/15 p-6 pt-20"
              style={{ background: "hsl(var(--surface) / 0.95)", backdropFilter: "blur(24px)" }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((item, idx) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-brand/10 text-neon-cyan"
                          : "text-muted-foreground hover:bg-surface-alt hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
                <div className="mt-4 pt-4 border-t border-glass-border/15">
                  <Button asChild size="sm" className="w-full btn-glow bg-brand text-brand-foreground hover:bg-brand/90">
                    <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact Me</a>
                  </Button>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
