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

const mockProjects: Project[] = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "Product Design",
    description:
      "Reimagined the user experience for a complex financial data visualization platform. Increased user retention by 24% through intuitive navigation patterns.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    year: "2023",
    link: "#",
  },
  {
    id: 2,
    title: "EcoTrack Mobile",
    category: "UX Research",
    description:
      "A comprehensive sustainability tracking application. Conducted extensive user research to identify pain points in carbon footprint calculation.",
    image:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2670&auto=format&fit=crop",
    year: "2023",
    link: "#",
  },
  {
    id: 3,
    title: "Luxe Commerce",
    category: "Brand & Web",
    description:
      "Designed a bespoke e-commerce experience for a high-end fashion retailer. Focused on minimal aesthetics and high-performance interactions.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop",
    year: "2022",
    link: "#",
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
    el.scrollIntoView({ behavior: "smooth" });
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

  const onContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const onContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = `${contact.firstName} ${contact.lastName}`.trim();
    const subject =
      contact.subject.trim() || `Website inquiry from ${fullName || "someone"}`;

    const bodyLines = [
      `Name: ${fullName || "-"}`,
      `Email: ${contact.email || "-"}`,
      "",
      contact.message || "",
    ];

    const mailto = `mailto:hello@milikhatri.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen pb-32 selection:bg-coco-accent selection:text-white">
      <OuraRing />

      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* HERO (updated to match your old screenshot style) */}
      <section
        id={Section.HERO}
        className="bg-center bg-cover relative min-h-screen w-full overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${HeroImage})`,
            backgroundPosition: "75% 20%", // shifts subject to the right
          }}
        />

        {/* Readability overlay (soft, like your example) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              {/* label line */}
              <div className="flex items-center gap-4 text-white/80 mb-5">
                <span className="h-px w-16 bg-white/50" />
                <span className="text-sm tracking-widest uppercase">
                  UI/UX Designer &amp; Researcher
                </span>
              </div>

              {/* name */}
              <h1 className="font-display text-white leading-[0.95] drop-shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
                <span className="block italic text-6xl md:text-7xl lg:text-8xl">
                  Mili
                </span>
                <span className="block text-6xl md:text-7xl lg:text-8xl">
                  Khatri
                </span>
              </h1>

              {/* tagline */}
              <p className="mt-6 text-white/85 text-lg md:text-xl leading-relaxed max-w-xl">
                A Product Designer who bridges the gap between{" "}
                <span className="font-serif italic text-white">
                  complex data
                </span>{" "}
                and{" "}
                <span className="font-serif italic text-white">
                  human intuition
                </span>
                .
              </p>

              {/* button */}
              <div className="mt-8">
                <button
                  onClick={() => scrollToSection(Section.WORK)}
                  className="px-6 py-3 rounded-md bg-white/85 hover:bg-white text-coco-text border border-white/60 transition shadow-soft"
                >
                  View Select Work
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id={Section.WORK} className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-display italic mb-4">
              Selected Works
            </h2>
            <div className="w-16 h-1 bg-coco-accent mx-auto rounded-full" />
          </div>

          <div className="flex flex-col gap-12">
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
      <section id={Section.ABOUT} className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-coco-sand/45 rounded-2xl transform rotate-2 -z-0" />
            <img
              src={AboutImage}
              alt="Coco Portrait"
              className="w-full h-[580px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700 relative z-10 shadow-soft"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-display">More than just pixels.</h2>

            <p className="text-lg text-coco-text/70 leading-relaxed">
              I believe good design is invisible. It removes friction and helps
              users achieve their goals effortlessly. My frontend background
              helps me collaborate tightly with engineering—so the work ships
              beautifully.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="font-bold text-coco-accent mb-2">Services</h4>
                <ul className="text-sm space-y-2 text-coco-text/70">
                  <li>Design Systems</li>
                  <li>SaaS Product Design</li>
                  <li>Mobile Strategy</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-coco-accent mb-2">Tools</h4>
                <ul className="text-sm space-y-2 text-coco-text/70">
                  <li>Figma & Protopie</li>
                  <li>React & Tailwind</li>
                  <li>UserTesting</li>
                </ul>
              </div>
            </div>

            {/* Resume button */}
            <div className="pt-4">
              <a
                href="/legacy/MKResume.pdf"
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
      {/* CONTACT (old form style, new aesthetics) */}
      <section id={Section.CONTACT} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-5xl font-display tracking-tight">
              Get in touch
            </h2>
            <p className="text-coco-text/65 mt-3">
              Have a project or just want to say hi? I’d love to hear from you.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left info card */}
              <div className="rounded-2xl bg-white/70 border border-white/60 p-6">
                <div className="text-xs font-bold uppercase tracking-widest text-coco-text/60">
                  Contact
                </div>
                <div className="mt-4 space-y-2 text-coco-text/80">
                  <div className="text-sm">
                    <span className="font-semibold">Email:</span>{" "}
                    hello@milikhatri.com
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Location:</span> NJ / NYC
                    (Remote-friendly)
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Availability:</span> Open to
                    new projects
                  </div>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={onContactSubmit}
                className="lg:col-span-2 rounded-2xl bg-white/80 border border-white/60 p-6 md:p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-coco-text/55">
                      First Name *
                    </label>
                    <input
                      name="firstName"
                      value={contact.firstName}
                      onChange={onContactChange}
                      className="mt-2 w-full rounded-xl border border-coco-text/10 bg-white px-4 py-3 outline-none focus:border-coco-accent/60 focus:ring-2 focus:ring-coco-accent/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-coco-text/55">
                      Last Name *
                    </label>
                    <input
                      name="lastName"
                      value={contact.lastName}
                      onChange={onContactChange}
                      className="mt-2 w-full rounded-xl border border-coco-text/10 bg-white px-4 py-3 outline-none focus:border-coco-accent/60 focus:ring-2 focus:ring-coco-accent/20"
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
                      className="mt-2 w-full rounded-xl border border-coco-text/10 bg-white px-4 py-3 outline-none focus:border-coco-accent/60 focus:ring-2 focus:ring-coco-accent/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-coco-text/55">
                      Subject
                    </label>
                    <input
                      name="subject"
                      value={contact.subject}
                      onChange={onContactChange}
                      className="mt-2 w-full rounded-xl border border-coco-text/10 bg-white px-4 py-3 outline-none focus:border-coco-accent/60 focus:ring-2 focus:ring-coco-accent/20"
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
                      className="mt-2 w-full rounded-xl border border-coco-text/10 bg-white px-4 py-3 outline-none resize-none focus:border-coco-accent/60 focus:ring-2 focus:ring-coco-accent/20"
                      placeholder="Tell me what you’re working on…"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full py-4 rounded-xl bg-coco-accent text-white font-bold shadow-soft hover:opacity-95 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <ScrollToTopButton />
          <footer className="mt-16 text-center">
            <p className="font-display italic text-xl text-coco-text mb-2">
              Mili Khatri.
            </p>
            <p className="text-xs text-coco-text/45 uppercase tracking-widest">
              &copy; 2025. All Rights Reserved.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default App;
