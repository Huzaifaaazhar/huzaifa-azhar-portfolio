import { landingProjects } from "@/data/landingProjects";
import { ProjectCard } from "@/components/sections/ProjectCard";

export function ProjectsSection() {
  return (
    <section
      id="products"
      className="-mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
      style={{ zIndex: 10, position: "relative" }}
    >
      <h2
        className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        Product
      </h2>

      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {landingProjects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            total={landingProjects.length}
          />
        ))}
      </div>
    </section>
  );
}
