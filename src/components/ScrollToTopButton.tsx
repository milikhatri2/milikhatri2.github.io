import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    // instant jump
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={[
        "fixed bottom-6 right-6 z-50",
        "h-14 w-14 rounded-full",
        "bg-coco-text text-white shadow-soft",
        "flex items-center justify-center",
        "border border-white/10",
        "transition-all duration-200",
        "hover:scale-110 hover:bg-coco-text/90",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coco-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-coco-bg",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none",
      ].join(" ")}
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
};

export default ScrollToTopButton;
