import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Banknote,
  TrendingUp,
  ShieldCheck,
  Receipt,
  Zap,
  Clock,
  Wallet,
  Wifi,
  Phone,
  Mail,
  Quote,
  Menu,
  X,
  Check,
  Sun,
  Moon,
  MapPin,
  Sparkles,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Star,
  Building2,
  Headphones,
  CircleDollarSign,
} from "lucide-react";
import atmHero from "@/assets/atm-hero.png";
import terminalImg from "@/assets/terminal.png";
import urbtechLogo from "@/assets/urbtech-logo.png";
import urbtechLogoWhite from "@/assets/urbtech-logo-white.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "terminals", label: "Terminals" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("urbtech-theme")) as
      | "dark"
      | "light"
      | null;
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    localStorage.setItem("urbtech-theme", theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

function ThemeToggle({ theme, toggle }: { theme: "dark" | "light"; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-9 w-16 items-center rounded-full border border-hairline bg-surface-2 transition-colors hover:border-primary/50"
    >
      <span
        className={`absolute top-1 left-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 ${
          theme === "light" ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
    </button>
  );
}

function useScrollSpy() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const ids = ["hero", ...NAV.map((n) => n.id)];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Logo() {
  return (
    <a href="#hero" className="inline-flex items-center" aria-label="URBTECH home">
      <img
        src={urbtechLogoWhite}
        alt="URBTECH"
        className="h-9 w-auto md:h-10 object-contain block [.light_&]:hidden"
      />
      <img
        src={urbtechLogo}
        alt="URBTECH"
        className="h-9 w-auto md:h-10 object-contain hidden [.light_&]:block"
      />
    </a>
  );
}

function Navbar() {
  const active = useScrollSpy();
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-hairline">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`relative font-cond text-sm uppercase tracking-[0.18em] transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:bg-primary after:transition-all ${
                  active === n.id ? "text-primary" : "text-foreground/70 hover:text-foreground"
                } ${active === n.id ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle theme={theme} toggle={toggle} />
          <a
            href="#contact"
            className="shine inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-cond text-sm uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
          >
            Get Free ATM <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle theme={theme} toggle={toggle} />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="p-2 text-foreground"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="lg:hidden border-t border-hairline px-6 py-6 bg-background/95">
          <ul className="flex flex-col gap-4">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="font-cond text-base uppercase tracking-widest text-foreground/80"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-cond text-sm uppercase tracking-widest text-primary-foreground"
              >
                Get Free ATM
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <span className="h-px w-10 bg-primary" />
      <span className="font-cond text-xs uppercase tracking-[0.32em] text-primary">
        {children}
      </span>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass glass-hover rounded-xl p-5 text-left">
      <div className="font-display text-3xl md:text-4xl text-foreground">{value}</div>
      <div className="mt-1 font-cond text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[700px] w-[1100px] red-glow pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div>
            <div className="reveal">
              <SectionLabel>Free ATM • Trusted Since 2018</SectionLabel>
            </div>
            <h1 className="reveal font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-wide">
              URB<span className="text-primary">TECH</span>
            </h1>
            <div className="reveal mt-4 flex items-center gap-4">
              <span className="h-[3px] w-16 bg-primary" />
              <span className="font-cond text-lg md:text-2xl uppercase tracking-wider text-foreground/90">
                Free ATM Placements & Cashless Terminals
              </span>
            </div>
            <p className="reveal mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              We install, manage, and maintain ATMs at your business — entirely free.
              You earn per transaction. No equipment cost. No hassle.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-cond text-sm uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
              >
                Get Your Free ATM <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 font-cond text-sm uppercase tracking-widest text-foreground/90 hover:border-primary hover:text-primary transition-colors"
              >
                Learn More
              </a>
            </div>
            <div className="reveal mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat value="$0" label="Free Equipment" />
              <Stat value="20%" label="Sales Increase" />
              <Stat value="$0" label="Cost To You" />
              <Stat value="2018" label="Established" />
            </div>
          </div>
          <div className="relative reveal hidden lg:block">
            <div className="absolute inset-0 red-glow blur-2xl" />
            <img
              src={atmHero}
              alt="URBTECH ATM machine"
              width={1024}
              height={1280}
              className="relative w-full max-w-md mx-auto drop-shadow-[0_30px_60px_rgba(224,26,43,0.25)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 bg-surface overflow-hidden">
      {/* Decorative blueprint marks */}
      <div className="absolute inset-0 grid-bg opacity-[0.25] pointer-events-none" />
      <div className="absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Top eyebrow row */}
        <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight">
              Cash solutions,
              <br />
              <span className="text-gradient">engineered end&#8209;to&#8209;end.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-muted-foreground leading-relaxed md:text-right">
            We install, stock, monitor and service every ATM in our network — so your
            location earns passive income without lifting a finger.
          </p>
        </div>

        {/* Asymmetric content grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Big visual card */}
          <div className="reveal lg:col-span-7 relative">
            <div className="absolute -inset-6 red-glow blur-3xl opacity-60 pointer-events-none" />
            <div className="glass relative rounded-3xl p-8 md:p-12 h-full overflow-hidden">
              {/* Corner marks */}
              <span className="absolute top-4 left-4 h-3 w-3 border-l border-t border-primary" />
              <span className="absolute top-4 right-4 h-3 w-3 border-r border-t border-primary" />
              <span className="absolute bottom-4 left-4 h-3 w-3 border-l border-b border-primary" />
              <span className="absolute bottom-4 right-4 h-3 w-3 border-r border-b border-primary" />

              <div className="grid grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    Live network
                  </div>
                  <div>
                    <div className="font-display text-6xl md:text-7xl text-primary leading-none">
                      24/7
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Monitoring, cash loading & compliance handled by our team.
                    </div>
                  </div>
                  <div className="h-px bg-hairline border-hairline border-t" />
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="font-cond text-xs uppercase tracking-[0.28em] text-foreground/70">
                      Zero-cost installation
                    </span>
                  </div>
                </div>
                <div className="relative animate-float">
                  <div className="absolute inset-0 rounded-full bg-primary/15 blur-2xl" />
                  <img
                    src={atmHero}
                    alt="URBTECH ATM"
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="relative w-full max-w-[260px] mx-auto drop-shadow-[0_30px_50px_rgba(224,26,43,0.35)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right column: stat tiles */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-6">
            {ABOUT_TILES.map((t) => (
              <div
                key={t.title}
                className="reveal glass glass-hover rounded-2xl p-6 flex flex-col justify-between min-h-[180px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <t.icon className="h-5 w-5" />
                  </div>
                  <span className="font-cond text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                    {t.tag}
                  </span>
                </div>
                <div className="mt-6">
                  <div className="font-display text-3xl md:text-4xl text-foreground leading-none">
                    {t.stat}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground leading-snug">
                    {t.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ABOUT_TILES = [
  { icon: Building2, tag: "Reach", stat: "Nationwide", title: "Coverage across every major U.S. metro." },
  { icon: CircleDollarSign, tag: "Earn", stat: "Passive", title: "Monthly revenue share on every transaction." },
  { icon: ShieldCheck, tag: "Secure", stat: "Insured", title: "Every machine fully covered — risk on us." },
  { icon: Headphones, tag: "Support", stat: "24/7", title: "Live technicians and remote diagnostics." },
];

const SERVICES = [
  {
    icon: Banknote,
    title: "Free ATM Placements",
    desc: "Available nationwide at no cost. Local technicians install and service every machine, with full coverage in your area.",
  },
  {
    icon: TrendingUp,
    title: "Increased Sales",
    desc: "ATMs drive sales up to 20%. At 200 transactions a month, that's an extra $800 in revenue you weren't capturing before.",
  },
  {
    icon: Receipt,
    title: "Lower Fees",
    desc: "Cash transactions eliminate card processing fees and chargebacks. Keep more of every dollar your customers spend.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance Included",
    desc: "Every machine is fully insured, dramatically reducing your business liability. We carry the risk so you don't have to.",
  },
];

function Services() {
  return (
    <section id="services" className="relative py-28 bg-surface-2">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal max-w-2xl">
          <SectionLabel>Why Choose Us</SectionLabel>
          <h2 className="font-display text-5xl md:text-6xl leading-tight">
            Full-Service ATM
            <br />
            <span className="text-primary">Placement</span>
          </h2>
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="reveal glass glass-hover rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-2xl tracking-wide text-primary mb-2">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TERMINAL_FEATURES = [
  { icon: Zap, title: "Easy To Use", desc: "Plug and process setup. Funds clear in your account within 48 hours — no learning curve, no delays." },
  { icon: Clock, title: "Save Time, Less Hassle", desc: "Fully paperless. Runs on existing ATM networks so there's no new infrastructure to manage." },
  { icon: Wallet, title: "Flexible Transactions", desc: "Process up to $500 per transaction in $5, $10, or $20 increments to fit any sale." },
  { icon: Wifi, title: "Wireless Options", desc: "Wireless delivery terminals available with month-to-month contracts. No long-term lock-in." },
];

function Terminals() {
  return (
    <section id="terminals" className="relative py-28 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16">
          <div>
            <div className="reveal">
              <SectionLabel>Payment Terminals</SectionLabel>
              <h2 className="font-display text-5xl md:text-6xl leading-tight">
                Accept Bankcards
                <br />
                <span className="text-primary">At No Cost</span>
              </h2>
            </div>
            <ol className="mt-12 space-y-5">
              {TERMINAL_FEATURES.map((f, i) => (
                <li key={f.title} className="reveal glass glass-hover rounded-xl p-6 flex gap-5">
                  <div className="font-display text-3xl text-primary w-10 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <f.icon className="h-5 w-5 text-primary" />
                      <h3 className="font-cond text-lg uppercase tracking-widest text-foreground">
                        {f.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="reveal">
            <div className="glass rounded-3xl p-8 sticky top-28 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 h-72 w-72 red-glow blur-2xl" />
              <div className="relative">
                <span className="inline-block font-cond text-xs uppercase tracking-[0.3em] bg-primary text-primary-foreground px-3 py-1.5 rounded-full">
                  Free Equipment
                </span>
                <h3 className="mt-6 font-display text-4xl leading-tight">
                  URBTECH<br />Cashless<br />
                  <span className="text-primary">Terminal</span>
                </h3>
                <img
                  src={terminalImg}
                  alt="URBTECH cashless terminal"
                  width={800}
                  height={1024}
                  loading="lazy"
                  className="my-8 mx-auto w-56"
                />
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Wireless & countertop options",
                    "Up to $500 per transaction",
                    "Funds clear within 48 hours",
                    "Month-to-month — no contracts",
                  ].map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-cond text-sm uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  Request Terminal <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HIGHLIGHTS = [
  { title: "Free Installation", desc: "Equipment, setup, and labor at zero cost." },
  { title: "Passive Income", desc: "Earn per transaction with zero effort." },
  { title: "Nationwide Coverage", desc: "Local technicians wherever you are." },
  { title: "Trusted Since 2018", desc: "Years of experience and partnerships." },
];

function AboutUs() {
  return (
    <section className="relative py-28 bg-surface-2">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <SectionLabel>About Us</SectionLabel>
            <h2 className="font-display text-5xl md:text-6xl leading-tight">
              Built On <span className="text-primary">Partnership</span>
            </h2>
            <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <p>
                URBTECH was founded in 2018 with a single goal: make it effortless for
                businesses to add cash access and cashless payments without taking on
                cost or complexity. We've placed machines in convenience stores, bars,
                salons, gas stations, restaurants, and more across the country.
              </p>
              <p>
                We treat every placement as a long-term partnership. Our techs are
                local, our team is responsive, and our model is transparent — you earn
                a share of every transaction, forever.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="reveal glass glass-hover rounded-2xl p-6">
                <h3 className="font-display text-2xl tracking-wide text-primary">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    name: "Archie Gomez",
    quote:
      "URBTECH put an ATM in our shop with zero hassle. The extra foot traffic alone has been worth it, and the monthly checks are a bonus.",
  },
  {
    name: "Bhaumik Rao",
    quote:
      "We've worked with other ATM companies before and the difference is night and day. Service is fast, the team is responsive, and the equipment is rock solid.",
  },
  {
    name: "Andy Sterling",
    quote:
      "Adding the cashless terminal was the best decision we made this year. Setup was painless and our customers love the flexibility.",
  },
  {
    name: "Gumed Torres",
    quote:
      "From day one URBTECH felt like a true partner. They handle everything — we just collect our share and watch sales climb.",
  },
];

function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 6000);
    return () => clearInterval(id);
  }, [total]);
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  return (
    <section id="testimonials" className="relative py-28 bg-surface">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="reveal text-center">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-display text-5xl md:text-6xl leading-tight">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
        </div>

        <div className="reveal relative mt-16">
          <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 h-16 w-16 text-primary/15" />
          <div className="relative overflow-hidden rounded-3xl glass px-6 py-14 md:px-16 md:py-20">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="w-full shrink-0 px-2 md:px-8 text-center">
                  <p className="font-display text-2xl md:text-4xl leading-snug tracking-wide text-foreground/95">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-10 flex flex-col items-center gap-3">
                    <span className="h-px w-10 bg-primary" />
                    <div className="font-cond text-sm uppercase tracking-[0.32em] text-primary">
                      {t.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-foreground/80 hover:text-primary hover:border-primary transition-all hover:-translate-x-0.5"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-primary" : "w-2 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-foreground/80 hover:text-primary hover:border-primary transition-all hover:translate-x-0.5"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="contact" className="relative py-28 bg-surface-2 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] red-glow pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="reveal">
            <SectionLabel>Get In Touch</SectionLabel>
            <h2 className="font-display text-5xl md:text-6xl leading-tight">
              Ready To Get Your
              <br />
              <span className="text-primary">Free ATM?</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
              Reach out and we'll evaluate your location, walk you through the process,
              and get a machine on its way.
            </p>
            <div className="mt-10 space-y-4">
              {[
                { icon: Phone, label: "Call Us", value: "(405) 210-6451" },
                { icon: Mail, label: "Email", value: "urbtechsolutions@outlook.com" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="glass glass-hover rounded-xl p-5 flex items-center gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-cond text-xs uppercase tracking-widest text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="font-medium text-foreground">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form
            className="reveal glass rounded-3xl p-8 md:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="space-y-5">
              {[
                { name: "name", label: "Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "business", label: "Business Name", type: "text" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="font-cond text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                    {f.label}
                  </label>
                  <input
                    required
                    type={f.type}
                    name={f.name}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="font-cond text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  name="message"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-cond text-sm uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {submitted ? "Message Sent" : "Submit Request"}
                {!submitted && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

const MARQUEE = [
  "Free Installation",
  "Zero Cost",
  "Earn Per Transaction",
  "Nationwide Coverage",
  "Trusted Since 2018",
  "24/7 Monitoring",
  "Local Technicians",
  "Cashless Terminals",
];

function Marquee() {
  return (
    <div className="relative border-y border-hairline bg-background overflow-hidden py-6">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {[...MARQUEE, ...MARQUEE].map((m, i) => (
          <div key={i} className="flex items-center gap-12">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-display text-2xl tracking-wider text-foreground/80">{m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative bg-background border-t border-hairline overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[800px] red-glow pointer-events-none opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm text-muted-foreground leading-relaxed">
              Free ATM placements & cashless payment terminals for ambitious businesses.
              Trusted by partners nationwide since 2018.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-foreground/70 hover:text-primary hover:border-primary hover:-translate-y-0.5 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-cond text-xs uppercase tracking-[0.3em] text-primary mb-5">
              Explore
            </div>
            <ul className="space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-cond text-xs uppercase tracking-[0.3em] text-primary mb-5">
              Services
            </div>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>Free ATM Placement</li>
              <li>Cashless Terminals</li>
              <li>24/7 Monitoring</li>
              <li>Cash Loading</li>
              <li>Compliance & Insurance</li>
            </ul>
          </div>

          <div>
            <div className="font-cond text-xs uppercase tracking-[0.3em] text-primary mb-5">
              Get In Touch
            </div>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-foreground/80">
                <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                (405) 210-6451
              </li>
              <li className="flex items-start gap-3 text-foreground/80">
                <Mail className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                urbtechsolutions@outlook.com
              </li>
              <li className="flex items-start gap-3 text-foreground/80">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                Nationwide service across the US
              </li>
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-cond text-xs uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105"
            >
              Request Callback <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-hairline flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground font-cond uppercase tracking-widest text-xs">
            © {new Date().getFullYear()} URBTECH. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Terminals />
        <AboutUs />
        <Testimonials />
        <Marquee />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}