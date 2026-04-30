import type { MouseEvent } from "react";
import { FolderKanban, HeartHandshake, Home } from "lucide-react";

type ProjectNavigationProps = {
  current: "chaw" | "angeles" | "harmonize";
  onHome: () => void;
};

const ProjectNavigation = ({ current, onHome }: ProjectNavigationProps) => {
  const items = [
    {
      label: "Home",
      href: "#",
      icon: Home,
      active: false,
      onClick: (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onHome();
      },
    },
    {
      label: "CHAW",
      href: "#/projects/chaw",
      icon: FolderKanban,
      active: current === "chaw",
    },
    {
      label: "Angeles",
      href: "./angeles.html",
      icon: HeartHandshake,
      active: current === "angeles",
    },
    // {
    //   label: "Harmonize",
    //   href: "./harmonize.html",
    //   icon: Layers3,
    //   active: current === "harmonize",
    // },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 z-50 w-auto -translate-x-1/2">
      <nav className="glass-panel flex items-center gap-1 rounded-full px-2 py-2 shadow-2xl">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              onClick={item.onClick}
              className={[
                "relative flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-all duration-300 sm:px-5",
                item.active
                  ? "bg-coco-nav-button text-white shadow-lg"
                  : "text-gray-500 hover:bg-coco-purple-light/20 hover:text-coco-text",
              ].join(" ")}
            >
              <Icon size={18} />
              <span className="hidden md:inline">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default ProjectNavigation;
