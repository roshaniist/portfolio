import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  Database,
  FileDown,
  Github,
  Globe,
  Linkedin,
  Mail,
  Moon,
  Rocket,
  Send,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import roshanProfileImage from "@/assets/roshan-profile.png";
import projectExpensePng from "@/assets/project-expense.png";
import projectDogApiPng from "@/assets/project-dogapi.png";
import projectBlogPng from "@/assets/project-blog.png";
import projectSchoolPng from "@/assets/project-school.png";
import projectProfilePng from "@/assets/project-profile-readme.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["about", "experience", "skills", "projects", "contact"] as const;

const timeline = [
  {
    role: "B.Tech in Computer Science and Engineering",
    company: "Indore Institute of Science and Technology, Indore",
    date: "Sept 2020 — June 2024",
    points: [
      "Completed graduation with 83.9% and strong fundamentals in software engineering and backend development.",
      "Built practical expertise in Java, SQL, OOP, data structures, and API-first application development.",
      "Applied SDLC principles across coursework and project delivery.",
    ],
  },
  {
    role: "Java Full Stack Development Training",
    company: "JSpiders",
    date: "2025",
    points: [
      "Earned certificate in Java Full Stack Development training.",
      "Strengthened hands-on skills in Spring Boot, JDBC, REST APIs, and MySQL workflows.",
      "Enhanced debugging, API testing, and collaborative problem-solving through practical assignments.",
    ],
  },
  {
    role: "Early Academic Foundation",
    company: "Sri Chaitanya Junior Kalasala & DAV Public School",
    date: "2016 — 2019",
    points: [
      "Completed Intermediate with 90% (Telangana State Board).",
      "Completed CBSE schooling with 89.3%.",
      "Built a strong base in analytical thinking, communication, and disciplined execution.",
    ],
  },
];

const skillGroups = [
  {
    label: "Languages",
    icon: Code2,
    items: ["Java", "SQL", "HTML", "CSS", "JavaScript"],
  },
  {
    label: "Core Concepts",
    icon: Briefcase,
    items: ["Object-Oriented Programming", "Collection Framework", "Exception Handling", "Multithreading", "Data Structures and Algorithms"],
  },
  {
    label: "Backend Development",
    icon: Database,
    items: ["Spring Boot", "JDBC", "REST APIs", "Layered Architecture", "DAO Pattern", "JSON Handling", "HTTP Status Codes"],
  },
  {
    label: "Tools, Platforms & Databases",
    icon: Wrench,
    items: ["MySQL", "PostgreSQL", "Git", "GitHub", "Postman", "IntelliJ IDEA", "VS Code", "SDLC"],
  },
];

type PortfolioProject = {
  slug: string;
  title: string;
  image: string;
  descriptionPoints: string[];
  stack: string[];
  live: string;
  github: string;
  seoDescription: string;
};

