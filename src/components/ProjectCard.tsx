import React from "react";
import type { Project } from "../types";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCount: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCount,
}) => {
  const totalLabel = String(totalCount).padStart(2, "0");

  return (
    <div
      className={[
        "group relative w-full mx-auto",
        "max-w-[clamp(22rem,92vw,58rem)]",
        "lg:max-w-[52rem] 2xl:max-w-[72rem]",
        "mb-[clamp(2.25rem,4vw,4rem)] last:mb-0",
      ].join(" ")}
    >
      <div className="flex flex-col gap-[clamp(1.05rem,2.2vw,1.6rem)]">
        {/* Media (clickable) */}
        <a
          href={project.link}
          aria-label={`Open ${project.title}`}
          className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-coco-accent/60"
        >
          <div
            className={[
              "w-full overflow-hidden rounded-2xl relative bg-gray-100",
              "shadow-sm group-hover:shadow-lg transition-all duration-500",
              "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]",
              "max-h-[clamp(320px,70vh,600px)]",
            ].join(" ")}
          >
            {/* IMPORTANT: don't block clicks */}
            <div className="pointer-events-none absolute inset-0 bg-coco-text/0 group-hover:bg-coco-text/5 transition-colors duration-500 z-10 mix-blend-multiply" />

            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />

            {/* Category pill should not steal clicks either */}
            <div className="pointer-events-none absolute top-4 left-4 sm:top-5 sm:left-5 z-20 bg-coco-purple-light/35 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-coco-text shadow-sm">
              {project.category}
            </div>
          </div>
        </a>

        {/* Text + CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-[clamp(1rem,2.2vw,1.6rem)] px-1 sm:px-2">
          <div className="max-w-2xl space-y-3">
            <div className="text-coco-accent font-mono text-[11px] sm:text-xs tracking-[0.22em]">
              {String(index + 1).padStart(2, "0")} / {totalLabel}
            </div>

            {/* Title (clickable) */}
            <h3 className="leading-[1.05]">
              <a
                href={project.link}
                className={[
                  "inline-block font-display italic",
                  "text-coco-text group-hover:text-coco-accent transition-colors duration-300",
                  "text-[clamp(1.55rem,3.1vw,2.5rem)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-coco-accent/60 rounded-md",
                ].join(" ")}
              >
                {project.title}
              </a>
            </h3>

            <p
              className={[
                "text-coco-text/70 leading-relaxed max-w-xl",
                "text-[clamp(0.95rem,1.25vw,1.05rem)]",
                "[display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden",
              ].join(" ")}
            >
              {project.description}
            </p>
          </div>

          {/* Arrow CTA (clickable) */}
          <a
            href={project.link}
            className={[
              "group/btn flex items-center justify-center",
              "w-12 h-12 sm:w-14 sm:h-14",
              "rounded-full border border-coco-purple text-coco-purple",
              "hover:bg-coco-purple hover:border-coco-purple hover:text-white",
              "transition-all duration-300",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-coco-accent/60",
            ].join(" ")}
            aria-label={`Open ${project.title}`}
          >
            <ArrowUpRight
              size={20}
              className="group-hover/btn:rotate-45 transition-transform duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
