import React from "react";
import type { Project } from "../types";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCount: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, totalCount }) => {
  const totalLabel = String(totalCount).padStart(2, "0");

  return (
    <div className="group relative w-full mb-32 last:mb-0">
      <div className="flex flex-col gap-8">
        <div className="w-full h-[500px] md:h-[650px] overflow-hidden rounded-2xl relative shadow-sm group-hover:shadow-xl transition-all duration-500 bg-gray-100">
          <div className="absolute inset-0 bg-coco-text/0 group-hover:bg-coco-text/5 transition-colors duration-500 z-10 mix-blend-multiply" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-coco-text shadow-sm">
            {project.category}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2">
          <div className="max-w-2xl space-y-3">
            <div className="text-coco-accent font-mono text-sm tracking-widest">
              {String(index + 1).padStart(2, "0")} / {totalLabel}
            </div>

            <h3 className="text-4xl md:text-5xl font-display italic text-coco-text group-hover:text-coco-accent transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-gray-600 leading-relaxed text-lg max-w-lg">
              {project.description}
            </p>
          </div>

          <a
            href={project.link}
            className="group/btn flex items-center justify-center w-16 h-16 rounded-full border border-gray-300 hover:bg-coco-text hover:border-coco-text hover:text-white transition-all duration-300"
          >
            <ArrowUpRight
              size={24}
              className="group-hover/btn:rotate-45 transition-transform duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
