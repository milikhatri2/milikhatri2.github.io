import { type ReactNode, useEffect, useRef, useState } from "react";
import {
  Calendar,
  CircleGauge,
  FlaskConical,
  Layers3,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react";
import addCartV1 from "../assets/chaw/wireframe-add-cart-v1.png";
import addCartV2 from "../assets/chaw/wireframe-add-cart-v2.png";
import cartV1 from "../assets/chaw/wireframe-cart-v1.png";
import cartV2 from "../assets/chaw/wireframe-cart-v2.png";
import adminV1 from "../assets/chaw/wireframe-admin-v1.png";
import adminV2 from "../assets/chaw/wireframe-admin-v2.png";
import chawBanner from "../assets/chaw/chaw-banner.png";
import adminPrototypeGif from "../assets/chaw/admin-registration-prototype.gif";
import consumerPrototypeGif from "../assets/chaw/consumer-registration-prototype.gif";
import SarahPersonaImage from "../assets/SarahPersona.png";
import OuraRing from "./OuraRing";
import ProjectNavigation from "./ProjectNavigation";

type CHAWProjectPageProps = {
  onBack: () => void;
};

type MetricCard = {
  label: string;
  value?: number;
  suffix?: string;
  staticValue?: string;
  icon: LucideIcon;
};

type WireframeVersion = {
  label: string;
  image: string;
  notes: string[];
};

type WireframeGroup = {
  page: string;
  versions: [WireframeVersion, WireframeVersion];
};

const metricCards: MetricCard[] = [
  { label: "Project Duration", value: 7, suffix: " mo", icon: Calendar },
  { label: "User Groups Served", value: 2, icon: Users },
  { label: "Usability Study Rounds", value: 2, icon: FlaskConical },
  { label: "Figma Prototype", staticValue: "HiFi", icon: Layers3 },
];

const frictionPoints = [
  {
    number: "1",
    title: "Inconsistent Visual Hierarchy",
    body: "Inconsistent typography, spacing, and component styling made it difficult for users to know where to focus or what actions to take next, leading to confusion at every stage of the flow.",
  },
  {
    number: "2",
    title: "Difficulty Differentiating Classes",
    body: "Users struggled to scan and compare classes due to inconsistent card layouts, dense text blocks, and absent hierarchy, making it harder to evaluate which program was the right fit.",
  },
  {
    number: "3",
    title: "Admin Workflows Were Not Optimized",
    body: "Internal administrators lacked a streamlined way to register students, review enrolled data, and manage class details. Plugin-driven tools made internal workflows manual and time-consuming.",
  },
];

const wireframeGroups: WireframeGroup[] = [
  {
    page: "Page: Add a class to your cart",
    versions: [
      {
        label: "Version 1",
        image: addCartV1,
        notes: [
          "Gives equal visual weight to class images, details, add-ons, and pricing.",
          "Balanced layout allows users to view all information in one structured flow.",
          "Provides clear visibility into add-on selections and total cost.",
        ],
      },
      {
        label: "Version 2",
        image: addCartV2,
        notes: [
          "Prioritizes the class experience with larger imagery and more focus on program details.",
          "Add-ons and pricing are condensed into a smaller section.",
          "Encourages users to connect with the class content before reviewing purchase details.",
        ],
      },
    ],
  },
  {
    page: "Page: Cart",
    versions: [
      {
        label: "Version 1",
        image: cartV1,
        notes: [
          "Includes images for each class added to the cart.",
          "Explores two different layout variations for how pricing and cart details are structured.",
          "Designs to give users more visual context about the classes they are purchasing.",
        ],
      },
      {
        label: "Version 2",
        image: cartV2,
        notes: [
          "Removes class images to create a more simplified, information-focused layout.",
          "Explores two variants for organizing pricing and cart information.",
          "Focuses on efficiency and clarity for users reviewing costs and finalizing purchases.",
        ],
      },
    ],
  },
  {
    page: "Page: Registering a student Admin",
    versions: [
      {
        label: "Version 1",
        image: adminV1,
        notes: [
          "Focuses on a simplified workflow using only the responsible party's name.",
          "Allows admins to add products before entering additional details.",
          "Keeps the form linear to reduce complexity in the early exploration stage.",
        ],
      },
      {
        label: "Version 2",
        image: adminV2,
        notes: [
          "Displays responsible party information in a table format, including email, phone number, and billing details.",
          "Separates registration details from pricing so admins can review both areas more clearly.",
          "Creates a more structured workflow for internal staff managing enrollments.",
        ],
      },
    ],
  },
];

const feedbackRounds = [
  {
    title: "Round 1",
    points: [
      "Users felt unsure where to start when browsing classes, indicating a need for clearer entry points and stronger calls to action on class discovery pages.",
      "Registration forms presented as a single block of fields felt visually overwhelming, highlighting the importance of spacing, grouping, and breaking information into digestible sections.",
    ],
  },
  {
    title: "Round 2",
    points: [
      "After improving hierarchy and spacing, users could scan class listings more quickly and identify relevant programs without confusion.",
      "The revised registration flow felt more manageable, and users reported feeling more confident completing the form without second-guessing required fields.",
    ],
  },
];

const accessibilityItems = [
  {
    number: "1",
    title: "Clear Visual Hierarchy and Readability",
    body: "Text styles, spacing, and layout hierarchy were designed to make content easy to scan and understand for users with varying visual abilities. Headings, labels, and key actions were visually distinct, helping users quickly identify important information when browsing classes or completing registration.",
  },
  {
    number: "2",
    title: "Accessible Form Design",
    body: "Form fields were clearly labeled and grouped logically to support users who rely on screen readers or keyboard navigation. Adequate spacing and consistent input patterns were used to reduce errors and make the registration process easier to complete for all users.",
  },
  {
    number: "3",
    title: "Color Contrast and Interactive Feedback",
    body: "Color choices were made with sufficient contrast to improve legibility and ensure buttons and links were easily distinguishable. Interactive elements such as buttons and progress indicators included clear visual feedback to help users understand system status and next steps.",
  },
];

const nextSteps = [
  {
    number: "1",
    title: "Conduct Post-Launch Usability Testing",
    body: "After the redesigned platform has been live for a period of time, moderated usability testing with parents, adult learners, and internal administrators would help validate design assumptions, uncover new friction points, and inform future iterations based on real behavior rather than prototype feedback.",
  },
  {
    number: "2",
    title: "Redesign Remaining Informational Pages",
    body: "While the redesign focused primarily on core user flows such as class discovery, registration, and admin tools, future work would include updating additional pages. Bringing those pages into the new design system would ensure visual consistency and strengthen the overall brand experience.",
  },
  {
    number: "3",
    title: "Expand Admin Tools and Workflow Automation",
    body: "Future iterations could further streamline internal workflows by introducing bulk student registration, improved filtering of enrollment data, and automated reporting features. Enhancing admin efficiency would reduce manual work and improve operational scalability as program offerings grow.",
  },
];

let hasAnimatedMetrics = false;
const accentPanel = "border-[#dec5f8] bg-[#e5d2fa]";
const accentSoftPanel = "border-[#dec5f8] bg-[#e7d6fb]";
const heroPillClass =
  "rounded-full border border-[#bca8d7] bg-white/95 px-4 py-2 text-sm font-semibold text-[#211f3f] shadow-[0_10px_24px_rgba(90,63,128,0.08)]";

const CHAWProjectPage = ({ onBack }: CHAWProjectPageProps) => {
  const metricSectionRef = useRef<HTMLElement | null>(null);
  const [metricValues, setMetricValues] = useState<number[]>(
    hasAnimatedMetrics ? [7, 2, 2] : [0, 0, 0]
  );

  useEffect(() => {
    if (hasAnimatedMetrics) {
      setMetricValues([7, 2, 2]);
      return;
    }

    const section = metricSectionRef.current;
    if (!section) return;

    let frame = 0;
    const targets = [7, 2, 2];

    const animateMetrics = () => {
      const duration = 2100;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setMetricValues(targets.map((target) => Math.round(target * eased)));

        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          hasAnimatedMetrics = true;
          setMetricValues(targets);
        }
      };

      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedMetrics) return;
        observer.disconnect();
        animateMetrics();
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f2ff] pb-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom)+1rem)] text-[#232328]">
      <OuraRing />
      <ProjectNavigation current="chaw" onHome={onBack} />
      <section className="relative flex min-h-[100svh] overflow-hidden bg-white">
        <img
          src={chawBanner}
          alt="CHAW high-fidelity interface screens"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(255,255,255,0.94)_0%,_rgba(255,255,255,0.78)_30%,_rgba(255,255,255,0.14)_64%,_rgba(255,255,255,0)_100%)]" />

        <div className="relative z-10 flex min-h-[100svh] w-full items-end px-[5vw] pb-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom)+3.5rem)] pt-10 md:pb-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom)+4.5rem)]">
          <div className="w-full">
            <div className="max-w-[34rem]">
              <p className="text-[clamp(1rem,1.45vw,1.25rem)] font-medium text-[#6f6582]">
                UX Case Study
              </p>
              <h1 className="mt-4 text-[clamp(3rem,5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-[#111426]">
                CHAW
              </h1>
              <div className="mt-8 flex max-w-[28rem] flex-wrap gap-3">
                {[
                  "UX Research",
                  "Product Design",
                  "Wireframing",
                  "UI Design",
                  "Prototyping",
                  "Admin Tools",
                ].map((pill) => (
                  <span key={pill} className={heroPillClass}>
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#f7f2ff]">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8 md:pb-20 md:pt-20">
          <div className="grid items-stretch gap-8 xl:grid-cols-[minmax(300px,0.68fr)_minmax(560px,1.32fr)]">
            <div className="rounded-[2rem] border border-[#ebe1fa] bg-white/95 p-8 shadow-[0_28px_80px_rgba(93,63,131,0.08)] md:p-9">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8870b1]">
                Overview
              </div>
              <p className="mt-6 text-[1rem] leading-[1.95] text-[#4f5368]">
                CHAW supports both adult and child enrollment and also includes
                informational pages like a gallery and donation portal. The
                redesign focused on making the experience easier to scan,
                easier to trust, and easier to manage for both external users
                and internal administrators.
              </p>
            </div>

            <div className={`rounded-[2rem] z-10 border p-8 text-[#2b2234] shadow-[0_28px_80px_rgba(93,63,131,0.08)] md:p-9 ${accentPanel}`}>
              <div className="text-sm text-[#5f4a82]">My Role</div>
              <h2 className="mt-5 text-[clamp(2rem,4vw,2.35rem)] font-semibold tracking-[-0.04em]">
                UI/UX Designer
              </h2>
              <ul className="mt-6 space-y-3 text-[0.98rem] leading-7 text-[#4b3f5d]">
                {[
                  "User experience design for external and internal users",
                  "Wireframing and low-fidelity exploration",
                  "High-fidelity UI design and prototyping in Figma",
                  "Designing registration and checkout flows",
                  "Creating admin-facing interfaces for course management",
                  "Ensuring visual consistency and accessibility",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#8d43cd]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <section ref={metricSectionRef} className="mt-30 md:mt-36">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {metricCards.map((metric, index) => (
                <MetricBox
                  key={metric.label}
                  metric={metric}
                  value={index < 3 ? metricValues[index] : undefined}
                />
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 md:pb-24 md:pt-20">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b73b1]">
            Analysis
          </div>
          <h2 className="mt-4 inline-block pb-1 text-[clamp(2.45rem,5.1vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[#232a46] md:whitespace-nowrap">
            What was breaking the experience
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {frictionPoints.map((point) => (
            <div
              key={point.number}
              className={`rounded-[1.95rem] border p-8 shadow-[0_24px_60px_rgba(90,63,128,0.07)] ${accentSoftPanel}`}
            >
              <div className="text-[3.15rem] font-semibold leading-none text-[#8d43cd]">
                {point.number}
              </div>
              <h3 className="mt-5 text-[1.55rem] font-semibold leading-tight text-[#2f2741]">
                {point.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-[#4e4760]">{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 md:pb-24">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b73b1]">
            Research
          </div>
          <h2 className="mt-4 inline-block pb-1 text-[clamp(2.05rem,4.3vw,3.2rem)] font-semibold tracking-[-0.045em] text-[#232a46]">
            Designing for Sarah
          </h2>
        </div>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(420px,1.2fr)_minmax(300px,0.8fr)]">
          <div className="lg:row-span-3 xl:row-span-2">
            <PersonaCard />
          </div>
          <ContentCard
            title="Goals"
            accent
            compact
            body={
              <BulletList
                items={[
                  "Find age-appropriate art and music programs.",
                  "Register children quickly without confusion.",
                  "Feel confident she selected the right program.",
                ]}
              />
            }
          />
          <ContentCard
            title="Frustrations"
            accent
            compact
            body={
              <BulletList
                items={[
                  "Long, cluttered forms.",
                  "Unclear program details.",
                  "Inconsistent navigation and layout.",
                ]}
              />
            }
          />
          <div className="lg:col-start-2 xl:col-span-2">
            <ContentCard
              title="Problem Statement"
              accent
              body="Sarah is a busy parent who needs a clear and efficient way to register her children for creative programs because confusing layouts and outdated form experiences make enrollment feel time-consuming and frustrating."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 md:pb-24">
        <div className="max-w-4xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b73b1]">
            Process
          </div>
          <h2 className="mt-4 inline-block pb-1 text-[clamp(2.05rem,4.3vw,3.2rem)] font-semibold tracking-[-0.045em] text-[#232a46]">
            Wireframing
          </h2>
        </div>

        <div className="mt-10 space-y-14">
          {wireframeGroups.map((group) => (
            <WireframeGroupSection key={group.page} group={group} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 md:pb-24">
        <div className="max-w-4xl">
          <h2 className="inline-block pb-1 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.045em] text-[#121417]">
            What the feedback revealed
          </h2>
          <p className="mt-6 max-w-5xl text-[1rem] leading-8 text-[#576072]">
            Informal usability reviews were conducted using the low-fidelity
            prototype, focusing on layout clarity, form structure, and ease of
            completing key tasks without assistance.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {feedbackRounds.map((round) => (
            <div key={round.title}>
              <h3 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#232a46]">
                {round.title}
              </h3>
              <div className="mt-7 space-y-10">
                {round.points.map((point, index) => (
                  <div key={point} className="flex gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0e2fb] text-xl font-semibold text-[#8d43cd]">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-[1rem] leading-8 text-[#30343a]">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 md:pb-24">
        <div className="max-w-4xl">
          <h2 className="inline-block pb-1 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.045em] text-[#232a46]">
            High-Fidelity Prototype
          </h2>
        </div>

        <div className="mt-10 space-y-12">
          <PrototypeSection
            title="Consumer Registration"
            bullets={[
              "Shows the full guest registration process for enrolling a child.",
              "Add class or program to cart.",
              "Enter student and parent information.",
              "Complete demographic questions.",
              "Review cart and pricing.",
              "Submit payment and confirm enrollment.",
            ]}
            preview={
              <PrototypeGif
                src={consumerPrototypeGif}
                alt="Consumer registration high-fidelity prototype walkthrough"
              />
            }
          />
          <PrototypeSection
            title="Admin Registration"
            bullets={[
              "Shows full admin workflow for registering a student.",
              "Assign responsible party for payment.",
              "Add classes and programs to account.",
              "Apply discounts and review pricing.",
              "Confirm registration and finalize enrollment.",
              "Designed to support efficient internal workflows.",
            ]}
            preview={
              <PrototypeGif
                src={adminPrototypeGif}
                alt="Admin registration high-fidelity prototype walkthrough"
              />
            }
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 md:pb-24">
        <div className="max-w-4xl">
          <h2 className="inline-block pb-1 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.045em] text-[#121417]">
            Designing for everyone
          </h2>
        </div>

        <div className={`mt-8 rounded-[2.1rem] border px-6 py-8 shadow-[0_24px_60px_rgba(90,63,128,0.07)] md:px-8 md:py-10 ${accentSoftPanel}`}>
          <div className="grid gap-8 md:grid-cols-3 md:gap-0">
            {accessibilityItems.map((item, index) => (
              <div
                key={item.number}
                className={[
                  "md:px-6",
                  index > 0 ? "md:border-l md:border-[#67568c]/45" : "",
                ].join(" ")}
              >
                <div className="text-[3.1rem] font-semibold leading-none text-[#8d43cd]">
                  {item.number}
                </div>
                <h3 className="mt-6 text-[1.55rem] font-semibold leading-tight text-[#303554]">
                  {item.title}
                </h3>
                <p className="mt-6 text-[1rem] leading-8 text-[#51556c]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 md:pb-24">
        <div>
          <h2 className="inline-block pb-1 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.045em] text-[#121417]">
            Takeaways
          </h2>
          <div className="mt-10">
            <div className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#121417]">
              Impact
            </div>
            <p className="mt-5 text-[1.15rem] leading-9 text-[#1f2124]">
              The redesign was projected to meaningfully reduce friction across
              all key user flows.
            </p>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <ImpactStat
              value="~25%"
              body="Reduction in perceived form complexity through simplified layouts and grouped fields."
            />
            <ImpactStat
              value="~20%"
              body="Improvement in program scannability with structured class cards and clear hierarchy."
            />
          </div>

          <div className="mt-12">
            <div className="text-[1.75rem] font-semibold tracking-[-0.03em] text-[#121417]">
              What I Learned
            </div>
            <p className="mt-5 text-[1.05rem] leading-9 text-[#3f4554]">
              Through this project, I learned the importance of designing for
              multiple user groups within a single system, balancing the needs
              of external users registering for programs and internal staff
              managing enrollment.
            </p>
            <p className="mt-7 text-[1.05rem] leading-9 text-[#3f4554]">
              I gained valuable experience translating complex, plugin-driven
              layouts into streamlined and user-friendly interfaces. Iterating
              from paper sketches to high-fidelity designs reinforced how early
              exploration and thoughtful hierarchy can significantly improve
              usability and overall user confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-28">
        <div className="max-w-4xl">
          <h2 className="inline-block pb-1 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.045em] text-[#121417]">
            What Comes Next
          </h2>
        </div>

        <div className="mt-10 space-y-11">
          {nextSteps.map((step) => (
            <div
              key={step.number}
              className="grid gap-5 md:grid-cols-[48px_minmax(0,1fr)] md:gap-8"
            >
              <div className="text-[3rem] font-semibold leading-none text-[#8d43cd]">
                {step.number}
              </div>
              <div>
                <h3 className="text-[1.65rem] font-semibold tracking-[-0.03em] text-[#303554]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-8 text-[#4d5264]">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const MetricBox = ({
  metric,
  value,
}: {
  metric: MetricCard;
  value?: number;
}) => {
  const Icon = metric.icon;
  const displayValue =
    metric.staticValue ?? `${value ?? metric.value ?? 0}${metric.suffix ?? ""}`;

  return (
    <div className="flex min-h-36 flex-col items-center justify-center rounded-[1.8rem] px-6 py-7 text-center">
      <div className="flex items-center justify-center gap-4">
        <Icon size={24} className="text-[#8b73b1]" />
        <div className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.05em] text-[#1e233a]">
          {displayValue}
        </div>
      </div>
      <div className="mt-4 text-[1rem] leading-snug text-[#6a6f86]">
        {metric.label}
      </div>
    </div>
  );
};

const ContentCard = ({
  title,
  body,
  accent = false,
  compact = false,
}: {
  title: string;
  body: ReactNode;
  accent?: boolean;
  compact?: boolean;
}) => (
  <div
    className={[
      "rounded-[1.95rem] border p-8 shadow-[0_24px_60px_rgba(90,63,128,0.07)]",
      accent ? accentSoftPanel : "border-[#ebe1fa] bg-white",
      compact ? "h-full self-start py-7" : "",
    ].join(" ")}
  >
    <h3 className="text-[1.7rem] font-semibold tracking-[-0.035em] text-[#232a46]">
      {title}
    </h3>
    <div className="mt-5 text-[1rem] leading-8 text-[#54596c]">{body}</div>
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="space-y-4 text-[1rem] leading-8 text-[#4b3f5d]">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span className="mt-[0.85rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#8d43cd]" />
        <span className="min-w-0 lg:whitespace-nowrap">{item}</span>
      </li>
    ))}
  </ul>
);

const PersonaCard = () => (
  <div className={`h-full overflow-hidden rounded-[2rem] border shadow-[0_24px_60px_rgba(90,63,128,0.07)] ${accentPanel}`}>
    <div className="bg-[#e5d2fa] p-7">
      <img
        src={SarahPersonaImage}
        alt="Sarah L. persona portrait"
        className="mx-auto h-36 w-[78%] rounded-[1.6rem] border-[3px] border-white/70 object-cover object-[50%_28%] shadow-[0_20px_35px_rgba(90,63,128,0.14)]"
      />
      <div className="mx-auto mt-4 mb-[-1rem] inline-flex w-full items-center justify-center rounded-full bg-[#8f53c4] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_14px_25px_rgba(100,57,146,0.22)]">
        Marketing Coordinator
      </div>
    </div>

    <div className="px-7 py-7 text-[#3c3350]">
      <h3 className="mt-[-1rem] text-[2rem] font-semibold tracking-[-0.04em]">Sarah L.</h3>
      <div className="mt-4 space-y-2 text-[1rem] leading-7">
        <MetaLine icon={CircleGauge} label="40 years" />
        <MetaLine icon={MapPin} label="Washington, DC" />
        <MetaLine icon={Users} label="Community events and local arts" />
      </div>
    </div>
  </div>
);

const MetaLine = ({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) => (
  <div className="flex items-start gap-3">
    <Icon size={17} className="mt-1 text-[#8b73b1]" />
    <span>{label}</span>
  </div>
);

const WireframeGroupSection = ({ group }: { group: WireframeGroup }) => (
  <div>
    <h3 className="text-center text-[1.75rem] font-semibold tracking-[-0.035em] text-[#232a46]">
      {group.page}
    </h3>
    <div className="mt-8 grid gap-8 xl:grid-cols-2">
      {group.versions.map((version) => (
        <div key={version.label}>
          <div className="text-sm font-semibold text-[#232a46]">{version.label}</div>
          <div className="mt-3 rounded-[1.9rem] border border-[#e6def4] bg-white p-5 shadow-[0_20px_55px_rgba(90,63,128,0.05)]">
            <div className="flex items-center justify-center rounded-[1.3rem] bg-[#fffdfa] px-4 py-5">
              <img
                src={version.image}
                alt={`${group.page} ${version.label}`}
                className="h-auto w-full max-w-[340px] object-contain"
              />
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#565b6d]">
              {version.notes.map((note) => (
                <li key={note} className="flex gap-3">
                  <span className="mt-[0.72rem] h-1.5 w-1.5 rounded-full bg-[#8b73b1]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PrototypeSection = ({
  title,
  bullets,
  preview,
}: {
  title: string;
  bullets: string[];
  preview: ReactNode;
}) => (
  <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start xl:grid-cols-[380px_minmax(0,1fr)]">
    <div>
      <h3 className="text-[1.8rem] font-semibold tracking-[-0.035em] text-[#303554]">
        {title}
      </h3>
      <ul className="mt-5 list-disc space-y-3 pl-6 text-[1rem] leading-8 text-[#42495b] marker:text-[#8b73b1]">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
    {preview}
  </div>
);

const PrototypeGif = ({ src, alt }: { src: string; alt: string }) => (
  <figure className="overflow-hidden rounded-[2rem] border border-[#e6def4] bg-white p-4 shadow-[0_24px_60px_rgba(90,63,128,0.06)]">
    <img
      src={src}
      alt={alt}
      className="h-auto w-full rounded-[1.35rem] object-contain"
    />
  </figure>
);

const ImpactStat = ({ value, body }: { value: string; body: string }) => (
  <div>
    <div className="text-[clamp(3rem,6vw,4.6rem)] font-semibold leading-none tracking-[-0.06em] text-[#8d43cd]">
      {value}
    </div>
    <p className="mt-3 max-w-md text-[1.05rem] leading-9 text-[#30343a]">{body}</p>
  </div>
);

export default CHAWProjectPage;
