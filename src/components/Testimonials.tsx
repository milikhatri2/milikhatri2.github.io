import React, { useEffect, useMemo, useRef, useState } from "react";
import { Section } from "../types";
import deniseAvatar from "../assets/Denise.png";
import presidentAvatar from "../assets/P.png";
import markAvatar from "../assets/M.png";
import rodneyAvatar from "../assets/Rodney.png";

type Testimonial = {
  name: string;
  role: string;
  quote: React.ReactNode;
  avatar: string; // ✅ add this
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const EPS = 0.00001;

type Metrics = {
  top: number;
  vh: number;
  startY: number;
  endY: number;
};

const Testimonials: React.FC = () => {
  const items: Testimonial[] = useMemo(
    () => [
      {
        name: "Denise S.",
        role: "Founder of Let Mommy Sleep",
        avatar: deniseAvatar,
        quote: (
          <>
            What I liked best about working with Mili is that while I had the{" "}
            &apos;
            <span className="font-semibold not-italic">big picture</span>
            &apos; of what the website redesign should be, I knew I could depend
            on Mili’s expertise to turn the big picture into a detailed project
            and intuitive user experience... The project result{" "}
            <span className="font-semibold not-italic">
              exceeded what I envisioned
            </span>
            ... On some parts of the project, Mili would present several options
            with a considered explanation of the logic behind each design... I
            appreciated Mili’s honest{" "}
            <span className="font-semibold not-italic">
              communication style and professionalism
            </span>
            .
          </>
        ),
      },
      {
        name: "President",
        role: "Be the Cause.org",
        avatar: presidentAvatar,
        quote: (
          <>
            Mili joined Be the Cause.org as a{" "}
            <span className="font-semibold not-italic">
              UI/UX Design Intern
            </span>{" "}
            and quickly became an integral part of our creative process...
            design thinking and attention to detail, crafting accessible and
            visually consistent layouts that{" "}
            <span className="font-semibold not-italic">
              elevated our digital presence
            </span>
            ... Mili{" "}
            <span className="font-semibold not-italic">
              developed a comprehensive style guide
            </span>{" "}
            defining typography, color usage, and component behavior, helping
            the team{" "}
            <span className="font-semibold not-italic">
              maintain design consistency and efficiency
            </span>
            ...{" "}
            <span className="font-semibold not-italic">
              eye for interaction and responsive design
            </span>{" "}
            ensured that every element looked and functioned beautifully across
            devices.
          </>
        ),
      },
      {
        name: "Mark D.",
        role: "Founder of Starside Development",
        avatar: markAvatar,
        quote: (
          <>
            Mili is an absolute pleasure to work with. She’s thoughtful, a great
            communicator, and deeply attuned to client needs. Mili has a rare
            ability to{" "}
            <span className="font-semibold not-italic">
              blend creative design
            </span>{" "}
            with{" "}
            <span className="font-semibold not-italic">
              first-class user experience,
            </span>{" "}
            consistently delivering{" "}
            <span className="font-semibold not-italic">
              beautifully crafted, effective solutions.
            </span>
          </>
        ),
      },
      {
        name: "Rodney N.",
        role: "Frontend Software Engineer at HubSpot and Owner of Shoreline Web Studio",
        avatar: rodneyAvatar,
        quote: (
          <>
            Mili was a{" "}
            <span className="font-semibold not-italic">
              fantastic UI/UX designer
            </span>{" "}
            for Shoreline Web Studio on our project for the Angeles De Medellin
            Foundation... She was{" "}
            <span className="font-semibold not-italic">
              professional, reliable
            </span>
            , and took{" "}
            <span className="font-semibold not-italic">
              full ownership of the design deliverables
            </span>
            ... Her ability to translate our vision into tangible assets was
            truly impressive... Mili has a{" "}
            <span className="font-semibold not-italic">
              clear passion for design
            </span>{" "}
            and delivers high-quality work.
          </>
        ),
      },
    ],
    []
  );

  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const rafRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const lastStepAtRef = useRef(0);
  const deltaAccRef = useRef(0);

  const reachedLastAtRef = useRef<number | null>(null);
  const LAST_DWELL_MS = 1000;

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

  const metricsRef = useRef<Metrics>({
    top: 0,
    vh: 0,
    startY: 0,
    endY: 0,
  });

  const recalcMetrics = () => {
    const el = sectionRef.current;
    if (!el) return;

    const vh = window.innerHeight;
    const top = el.offsetTop;
    const startY = top + vh * 0.5;
    const endY = startY + (items.length - 1) * vh;

    metricsRef.current = { top, vh, startY, endY };
  };

  useEffect(() => {
    recalcMetrics();
    const onResize = () => recalcMetrics();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animateScrollTo = (toY: number, duration = 650) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const fromY = window.scrollY;
    const diff = toY - fromY;
    const start = performance.now();

    isAnimatingRef.current = true;

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeInOutCubic(t);

      window.scrollTo(0, fromY + diff * eased);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
        isAnimatingRef.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(step);
  };

  const goToIndex = (i: number, duration = 650) => {
    const { startY, vh } = metricsRef.current;

    setActiveIndex(i);

    if (i === items.length - 1) {
      reachedLastAtRef.current = performance.now();
    } else {
      reachedLastAtRef.current = null;
    }

    animateScrollTo(startY + i * vh, duration);
  };

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const { startY, vh } = metricsRef.current;
      const y = window.scrollY;

      const raw = (y - startY) / vh;
      const idx = clamp(Math.floor(raw + EPS), 0, items.length - 1);

      if (idx !== activeIndexRef.current) {
        setActiveIndex(idx);
        activeIndexRef.current = idx;
      }

      if (idx === items.length - 1 && !completedRef.current) {
        if (reachedLastAtRef.current == null) {
          reachedLastAtRef.current = performance.now();
        }
      } else if (idx !== items.length - 1) {
        reachedLastAtRef.current = null;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items.length]);

  useEffect(() => {
    const DELTA_THRESHOLD = 50;
    const COOLDOWN_MS = 420;

    const onWheel = (e: WheelEvent) => {
      const el = sectionRef.current;
      if (!el) return;

      if (completedRef.current) return;

      const { startY, endY, vh } = metricsRef.current;
      const y = window.scrollY;
      const inLockRange = y >= startY && y <= endY;

      if (!inLockRange) {
        deltaAccRef.current = 0;
        return;
      }

      const current = activeIndexRef.current;
      const last = items.length - 1;

      if (current === 0 && e.deltaY < 0) {
        deltaAccRef.current = 0;
        return;
      }

      if (current === last && e.deltaY > 0) {
        const reachedAt = reachedLastAtRef.current ?? performance.now();
        reachedLastAtRef.current = reachedAt;

        const waited = performance.now() - reachedAt >= LAST_DWELL_MS;

        if (!waited) {
          e.preventDefault();
          return;
        }

        setCompleted(true);
        return;
      }

      e.preventDefault();
      if (isAnimatingRef.current) return;

      const now = performance.now();
      if (now - lastStepAtRef.current < COOLDOWN_MS) return;

      deltaAccRef.current += e.deltaY;
      if (Math.abs(deltaAccRef.current) < DELTA_THRESHOLD) return;

      lastStepAtRef.current = now;

      const dir = deltaAccRef.current > 0 ? 1 : -1;
      deltaAccRef.current = 0;

      const next = clamp(current + dir, 0, last);

      if (next === last) reachedLastAtRef.current = performance.now();

      setActiveIndex(next);
      activeIndexRef.current = next;

      animateScrollTo(startY + next * vh, 650);
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
      style={{ height: `${(items.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-start">
            {/* LEFT */}
            <div className="lg:col-span-4">
              <h2 className="font-display italic text-5xl md:text-6xl leading-[0.95] text-coco-text">
                What people
                <br />
                are saying
              </h2>

              <div className="mt-6 text-xs text-coco-text/50 uppercase tracking-widest">
                Scroll to read each testimonial
              </div>

              {/* Dot list */}
              <div
                className={[
                  "mt-8 lg:mt-10",
                  "flex lg:block",
                  "gap-3 lg:gap-0",
                  "overflow-x-auto lg:overflow-visible",
                  "pb-2 lg:pb-0",
                  "lg:space-y-7",
                  "[-webkit-overflow-scrolling:touch]",
                ].join(" ")}
              >
                {items.map((t, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={`${t.name}-${i}`}
                      type="button"
                      onClick={() => goToIndex(i, 650)}
                      className={[
                        "group flex items-start gap-4 text-left w-full",
                        "transition-opacity duration-200",
                        isActive
                          ? "opacity-100"
                          : "opacity-65 hover:opacity-85",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "mt-1.5 inline-block shrink-0 h-2.5 w-2.5 rounded-full border transition-all duration-200",
                          isActive
                            ? "bg-coco-purple border-coco-purple"
                            : "bg-transparent border-coco-text/20 group-hover:border-coco-text/35",
                        ].join(" ")}
                        aria-hidden="true"
                      />

                      {/* ✅ avatar + text */}
                      <span className="flex items-start gap-3">
                        <img
                          src={t.avatar}
                          alt={`${t.name} profile`}
                          className={[
                            "mt-0.5 h-8 w-8 rounded-full object-cover",
                            "border border-white/70 shadow-soft",
                          ].join(" ")}
                          loading="lazy"
                          decoding="async"
                        />

                        <span>
                          <div
                            className={[
                              "font-semibold leading-tight",
                              isActive ? "text-coco-text" : "text-coco-text/70",
                            ].join(" ")}
                          >
                            {t.name}
                          </div>
                          <div className="text-sm text-coco-text/45 leading-tight">
                            {t.role}
                          </div>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT */}
            <div
              className={[
                "lg:col-span-6",
                "lg:pt-44",
                "pb-8",
                "flex flex-col",
                "min-h-[clamp(420px,60vh,560px)]",
              ].join(" ")}
            >
              <div className="flex-1">
                <p className="text-[17px] text-coco-text/80 max-w-2xl">
                  {active.quote}
                </p>
              </div>

              <div className="mt-10 flex items-center gap-5">
                {/* ✅ swap circle for real image */}
                <img
                  src={active.avatar}
                  alt={`${active.name} profile`}
                  className="h-14 w-14 rounded-full object-cover border border-white/70 shadow-soft"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div className="font-semibold text-coco-text">
                    {active.name}
                  </div>
                  <div className="text-sm text-coco-text/50">{active.role}</div>
                </div>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex gap-2">
                  {items.map((_, i) => (
                    <span
                      key={i}
                      className={[
                        "h-1.5 rounded-full transition-all duration-300",
                        i === activeIndex
                          ? "w-10 bg-coco-purple"
                          : "w-4 bg-coco-text/15",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <div className="text-sm text-coco-text/55">
                  {activeIndex + 1} / {items.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
