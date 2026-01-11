import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import ProjectCard from "./components/ProjectCard";
import { Section, type Project } from "./types";
import { ExternalLink } from "lucide-react";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Testimonials from "./components/Testimonials";
import OuraRing from "./components/OuraRing";
import HeroImage from "./assets/HeroImage.jpg";
import AboutImage from "./assets/AboutmeImage.jpg";
import ADMCover from "./assets/ADMCover.png";
import HarmonizeCover from "./assets/HarmonizeCover.png";
import ResumePdf from "./assets/MKResume.pdf";

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Angeles De Medellin",
    category: "Web Design",
    description:
      "An intentional redesign aimed at strengthening connection, clarity, and community support through thoughtful UX.",
    image: ADMCover,
    year: "2023",
    link: "../angeles.html",
  },
  {
    id: 2,
    title: "Harmonize",
    category: "Product Design",
    description:
      "This project explores a mobile app concept that transforms music learning into an interactive, beginner-friendly, and motivating experience through gamification.",
    image: HarmonizeCover,
    year: "2023",
    link: "../harmonize.html",
  },
];

type ContactFormState = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);
  const [showLogo, setShowLogo] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const [aboutInView, setAboutInView] = useState(false);

  const [contact, setContact] = useState<ContactFormState>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const scrollToSection = (section: Section) => {
    const el = document.getElementById(section);
    if (!el) return;

    // Use scrollIntoView but sections have scroll-margins so they don't tuck under top UI.
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(section);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.values(Section) as Section[];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const aboutEl = document.getElementById(Section.ABOUT);
    if (!aboutEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAboutInView(entry.isIntersecting),
      {
        // triggers when ~35% of the ABOUT section is visible
        threshold: 0.35,
      }
    );

    observer.observe(aboutEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const heroEl = document.getElementById(Section.HERO);
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowLogo(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const onContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 350;

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

  const onContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      const formData = new FormData();
      formData.append("first", contact.firstName);
      formData.append("last", contact.lastName);
      formData.append("email", contact.email);
      formData.append("subject", contact.subject);
      formData.append("message", contact.message);

      // optional honeypot:
      formData.append("_gotcha", "");

      const res = await fetch("https://formspree.io/f/mblonnzn", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!res.ok) throw new Error("Bad response");

      setStatus("success");
      setContact({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const bottomReserve =
    "pb-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom)+0.75rem)]";

  return (
    <div
      className={[
        "min-h-[100dvh]",
        "text-[14px] sm:text-[15px]",
        "selection:bg-coco-accent selection:text-white",
        // reserve space for fixed bottom nav + iPhone home bar
        bottomReserve,
      ].join(" ")}
    >
      <OuraRing />

      {/* Centered logo overlay (optional) */}
      <button
        type="button"
        onClick={() => scrollToSection(Section.HERO)}
        aria-label="Back to top"
        className={[
          "fixed top-[calc(1.25rem+env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-[60]",
          "transition-all duration-500 ease-out",
          showLogo
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none",
          "select-none",
        ].join(" ")}
      />

      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        showTop={showTop}
        onTopClick={scrollToTop}
      />

      {/* HERO */}
      <section
        id={Section.HERO}
        className={[
          "relative w-full overflow-hidden",
          "min-h-[100dvh]", // real phone viewport
          "bg-center bg-cover",
        ].join(" ")}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${HeroImage})`,
            backgroundPosition: "75% 20%",
          }}
        />

        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div
          className={[
            "relative z-10",
            "min-h-[100dvh]",
            "flex items-end",
            // keep content safely above bottom nav + home indicator
            "pb-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom)+1.25rem)]",
            // move content UP on small screens so it doesn't feel too low
            "pt-[calc(1rem+env(safe-area-inset-top))]",
          ].join(" ")}
        >
          <div className="w-full max-w-7xl mx-auto px-5 sm:px-6">
            <div className="max-w-2xl">
              {/* label line */}
              <div className="flex items-center gap-4 text-white/80 mb-4 sm:mb-5">
                <span className="h-px w-12 sm:w-16 bg-white/50" />
                <span className="text-[10px] sm:text-xs tracking-[0.18em] uppercase">
                  UI/UX Designer &amp; Researcher
                </span>
              </div>

              {/* name */}
              <h1 className="font-display text-white leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
                <span className="block italic text-[clamp(2.65rem,9.5vw,6.25rem)]">
                  Mili
                </span>
                <span className="block text-[clamp(2.65rem,9.5vw,6.25rem)]">
                  Khatri
                </span>
              </h1>

              {/* tagline */}
              <p className="mt-4 sm:mt-5 text-white/85 text-[clamp(0.95rem,3.6vw,1.1rem)] leading-relaxed max-w-xl">
                A designer who bridges the gap between{" "}
                <span className="italic text-coco-accent">complex data</span>{" "}
                and{" "}
                <span className="italic text-coco-accent">human intuition</span>
                .
              </p>

              {/* button */}
              <div className="mt-5 sm:mt-7">
                <button
                  onClick={() => scrollToSection(Section.WORK)}
                  className={[
                    "inline-flex items-center justify-center",
                    "px-5 py-2.5 rounded-full",
                    "text-sm font-medium",
                    "text-white/90 hover:text-white",
                    "bg-white/10 hover:bg-white/15",
                    "border border-white/25 hover:border-white/40",
                    "backdrop-blur-sm",
                    "transition",
                  ].join(" ")}
                >
                  View Select Work
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section
        id={Section.WORK}
        className={[
          "scroll-mt-10",
          "px-[clamp(1.1rem,4vw,1.75rem)]",
          "py-[clamp(2.75rem,5.5vw,5rem)]",
          "pb-24 md:pb-24",
        ].join(" ")}
      >
        <div className="max-w-5xl lg:max-w-6xl 2xl:max-w-7xl mx-auto">
          <div className="text-center mb-[clamp(2rem,4.5vw,3.5rem)]">
            <h2 className="font-display italic text-[clamp(2rem,4.2vw,3.1rem)] mb-3">
              Selected Works
            </h2>
            <div className="w-14 h-1 bg-coco-accent mx-auto rounded-full" />
          </div>

          <div className="flex flex-col gap-[clamp(5rem,8vw,7rem)]">
            {mockProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                totalCount={mockProjects.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id={Section.ABOUT}
        className="scroll-mt-10 py-16 md:py-24 px-5 md:px-6"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-coco-sand/45 rounded-2xl transform rotate-2 -z-0" />
            <img
              src={AboutImage}
              alt="Coco Portrait"
              className={[
                "w-full h-[420px] sm:h-[520px] md:h-[580px] object-cover rounded-xl",
                "transition-all duration-700 relative z-10 shadow-soft",
                aboutInView ? "grayscale-0" : "grayscale",
                "hover:grayscale-0",
              ].join(" ")}
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-[clamp(2.1rem,4.2vw,3.2rem)] font-display">
              More than just pixels.
            </h2>

            <p className="text-coco-text/70 text-[16px]">
              I design intuitive, experience-driven interfaces where every
              detail has a purpose. I focus on clarity, flow, and the small
              details that help users move effortlessly through an interface. My
              frontend background supports close collaboration with engineering
              and smooth execution.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 sm:pt-6">
              <div>
                <h4 className="md:text-lg font-bold text-coco-accent mb-2">
                  Services
                </h4>
                <ul className="text-md space-y-2 text-coco-text/70">
                  <li>Product & UX/UI Design</li>
                  <li>Design Systems</li>
                  <li>Web & Mobile Experience Design</li>
                </ul>
              </div>

              <div>
                <h4 className="md:text-lg font-bold text-coco-accent mb-2">
                  Tools
                </h4>
                <ul className="text-md space-y-2 text-coco-text/70">
                  <li>Figma</li>
                  <li>Adobe Creative Cloud</li>
                  <li>React & Tailwind</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <a
                href={ResumePdf}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/70 hover:bg-white transition-colors border border-white/60 shadow-soft"
              >
                View Resume{" "}
                <ExternalLink size={18} className="text-coco-accent" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CONTACT */}
      <section
        id={Section.CONTACT}
        className={[
          "scroll-mt-10",
          "pt-[clamp(3rem,6vw,5rem)]",
          "pb-[clamp(2.5rem,5vw,4rem)]",
          "px-[clamp(1.1rem,4vw,1.75rem)]",
        ].join(" ")}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-[clamp(1.25rem,3vw,2rem)]">
            <h2 className="font-display tracking-tight text-[clamp(2.1rem,4.2vw,3.1rem)]">
              Get in touch
            </h2>
            <p className="text-coco-text/65 mt-2 text-[clamp(0.95rem,1.3vw,1.05rem)]">
              Have a project or just want to say hi? I’d love to hear from you.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-4 md:p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="rounded-2xl bg-white border border-coco-text/10 p-6 shadow-soft">
                <div className="text-md font-bold uppercase tracking-widest text-coco-text/80 text-center">
                  Contact
                </div>
                <div className="mt-4 space-y-3 text-coco-text">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-sm uppercase tracking-widest text-coco-text/50">
                      Email
                    </div>
                    <div className="text-md text-coco-text text-right">
                      mili@milikhatri.com
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="text-sm uppercase tracking-widest text-coco-text/50">
                      Location
                    </div>
                    <div className="text-md text-coco-text text-right">
                      NJ / NYC{" "}
                      <span className="text-coco-text/60">(Flexible)</span>
                    </div>
                  </div>
                </div>
              </div>

              <form
                onSubmit={onContactSubmit}
                className="lg:col-span-2 rounded-2xl bg-white border border-coco-text/10 p-5 md:p-6 shadow-soft"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-coco-text/55">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={contact.firstName}
                      onChange={onContactChange}
                      className="mt-2 w-full rounded-2xl border border-coco-text/10 bg-white px-4 py-3 outline-none focus:border-coco-accent/60 focus:ring-2 focus:ring-coco-accent/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-coco-text/55">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={contact.lastName}
                      onChange={onContactChange}
                      className="mt-2 w-full rounded-2xl border border-coco-text/10 bg-white px-4 py-3 outline-none focus:border-coco-accent/60 focus:ring-2 focus:ring-coco-accent/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-coco-text/55">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={contact.email}
                      onChange={onContactChange}
                      className="mt-2 w-full rounded-2xl border border-coco-text/10 bg-white px-4 py-3 outline-none focus:border-coco-accent/60 focus:ring-2 focus:ring-coco-accent/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-coco-text/55">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={contact.subject}
                      onChange={onContactChange}
                      className="mt-2 w-full rounded-2xl border border-coco-text/10 bg-white px-4 py-3 outline-none focus:border-coco-accent/60 focus:ring-2 focus:ring-coco-accent/20"
                      placeholder="e.g., Product Design role, Freelance project…"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-coco-text/55">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={contact.message}
                      onChange={onContactChange}
                      rows={6}
                      className="mt-2 w-full rounded-2xl border border-coco-text/10 bg-white px-4 py-3 outline-none resize-none focus:border-coco-accent/60 focus:ring-2 focus:ring-coco-accent/20"
                      placeholder="Tell me what you’re working on…"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-6 w-full py-4 rounded-full bg-coco-purple text-white font-bold shadow-soft hover:opacity-95 transition disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Submit"}
                </button>

                {status === "success" && (
                  <p className="mt-4 text-sm text-coco-text/70">
                    Thanks! I’ll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-4 text-sm text-red-600">
                    Something went wrong—please try again.
                  </p>
                )}
              </form>
            </div>
          </div>

          <ScrollToTopButton />

          <footer className="mt-16 text-center">
            <p className="font-display italic text-xl text-coco-text mb-2">
              Mili Khatri.
            </p>
            <p className="text-xs text-coco-text/45 uppercase tracking-widest">
              &copy; 2026. All Rights Reserved.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default App;
