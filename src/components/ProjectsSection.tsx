import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Github, Globe, Sparkles } from "lucide-react";
import { TypewriterText } from "./HeroSection";
import projectExpensePng from "@/assets/project-expense.png";
import projectDogApiPng from "@/assets/project-dogapi.png";
import projectBlogPng from "@/assets/project-blog.png";
import projectSchoolPng from "@/assets/project-school.png";
import projectProfilePng from "@/assets/project-profile-readme.png";

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

const TiltCard = ({ project, index, prefersReducedMotion }: { project: PortfolioProject; index: number; prefersReducedMotion: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const supportsHover = typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={supportsHover ? handleMouseMove : undefined}
        onMouseLeave={supportsHover ? handleMouseLeave : undefined}
        style={{
          rotateX: supportsHover && !prefersReducedMotion ? rotateX : 0,
          rotateY: supportsHover && !prefersReducedMotion ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="glass-card group overflow-hidden relative"
      >
        {/* Cursor-following glow */}
        {!prefersReducedMotion && (
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useSpring(useTransform(
                [mouseX, mouseY],
                ([cx, cy]) => `radial-gradient(600px circle at ${cx}px ${cy}px, hsl(var(--neon-cyan) / 0.15), transparent 40%)`
              )),
            }}
          />
        )}
        {/* Image with gradient overlay */}
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            width={1200}
            height={630}
            className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.3) 50%, transparent 100%)",
            }}
          />
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold sm:text-xl">{project.title}</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {project.descriptionPoints.map((point) => (
              <li key={point} className="flex gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-neon-cyan" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="skill-badge text-xs">{tech}</span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
            <a href={project.live} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1 text-neon-cyan transition-colors hover:text-neon-violet">
              <Globe className="h-4 w-4" /> Live Demo
            </a>
            <a href={project.github} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

interface ProjectsSectionProps {
  prefersReducedMotion: boolean;
}

const ProjectsSection = ({ prefersReducedMotion }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="section-shell">
      <span className="section-label">
        <TypewriterText text="Featured Creations" reducedMotion={prefersReducedMotion} speed={26} />
      </span>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <TiltCard key={project.slug} project={project} index={idx} prefersReducedMotion={prefersReducedMotion} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="#" className="inline-flex items-center gap-2 text-sm text-neon-cyan hover:text-neon-violet transition-colors">
          Explore Full Archive <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default ProjectsSection;
