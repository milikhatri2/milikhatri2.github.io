import React, { useEffect, useMemo, useRef, useState } from "react";
import { Section } from "../types";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const Testimonials: React.FC = () => {
  const items: Testimonial[] = useMemo(
    () => [
      {
        name: "Alex Chen",
        role: "Product Lead",
        quote:
          "The redesign elevated the product instantly. The storytelling is clearer, navigation is smoother, and everything feels more intentional. It made the work feel premium without losing warmth.",
      },
      {
        name: "Priya Patel",
        role: "Founder",
        quote:
          "We finally have a site that communicates our mission in seconds. Stakeholders understood our goals faster, and we saw more people actually complete sign-ups and reach out to collaborate.",
      },
      {
        name: "Jordan Kim",
        role: "Engineering Manager",
        quote:
          "Design + dev handoff was unbelievably clean. The system is consistent, scalable, and easy to build from—so we shipped faster and with fewer iterations.",
      },
      {
        name: "Sam Rivera",
        role: "UX Researcher",
        quote:
          "The final experience balances elegance and usability. The accessibility choices and hierarchy make it feel effortless to understand—especially for first-time visitors.",
      },
    ],
    []
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimatingRef = useRef(false);

  const [completed, setCompleted] = useState(() => {
    return localStorage.getItem("testimonialsCompleted") === "1";
  });

  const activeIndexRef = useRef(0);
  const completedRef = useRef(completed);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    completedRef.current = completed;
    if (completed) localStorage.setItem("testimonialsCompleted", "1");
  }, [completed]);

  // Update active testimonial based on scroll position inside this section
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const top = el.offsetTop;
      const vh = window.innerHeight;
      const y = window.scrollY;

      const raw = (y - top) / vh;
      const idx = clamp(Math.floor(raw + 0.00001), 0, items.length - 1);

      setActiveIndex(idx);

      // Mark completed once we actually reach the last one (even if we got there by clicking)
      if (idx === items.length - 1 && !completedRef.current) {
        setCompleted(true);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const jumpTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;

    if (i === items.length - 1 && !completedRef.current) setCompleted(true);

    window.scrollTo({
      top: el.offsetTop + i * window.innerHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const LOCK_MS = 260; // quicker than 550
    const SNAP_BEHAVIOR: ScrollBehavior = "auto"; // "auto" feels MUCH faster; change to "smooth" if you prefer

    const onWheel = (e: WheelEvent) => {
      const el = sectionRef.current;
      if (!el) return;

      // Once completed, never lock again
      if (completedRef.current) return;

      const top = el.offsetTop;
      const vh = window.innerHeight;
      const y = window.scrollY;

      const start = top;
      const end = top + items.length * vh - vh;
      const inRange = y >= start && y <= end;

      if (!inRange) return;

      const current = activeIndexRef.current;

      // Allow leaving the section at edges
      if (current === 0 && e.deltaY < 0) return;
      if (current === items.length - 1 && e.deltaY > 0) return;

      // Lock to step-by-step
      e.preventDefault();
      if (isAnimatingRef.current) return;

      // Allow "faster scroll" to skip more than 1 if the wheel delta is big
      const abs = Math.abs(e.deltaY);
      const step = abs > 180 ? 2 : 1; // tweak: 2 steps if a strong scroll
      const dir = e.deltaY > 0 ? 1 : -1;

      const next = clamp(current + dir * step, 0, items.length - 1);

      isAnimatingRef.current = true;
      window.scrollTo({ top: top + next * vh, behavior: SNAP_BEHAVIOR });

      window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, LOCK_MS);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [items.length]);

  return (
    <section
      id={Section.TESTIMONIALS}
      ref={(node) => {
        sectionRef.current = node;
      }}
      className="relative px-6"
      style={{ height: `${items.length * 100}vh` }}
    >
      {/* Sticky panel that stays while you scroll through steps */}
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left title + list */}
            <div className="lg:col-span-4">
              <h2 className="font-display italic text-5xl leading-[0.95]">
                What people
                <br />
                are saying
              </h2>

              <ul className="mt-10 space-y-5">
                {items.map((t, i) => {
                  const active = i === activeIndex;
                  return (
                    <li
                      key={`${t.name}-${i}`}
                      className="flex items-start gap-4"
                    >
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        className={[
                          "w-full text-left flex items-start gap-4 rounded-xl p-2 -ml-2",
                          "transition-all duration-200",
                          "hover:bg-white/40 hover:backdrop-blur-sm",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coco-accent/50",
                          i === activeIndex ? "opacity-100" : "opacity-55",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "mt-2 h-2.5 w-2.5 rounded-full shrink-0",
                            i === activeIndex
                              ? "bg-coco-accent"
                              : "bg-coco-text/20",
                          ].join(" ")}
                        />
                        <div>
                          <div
                            className={[
                              "text-sm font-semibold",
                              i === activeIndex
                                ? "text-coco-text"
                                : "text-coco-text/70",
                            ].join(" ")}
                          >
                            {t.name}
                          </div>
                          <div className="text-xs text-coco-text/55">
                            {t.role}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 text-xs text-coco-text/50 uppercase tracking-widest">
                Scroll to read each testimonial
              </div>
            </div>

            {/* Right quote card */}
            <div className="lg:col-span-8">
              <div className="glass-panel rounded-3xl p-7 md:p-10">
                <p className="text-lg md:text-xl text-coco-text/80 leading-relaxed">
                  {items[activeIndex]?.quote}
                </p>

                <div className="mt-10 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-coco-sand border border-white/60" />
                  <div>
                    <div className="text-sm font-semibold text-coco-text">
                      {items[activeIndex]?.name}
                    </div>
                    <div className="text-xs text-coco-text/55">
                      {items[activeIndex]?.role}
                    </div>
                  </div>
                </div>

                {/* little progress */}
                <div className="mt-8 flex gap-2">
                  {items.map((_, i) => (
                    <span
                      key={i}
                      className={[
                        "h-1.5 rounded-full transition-all duration-300",
                        i === activeIndex
                          ? "w-10 bg-coco-accent"
                          : "w-4 bg-coco-text/15",
                      ].join(" ")}
                    />
                  ))}
                </div>
              </div>

              {/* subtle helper */}
              <div className="mt-4 text-sm text-coco-text/55">
                {activeIndex + 1} / {items.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