const projects: PortfolioProject[] = [
  {
    slug: "expense-tracker",
    title: "Expense Tracker Application",
    image: projectExpensePng,
    descriptionPoints: [
      "Built Spring Boot REST APIs for complete expense CRUD workflows.",
      "Used MySQL + Hibernate for persistent transaction and category data.",
      "Added category filtering and validation for cleaner daily tracking.",
    ],
    stack: ["Java", "Spring Boot", "REST APIs", "MySQL", "Hibernate"],
    live: "https://github.com/roshaniist/Expense-Tracker-Application",
    github: "https://github.com/roshaniist/Expense-Tracker-Application",
    seoDescription: "Expense Tracker project by Roshan Kumar showcasing Spring Boot REST APIs, Hibernate persistence, and robust MySQL data workflows.",
  },
  {
    slug: "dog-api-spring-boot",
    title: "Dog API Using Spring Boot",
    image: projectDogApiPng,
    descriptionPoints: [
      "Integrated external dog-breed endpoints and consumed JSON responses.",
      "Exposed clean Spring Boot APIs for fetching and serving breed data.",
      "Implemented exception handling for resilient API behavior.",
    ],
    stack: ["Java", "Spring Boot", "REST API", "JSON"],
    live: "https://github.com/roshaniist/DogApiusingSpringboot",
    github: "https://github.com/roshaniist/DogApiusingSpringboot",
    seoDescription: "Dog API project by Roshan Kumar featuring external API integration, JSON handling, and resilient Spring Boot REST endpoint design.",
  },
  {
    slug: "blog-app-spring-boot",
    title: "Blog App Spring Boot",
    image: projectBlogPng,
    descriptionPoints: [
      "Developed Spring Boot backend modules for blog post management.",
      "Structured frontend pages using HTML/CSS for content presentation.",
      "Organized routes and data flow for cleaner maintainability.",
    ],
    stack: ["Spring Boot", "Java", "HTML", "CSS"],
    live: "https://github.com/roshaniist/BlogAppSpringboot",
    github: "https://github.com/roshaniist/BlogAppSpringboot",
    seoDescription: "Blog App Spring Boot project by Roshan Kumar with modular backend architecture, content routing, and maintainable full-stack structure.",
  },
  {
    slug: "school-management-system",
    title: "School Management System",
    image: projectSchoolPng,
    descriptionPoints: [
      "Built backend modules for student, class, and staff workflows.",
      "Used Spring Boot + MySQL for reliable data operations.",
      "Maintained layered architecture for scalability and testing.",
    ],
    stack: ["Java", "Spring Boot", "MySQL", "REST APIs"],
    live: "https://github.com/roshaniist/School-Management-System-By-Using-Spring-Boot-",
    github: "https://github.com/roshaniist/School-Management-System-By-Using-Spring-Boot-",
    seoDescription: "School Management System by Roshan Kumar using layered Spring Boot architecture, MySQL-backed workflows, and scalable backend modules.",
  },
  {
    slug: "github-profile-readme",
    title: "GitHub Profile README",
    image: projectProfilePng,
    descriptionPoints: [
      "Created an organized profile README with project and skill highlights.",
      "Improved developer branding with concise technical storytelling.",
      "Maintained up-to-date links for repositories and social profiles.",
    ],
    stack: ["Markdown", "GitHub", "Documentation"],
    live: "https://github.com/roshaniist/roshaniist",
    github: "https://github.com/roshaniist/roshaniist",
    seoDescription: "GitHub Profile README project by Roshan Kumar focused on technical storytelling, developer branding, and clear project discoverability.",
  },
];

const HOME_SEO = {
  title: "Roshan Kumar | Java Developer Portfolio",
  description: "Portfolio of Roshan Kumar, a Java Developer skilled in Spring Boot, JDBC, REST APIs, SQL databases, and scalable backend systems.",
};

const counters = [
  { value: 5, suffix: "+", label: "Projects Built" },
  { value: 1000, suffix: "+", label: "DSA Problems" },
  { value: 2, suffix: "", label: "Certificates" },
];

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

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const revealLeft = {
  hidden: { opacity: 0, x: -36, y: 18 },
  visible: { opacity: 1, x: 0, y: 0 },
};

