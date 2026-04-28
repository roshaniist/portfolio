import { useEffect, useMemo, useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";

const sectionIds = ["about", "experience", "skills", "projects", "contact"] as const;

const HOME_SEO = {
  title: "Roshan Kumar | Java Developer Portfolio",
  description: "Portfolio of Roshan Kumar, a Java Developer skilled in Spring Boot, JDBC, REST APIs, SQL databases, and scalable backend systems.",
};

type PortfolioProject = {
  slug: string;
  title: string;
  seoDescription: string;
};

const projectSlugs: PortfolioProject[] = [
  { slug: "expense-tracker", title: "Expense Tracker Application", seoDescription: "Expense Tracker project by Roshan Kumar showcasing Spring Boot REST APIs, Hibernate persistence, and robust MySQL data workflows." },
  { slug: "dog-api-spring-boot", title: "Dog API Using Spring Boot", seoDescription: "Dog API project by Roshan Kumar featuring external API integration, JSON handling, and resilient Spring Boot REST endpoint design." },
  { slug: "blog-app-spring-boot", title: "Blog App Spring Boot", seoDescription: "Blog App Spring Boot project by Roshan Kumar with modular backend architecture, content routing, and maintainable full-stack structure." },
  { slug: "school-management-system", title: "School Management System", seoDescription: "School Management System by Roshan Kumar using layered Spring Boot architecture, MySQL-backed workflows, and scalable backend modules." },
  { slug: "github-profile-readme", title: "GitHub Profile README", seoDescription: "GitHub Profile README project by Roshan Kumar focused on technical storytelling, developer branding, and clear project discoverability." },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const currentProject = useMemo(() => {
    const hash = currentHash.replace("#", "");
    if (!hash.startsWith("project-")) return null;
    const slug = hash.replace("project-", "");
    return projectSlugs.find((p) => p.slug === slug) ?? null;
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

  return (
    <div className="relative overflow-x-clip overflow-y-visible">
      <ParticleBackground />

      <Navbar
        activeSection={activeSection}
        scrollProgress={scrollProgress}
        prefersReducedMotion={prefersReducedMotion}
      />

      <main>
        <HeroSection prefersReducedMotion={prefersReducedMotion} />
        <div className="section-divider" />
        <AboutSection prefersReducedMotion={prefersReducedMotion} />
        <div className="section-divider" />
        <ExperienceSection prefersReducedMotion={prefersReducedMotion} />
        <div className="section-divider" />
        <SkillsSection prefersReducedMotion={prefersReducedMotion} />
        <div className="section-divider" />
        <ProjectsSection prefersReducedMotion={prefersReducedMotion} />
        <div className="section-divider" />
        <ContactSection prefersReducedMotion={prefersReducedMotion} />
      </main>

      <FooterSection prefersReducedMotion={prefersReducedMotion} />
    </div>
  );
};

export default Index;
