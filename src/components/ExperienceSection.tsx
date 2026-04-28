import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { TypewriterText } from "./HeroSection";

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

const revealLeft = { hidden: { opacity: 0, x: -36, y: 18 }, visible: { opacity: 1, x: 0, y: 0 } };
const revealRight = { hidden: { opacity: 0, x: 36, y: 18 }, visible: { opacity: 1, x: 0, y: 0 } };

interface ExperienceSectionProps {
  prefersReducedMotion: boolean;
}

const ExperienceSection = ({ prefersReducedMotion }: ExperienceSectionProps) => {
  return (
    <section id="experience" className="section-shell">
      <span className="section-label">
        <TypewriterText text="Professional Journey" reducedMotion={prefersReducedMotion} speed={28} />
      </span>

      <div className="relative mt-6 space-y-8">
        {/* Timeline line with neon glow */}
        <div
          className="absolute left-[0.55rem] top-2 h-[94%] w-px sm:left-[0.7rem]"
          style={{
            background: "linear-gradient(to bottom, hsl(var(--neon-cyan) / 0.5), hsl(var(--neon-violet) / 0.3), transparent)",
            boxShadow: "0 0 8px hsl(var(--neon-cyan) / 0.2)",
          }}
        />

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
            {/* Neon dot */}
            <div className="neon-dot absolute left-0 top-1.5 h-3 w-3" />

            <div className="glass-card p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{item.date}</p>
              <h3 className="mt-2 text-xl font-semibold">{item.role}</h3>
              <p className="text-sm text-cosmic">{item.company}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-neon-cyan" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
