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
    <div className="group relative w-full mb-16 sm:mb-20 md:mb-24 last:mb-0">
      <div className="flex flex-col gap-7 md:gap-8">
        {/* Media */}
        <div
          className={[
            "w-full overflow-hidden rounded-2xl relative bg-gray-100",
            "shadow-sm group-hover:shadow-xl transition-all duration-500",
            // responsive “same scale” feel:
            // - aspect ratio keeps consistent shape
            // - max-h prevents it from getting too tall on short screens
            "aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9]",
            "max-h-[70vh] min-h-[260px]",
          ].join(" ")}
        >
          <div className="absolute inset-0 bg-coco-text/0 group-hover:bg-coco-text/5 transition-colors duration-500 z-10 mix-blend-multiply" />

          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 bg-coco-purple-light/40 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-coco-text shadow-sm">
            {project.category}
          </div>
        </div>

        {/* Text + CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-1 sm:px-2">
          <div className="max-w-2xl space-y-3">
            <div className="text-coco-accent font-mono text-sm tracking-widest">
              {String(index + 1).padStart(2, "0")} / {totalLabel}
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-coco-text group-hover:text-coco-accent transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-gray-600 leading-relaxed text-base sm:text-lg max-w-xl">
              {project.description}
            </p>
          </div>

          <a
            href={project.link}
            className="group/btn flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full
             border border-coco-purple text-coco-purple
             hover:bg-coco-purple hover:border-coco-purple hover:text-white
             transition-all duration-300"
            aria-label={`Open ${project.title}`}
          >
            <ArrowUpRight
              size={22}
              className="group-hover/btn:rotate-45 transition-transform duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