const revealRight = {
  hidden: { opacity: 0, x: 36, y: 18 },
  visible: { opacity: 1, x: 0, y: 0 },
};

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

      if (progress >= 1) {
        window.clearInterval(timer);
      }
    }, duration / steps);

    return () => window.clearInterval(timer);
  }, [value]);

  return (
    <div className="glass-panel rounded-xl p-4 text-center">
      <p className="text-2xl font-bold text-cosmic md:text-3xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

type TypewriterTextProps = {
  text: string;
  reducedMotion: boolean;
  speed?: number;
  startDelay?: number;
  className?: string;
};

const TypewriterText = forwardRef<HTMLSpanElement, TypewriterTextProps>(({ text, reducedMotion, speed = 26, startDelay = 0, className }, forwardedRef) => {
  const [output, setOutput] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const handleRef = useCallback(
    (node: HTMLSpanElement | null) => {
      textRef.current = node;

      if (!forwardedRef) return;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
        return;
      }
      forwardedRef.current = node;
    },
    [forwardedRef],
  );

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = textRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!isVisible || reducedMotion) {
      setOutput(reducedMotion ? text : "");
      return;
    }

    let charIndex = 0;
    let timer: number | null = null;

    const typeNext = () => {
      setOutput(text.slice(0, charIndex));
      if (charIndex >= text.length) return;
      charIndex += 1;
      timer = window.setTimeout(typeNext, speed);
    };

    timer = window.setTimeout(typeNext, startDelay);

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [isVisible, reducedMotion, speed, startDelay, text]);

  return (
    <span ref={handleRef} className={className}>
      {output}
    </span>
  );
});

TypewriterText.displayName = "TypewriterText";

