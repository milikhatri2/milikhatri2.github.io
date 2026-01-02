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

  // refs for wheel-lock behavior (trackpad friendly)
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const lastStepAtRef = useRef(0);

  // Optional: unlock after reaching last testimonial (persisted)
  const completedRef = useRef(false);
  const [completed, setCompleted] = useState(() => {
    return localStorage.getItem("testimonialsCompleted") === "1";
  });

  useEffect(() => {
    completedRef.current = completed;
    if (completed) localStorage.setItem("testimonialsCompleted", "1");
  }, [completed]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Smooth scroll via rAF (more consistent than CSS smooth scroll across browsers)
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animateScrollTo = (toY: number, duration = 650) => {
    const fromY = window.scrollY;
    const diff = toY - fromY;
    const start = performance.now();

    isAnimatingRef.current = true;

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeInOutCubic(t);
      window.scrollTo(0, fromY + diff * eased);

      if (t < 1) requestAnimationFrame(step);
      else isAnimatingRef.current = false;
    };

    requestAnimationFrame(step);
  };

  // Keep active testimonial in sync with scroll position (so it still works if user drags scrollbar)
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

      // mark completed once we actually reach the last one
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

    const top = el.offsetTop;
    const vh = window.innerHeight;
    const target = top + i * vh;

    // update UI instantly
    setActiveIndex(i);

    // if jumping to last, mark complete
    if (i === items.length - 1 && !completedRef.current) setCompleted(true);

    animateScrollTo(target, 650);
  };

  // Wheel lock: step through each testimonial with smooth easing (no janky snap)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const el = sectionRef.current;
      if (!el) return;

      // If completed, do not lock anymore (like your older version)
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

      // Lock inside the steps
      e.preventDefault();

      // Ignore while animating
      if (isAnimatingRef.current) return;

      // Cooldown prevents trackpad "one swipe = 3 steps"
      const now = performance.now();
      if (now - lastStepAtRef.current < 500) return;
      lastStepAtRef.current = now;

      // One step per gesture
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = clamp(current + dir, 0, items.length - 1);

      // Mark complete on final
      if (next === items.length - 1 && !completedRef.current) setCompleted(true);

      const target = top + next * vh;

      setActiveIndex(next);
      animateScrollTo(target, 650);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [items.length]);

  const active = items[activeIndex];

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
            {/* Left */}
            <div className="lg:col-span-4">
              <h2 className="font-display italic text-4xl md:text-5xl leading-[0.95] text-coco-text">
                What people
                <br />
                are saying
              </h2>

              <div className="mt-6 text-xs text-coco-text/50 uppercase tracking-widest">
                Scroll to read each testimonial
              </div>

              {/* Tabs (always visible, wraps on desktop; scrolls on mobile) */}
              <div className="mt-8">
                <div className="-mx-2 px-2 overflow-x-auto lg:overflow-visible">
                  <div className="flex lg:flex-wrap gap-2 min-w-max lg:min-w-0 pb-2">
                    {items.map((t, i) => {
                      const isActive = i === activeIndex;
                      return (
                        <button
                          key={`${t.name}-${i}`}
                          type="button"
                          onClick={() => jumpTo(i)}
                          className={[
                            "px-4 py-2 rounded-full text-left whitespace-nowrap",
                            "transition-all duration-200 border",
                            isActive
                              ? "bg-coco-accent text-white border-coco-accent shadow-soft"
                              : "bg-white/40 border-white/60 text-coco-text/70 hover:text-coco-text hover:bg-white/60",
                          ].join(" ")}
                        >
                          <div className="text-sm font-semibold leading-tight">
                            {t.name}
                          </div>
                          <div className="text-[11px] opacity-80">{t.role}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="lg:col-span-8">
              {/* Plain text, no card */}
              <p className="text-lg md:text-xl text-coco-text/80 leading-relaxed max-w-2xl">
                “{active.quote}”
              </p>

              <div className="mt-6 text-sm text-coco-text/70">
                <span className="font-semibold text-coco-text">
                  {active.name}
                </span>{" "}
                <span className="text-coco-text/50">— {active.role}</span>
              </div>

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

              <div className="mt-4 text-sm text-coco-text/55">
                {activeIndex + 1} / {items.length}
              </div>

              {/* Optional: quick reset for dev/testing */}
              {/* <button
                type="button"
                className="mt-8 text-xs underline text-coco-text/50"
                onClick={() => {
                  localStorage.removeItem("testimonialsCompleted");
                  setCompleted(false);
                }}
              >
                Reset testimonials lock
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
