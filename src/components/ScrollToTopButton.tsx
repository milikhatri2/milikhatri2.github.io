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
  const start = window.scrollY;
  const duration = 350; // fast but not jarring (try 250–450)

  const startTime = performance.now();

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const tick = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeOutCubic(progress);

    window.scrollTo(0, Math.round(start * (1 - eased)));

    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={[
        "fixed bottom-8 right-8 z-50",
        "h-16 w-16 rounded-full",
        "bg-coco-purple text-white shadow-soft",
        "flex items-center justify-center",
        "border border-white/10",
        "transition-all duration-200",
        "hover:scale-110 hover:bg-coco-purple",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coco-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-coco-bg",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 pointer-events-none",
      ].join(" ")}
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
};

export default ScrollToTopButton;
