import { motion } from "framer-motion";
import { Code2, Briefcase, Database, Wrench } from "lucide-react";
import { TypewriterText } from "./HeroSection";

const highlightSkills = new Set([
  "Spring Boot", "JDBC", "REST APIs", "Layered Architecture", "DAO Pattern",
  "JSON Handling", "HTTP Status Codes", "Java", "MySQL", "PostgreSQL",
]);

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

interface SkillsSectionProps {
  prefersReducedMotion: boolean;
}

const SkillsSection = ({ prefersReducedMotion }: SkillsSectionProps) => {
  return (
    <section id="skills" className="section-shell" style={{ background: "hsl(var(--surface) / 0.25)" }}>
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
            className="glass-card p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-lg p-1.5" style={{ background: "hsl(var(--neon-cyan) / 0.1)" }}>
                <group.icon className="h-5 w-5 text-neon-cyan" />
              </div>
              <h3 className="font-semibold">{group.label}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 + i * 0.03 }}
                  className={`skill-badge ${highlightSkills.has(skill) ? "skill-badge-highlight" : ""}`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