const Index = () => {
  const [activePhrase, setActivePhrase] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeletingText, setIsDeletingText] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);
  const [mailData, setMailData] = useState({ name: "", email: "", message: "" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkMode = resolvedTheme !== "light";
  const themeFadeTimer = useRef<number | null>(null);
  const currentProject = useMemo(() => {
    const hash = currentHash.replace("#", "");
    if (!hash.startsWith("project-")) return null;
    const slug = hash.replace("project-", "");
    return projects.find((project) => project.slug === slug) ?? null;
  }, [currentHash]);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const origin = window.location.origin;
    const canonicalPath = currentProject ? `/#project-${currentProject.slug}` : "/";
    const canonicalUrl = `${origin}${canonicalPath}`;
    const title = currentProject ? `${currentProject.title} | Roshan Kumar Projects` : HOME_SEO.title;
    const description = currentProject ? currentProject.seoDescription : HOME_SEO.description;
    const ogImage = `${origin}/og-image.jpg`;

    document.title = title;

    const setMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
      let metaTag = document.querySelector<HTMLMetaElement>(selector);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute(attribute, key);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute("content", content);
    };

    const setLink = (selector: string, rel: string, href: string) => {
      let linkTag = document.querySelector<HTMLLinkElement>(selector);
      if (!linkTag) {
        linkTag = document.createElement("link");
        linkTag.setAttribute("rel", rel);
        document.head.appendChild(linkTag);
      }
      linkTag.setAttribute("href", href);
    };

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", ogImage);
    setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", currentProject ? `${currentProject.title} by Roshan Kumar` : "Roshan Kumar Java Developer portfolio cover");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);
    setLink('link[rel="canonical"]', "canonical", canonicalUrl);
  }, [currentProject]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActivePhrase(0);
      setTypedText(rotatingPhrases[0]);
      setIsDeletingText(false);
      return;
    }

    const currentPhrase = rotatingPhrases[activePhrase];

    if (!isDeletingText && typedText === currentPhrase) {
      const pauseTimer = window.setTimeout(() => setIsDeletingText(true), 1300);
      return () => window.clearTimeout(pauseTimer);
    }

    if (isDeletingText && typedText === "") {
      setIsDeletingText(false);
      setActivePhrase((prev) => (prev + 1) % rotatingPhrases.length);
      return;
    }

    const nextText = isDeletingText
      ? currentPhrase.slice(0, Math.max(typedText.length - 1, 0))
      : currentPhrase.slice(0, typedText.length + 1);

    const stepTimer = window.setTimeout(
      () => setTypedText(nextText),
      isDeletingText ? 40 : 85,
    );

    return () => window.clearTimeout(stepTimer);
  }, [activePhrase, isDeletingText, prefersReducedMotion, typedText]);

  useEffect(
    () => () => {
      if (themeFadeTimer.current) {
        window.clearTimeout(themeFadeTimer.current);
      }
    },
    [],
  );

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(scrollTop / maxScroll, 1));

      const sectionInView = sectionIds.find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 180 && rect.bottom >= 180;
      });

      if (sectionInView) {
        setActiveSection(sectionInView);
      }
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const subject = useMemo(() => `Portfolio inquiry from ${mailData.name || "Visitor"}`, [mailData.name]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mailTo = `mailto:kumarroshan62013@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${mailData.name}\nEmail: ${mailData.email}\n\n${mailData.message}`,
    )}`;
    window.location.href = mailTo;
  };

  const handleThemeToggle = () => {
    if (prefersReducedMotion) {
      setTheme(isDarkMode ? "light" : "dark");
      return;
    }

    const root = document.documentElement;
    root.classList.add("theme-fade");
    setTheme(isDarkMode ? "light" : "dark");

    if (themeFadeTimer.current) {
      window.clearTimeout(themeFadeTimer.current);
    }

    themeFadeTimer.current = window.setTimeout(() => {
      root.classList.remove("theme-fade");
    }, 420);
  };

  return (
    <div className="relative overflow-x-clip overflow-y-visible">
      <div className="fixed left-0 top-0 z-[70] h-1 bg-brand transition-[width] duration-150" style={{ width: `${scrollProgress * 100}%` }} />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-glass-border/15 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 md:px-8">
          <a href="#" className="text-sm font-semibold uppercase tracking-[0.2em] text-cosmic story-link">
            RK
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors hover:text-foreground ${activeSection === item.href.slice(1) ? "text-foreground" : "text-muted-foreground"}`}
                whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleThemeToggle}
              className="group relative h-9 min-w-24 border-glass-border/25 bg-surface/60 px-3 hover:bg-surface-alt"
              aria-label="Toggle cyber or dusk mode"
            >
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.08em]">
                <span className="relative h-4 w-4">
                  <Moon className={`absolute inset-0 h-4 w-4 text-brand transition-all duration-300 ${isDarkMode ? "opacity-100 scale-100" : "opacity-0 scale-75"}`} />
                  <Sun className={`absolute inset-0 h-4 w-4 text-brand transition-all duration-300 ${isDarkMode ? "opacity-0 scale-75" : "opacity-100 scale-100"}`} />
                </span>
                <span className="text-muted-foreground transition-colors group-hover:text-foreground">{isDarkMode ? "Dusk" : "Cyber"}</span>
              </span>
            </Button>
            <Button asChild size="sm" className="bg-brand text-brand-foreground hover:bg-brand/90">
              <a href="#contact">
                <span className="sm:hidden">Contact</span>
                <span className="hidden sm:inline">Contact Me</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="cosmic-grid relative min-h-screen pt-28">
          <div className="pointer-events-none absolute inset-0 bg-hero-radial" />
          <div className="section-shell grid items-center gap-14 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
              <Badge className="mb-5 border border-glass-border/20 bg-surface/70 text-brand">Java Developer Portfolio</Badge>
              <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
                <TypewriterText text="Roshan Kumar" reducedMotion={prefersReducedMotion} speed={46} />
              </h1>
              <p className="mono-code mt-4 flex min-h-8 items-center gap-2 text-base text-muted-foreground md:text-lg">
                <span className="rounded border border-glass-border/35 bg-surface/70 px-2 py-0.5 text-xs uppercase tracking-[0.14em] text-brand">
                  {promptLabels[activePhrase % promptLabels.length]}
                </span>
                <span className="text-brand">&gt;</span>
                <span>{typedText}</span>
                <span className={`${prefersReducedMotion ? "" : "animate-blink"} text-brand`}>|</span>
              </p>
              <p className="mt-6 max-w-xl text-muted-foreground">
                Motivated Java Developer with hands-on experience building web applications using Java, Spring Boot, JDBC, REST APIs, and SQL databases.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <motion.a
                  href="https://github.com/roshaniist"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel hover-scale rounded-xl p-3 text-foreground"
                  whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/roshankr01u/"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel hover-scale rounded-xl p-3 text-foreground"
                  whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: 2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="mailto:kumarroshan62013@gmail.com"
                  className="glass-panel hover-scale rounded-xl p-3 text-foreground"
                  whileHover={prefersReducedMotion ? undefined : { y: -4, rotate: -1.5 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-brand text-brand-foreground shadow-[0_0_30px_hsl(var(--brand)/0.35)] hover:bg-brand/90">
                  <a href="#contact">Contact Me</a>
                </Button>
                <Button asChild variant="outline" className="border-glass-border/25 bg-surface/60 hover:bg-surface-alt">
                  <a href="https://drive.google.com/file/d/TEMP_RESUME_LINK/view" target="_blank" rel="noreferrer">
                    Get Resume
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mono-code animate-float rounded-3xl border border-glass-border/30 bg-background/95 p-5 text-sm shadow-[0_20px_60px_-35px_hsl(var(--foreground)/0.55)]"
            >
              <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded border border-glass-border/40 bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-brand">
                  termux
                </span>
                <span className="ml-2">
                  <TypewriterText text="developer.ts" reducedMotion={prefersReducedMotion} speed={28} />
                </span>
              </div>
              <pre className="overflow-x-auto text-brand">
{terminalSnippetLines.map((line, index) => (
                <div key={`${line}-${index}`} className="leading-7">
                  <span className="mr-2 text-muted-foreground">$</span>
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

        <section id="about" className="section-shell bg-surface/35">
          <span className="section-label">
            <TypewriterText text="Discovery" reducedMotion={prefersReducedMotion} speed={30} />
          </span>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl font-bold md:text-4xl">
                <TypewriterText text="Engineering products where performance meets imagination." reducedMotion={prefersReducedMotion} speed={18} />
              </h2>
              <p className="mt-5 text-muted-foreground">
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
              className="glass-panel overflow-hidden rounded-2xl"
            >
              <img
                src={roshanProfileImage}
                alt="Roshan Kumar professional portrait"
                loading="lazy"
                width={480}
                height={480}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        <section id="experience" className="section-shell bg-background">
          <span className="section-label">
            <TypewriterText text="Professional Journey" reducedMotion={prefersReducedMotion} speed={28} />
          </span>
          <div className="relative mt-6 space-y-8 before:absolute before:left-[0.55rem] before:top-2 before:h-[94%] before:w-px before:bg-border sm:before:left-[0.7rem]">
            {timeline.map((item, index) => (
              <motion.article
                key={item.role}
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView={prefersReducedMotion ? {} : "visible"}
                viewport={{ once: true }}
                variants={index % 2 === 0 ? revealLeft : revealRight}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-8"
              >
                <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-brand shadow-[0_0_18px_hsl(var(--glow)/0.7)]" />
                <div className="glass-panel rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{item.date}</p>
                  <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
                  <p className="text-sm text-cosmic">{item.company}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-shell bg-surface/35">
          <span className="section-label">
            <TypewriterText text="Inventory" reducedMotion={prefersReducedMotion} speed={30} />
          </span>
          <div className="grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, idx) => (
              <motion.div
                key={group.label}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 26, x: idx % 2 === 0 ? -20 : 20, scale: 0.98 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="glass-panel hover-scale rounded-2xl p-5"
              >
                <div className="mb-4 flex items-center gap-2">
                  <group.icon className="h-5 w-5 text-brand" />
                  <h3 className="font-semibold">{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="max-w-full whitespace-normal break-words bg-surface-alt text-surface-alt-foreground">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="section-shell bg-background">
          <span className="section-label">
            <TypewriterText text="Featured Creations" reducedMotion={prefersReducedMotion} speed={26} />
          </span>
          <div className="mt-4 grid gap-6 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="glass-panel group hover-scale overflow-hidden rounded-2xl"
              >
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  loading="lazy"
                  width={1200}
                  height={630}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {project.descriptionPoints.map((point) => (
                      <li key={point} className="flex gap-2">
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="max-w-full whitespace-normal break-words bg-surface-alt text-surface-alt-foreground">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                    <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-brand transition-colors hover:text-brand-alt">
                      <Globe className="h-4 w-4" /> Live Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-alt">
              Explore Full Archive <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section id="contact" className="section-shell bg-surface/35">
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
              className="glass-panel rounded-2xl p-6"
            >
              <h3 className="text-2xl font-semibold">
                <TypewriterText text="Let's Connect" reducedMotion={prefersReducedMotion} speed={34} />
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">Tell me about your backend requirements and project timeline.</p>
              <div className="mt-5 space-y-4">
                <Input
                  required
                  placeholder="Name"
                  value={mailData.name}
                  onChange={(event) => setMailData((prev) => ({ ...prev, name: event.target.value }))}
                  className="border-glass-border/20 bg-surface"
                />
                <Input
                  required
                  type="email"
                  placeholder="Email"
                  value={mailData.email}
                  onChange={(event) => setMailData((prev) => ({ ...prev, email: event.target.value }))}
                  className="border-glass-border/20 bg-surface"
                />
                <Textarea
                  required
                  placeholder="Message"
                  rows={6}
                  value={mailData.message}
                  onChange={(event) => setMailData((prev) => ({ ...prev, message: event.target.value }))}
                  className="border-glass-border/20 bg-surface"
                />
              </div>
              <Button type="submit" className="mt-5 w-full bg-brand text-brand-foreground hover:bg-brand/90">
                Send Message <Send className="ml-2 h-4 w-4" />
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel rounded-2xl p-6"
            >
              <h3 className="text-2xl font-semibold">
                <TypewriterText text="Signal Channels" reducedMotion={prefersReducedMotion} speed={34} />
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">Open to backend development roles and software engineering collaborations.</p>
              <div className="mt-6 space-y-4 text-sm">
                <a href="mailto:kumarroshan62013@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4 text-brand" /> 📧 Email: kumarroshan62013@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/roshankr01u/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-4 w-4 text-brand" /> 💼 LinkedIn: https://www.linkedin.com/in/roshankr01u/
                </a>
                <a href="https://github.com/roshaniist" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Github className="h-4 w-4 text-brand" /> GitHub Repositories
                </a>
                <a href="tel:+919572752717" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
                  <Globe className="h-4 w-4 text-brand" /> +91 9572752717
                </a>
              </div>
              <div className="mt-8 rounded-xl border border-glass-border/20 bg-surface/60 p-4">
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cosmic">
                  <Rocket className="h-3.5 w-3.5" /> Current Focus
                </p>
                <p className="mt-2 text-sm text-muted-foreground">Building scalable Java backend systems with clean architecture, robust APIs, and optimized SQL queries.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Button
        asChild
        className="fixed bottom-5 right-4 z-[60] h-11 rounded-full bg-brand px-4 text-brand-foreground shadow-[0_10px_26px_hsl(var(--brand)/0.35)] hover:bg-brand/90 sm:right-6"
      >
        <a href="https://drive.google.com/file/d/TEMP_RESUME_LINK/view" target="_blank" rel="noreferrer">
          <FileDown className="mr-2 h-4 w-4" /> Download Resume
        </a>
      </Button>

      <footer className="border-t border-glass-border/15 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
             <p className="text-lg font-semibold text-cosmic">
               <TypewriterText text="Roshan Kumar" reducedMotion={prefersReducedMotion} speed={34} />
             </p>
            <p className="text-sm text-muted-foreground">Designing scalable and efficient software solutions with Java and Spring Boot.</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} • Made with ❤️ by Roshan Kumar</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
