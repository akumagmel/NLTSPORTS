import React, { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  Clock,
  DollarSign,
  Globe2,
  Lock,
  Shield,
  Star,
  Car,
  CalendarDays,
  UserPlus,
  FileText,
  LogIn,
  MapPin,
  Zap,
} from "lucide-react";

/**
 * Persisted countdown helper.
 * Creates (or reuses) a stable target timestamp in localStorage so refreshes do not reset the timer.
 *
 * If you want a NEW window, bump the storageKey version (e.g. "nlt_onboarding_target_v2").
 */
function useCountdownPersisted(hours = 48, storageKey = "nlt_onboarding_target_v1") {
  const target = useMemo(() => {
    if (typeof window === "undefined") return Date.now() + hours * 3600 * 1000;

    const existing = window.localStorage.getItem(storageKey);
    const existingNum = existing ? Number(existing) : NaN;

    // If we have a valid future timestamp, use it
    if (Number.isFinite(existingNum) && existingNum > Date.now()) return existingNum;

    // Otherwise, create a new target and persist it
    const next = Date.now() + hours * 3600 * 1000;
    window.localStorage.setItem(storageKey, String(next));
    return next;
  }, [hours, storageKey]);

  const [remaining, setRemaining] = useState(() => Math.max(0, target - Date.now()));

  useEffect(() => {
    const id = window.setInterval(() => {
      setRemaining(Math.max(0, target - Date.now()));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const total = Math.floor(remaining / 1000); // seconds
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = Math.floor(total % 60);

  return { d, h, m, s };
}

// --- Badge ---
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
    {children}
  </span>
);

// --- Pill Button (renders <a> when href exists, otherwise <button>) ---
function Btn({
  children,
  href,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-white shadow transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-black/20";

  if (href) {
    return (
      <a href={href} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>} className={base}>
        {children} <ChevronRight size={18} />
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} className={base}>
      {children} <ChevronRight size={18} />
    </button>
  );
}

// --- Card ---
const CardBox = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur ${className}`}>{children}</div>
);

// --- Progress Dots ---
const Dot = ({ active }: { active?: boolean }) => (
  <span className={`h-2 w-2 rounded-full ${active ? "bg-black" : "bg-neutral-300"}`} />
);

// --- Demo Data ---
const demoVehicles = [
  { id: "VIN-001", title: "2022 Tesla Model 3", location: "Miami, FL", status: "Available", days: 226, est: 1480 },
  { id: "VIN-002", title: "2019 Toyota Camry", location: "Tampa, FL", status: "Booked", days: 204, est: 980 },
  { id: "VIN-003", title: "2021 BMW X5", location: "Orlando, FL", status: "Maintenance", days: 212, est: 1320 },
];

function Landing({ onStart }: { onStart?: () => void }) {
  // 30 days = 720 hours
  const { d, h, m, s } = useCountdownPersisted(24 * 30, "nlt_onboarding_target_v1");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-neutral-50 to-white text-neutral-900">
      {/* Top bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-black font-bold text-white">N</div>
          <span className="text-lg font-semibold">NLT SPORTS DRIVE</span>
        </div>

        <div className="flex items-center gap-3">
          <a className="text-sm hover:underline" href="#deals">
            Good Deals
          </a>
          <a className="text-sm hover:underline" href="#how">
            How it works
          </a>
          <a className="text-sm hover:underline" href="#faq">
            FAQ
          </a>

          <Btn
            href="#start"
            onClick={(e) => {
              e.preventDefault();
              onStart?.();
            }}
          >
            Start Consigning
          </Btn>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 pb-10 pt-8 md:grid-cols-2">
        <div>
          <Badge>
            <Zap size={14} /> New: Nationwide Remote Consignment
          </Badge>

          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Turn your idle car into{" "}
            <span className="underline decoration-amber-400 decoration-4 underline-offset-4">monthly income</span> — from
            anywhere.
          </h1>

          <p className="mt-4 text-neutral-700">
            List your car with NLT SPORTS DRIVE. We handle <b>Florida registration (PM decal)</b>,{" "}
            <b>commercial insurance</b>, tolls & citations — you keep possession and coordinate local handoffs. 1-year
            term, 265+ active days.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Btn
              onClick={(e) => {
                e.preventDefault();
                onStart?.();
              }}
            >
              Start in 5 minutes
            </Btn>
            <span className="text-sm text-neutral-600">No owner liability • Keep your title • Direct deposits</span>
          </div>

          {/* Countdown / FOMO */}
          <CardBox className="mt-6">
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} />
              <span className="font-medium">Founder’s 30-day onboarding window ends in</span>
              <div className="ml-auto flex items-center gap-2 font-mono">
                <span>{String(d).padStart(2, "0")}d</span>
                <span>{String(h).padStart(2, "0")}h</span>
                <span>{String(m).padStart(2, "0")}m</span>
                <span>{String(s).padStart(2, "0")}s</span>
              </div>
            </div>
          </CardBox>

          {/* Trust bar */}
          <div className="mt-4 flex items-center gap-4 text-sm text-neutral-600">
            <span className="inline-flex items-center gap-2">
              <Shield size={16} /> Bonded commercial policy
            </span>
            <span className="inline-flex items-center gap-2">
              <Lock size={16} /> DocuSign onboarding
            </span>
            <span className="inline-flex items-center gap-2">
              <Globe2 size={16} /> Nationwide
            </span>
          </div>
        </div>

        {/* Hero Card */}
        <CardBox className="md:mx-6">
          <div className="flex items-center gap-3">
            <Car />
            <h3 className="text-lg font-semibold">Owner Snapshot</h3>
          </div>

          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5" size={16} /> Keep your car. We send FL tag + PM decal.
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5" size={16} /> We cover insurance, tolls, red-light cams.
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5" size={16} /> You coordinate pickup/dropoff locally.
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5" size={16} /> 265+ listing days / 12-month renewable term.
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5" size={16} /> Transparent split & dashboards for payouts.
            </li>
          </ul>

          <div className="mt-4">
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-xl bg-neutral-50 p-3">
                <div className="text-lg font-bold">72h</div>
                <div>to first listing</div>
              </div>
              <div className="rounded-xl bg-neutral-50 p-3">
                <div className="text-lg font-bold">$0</div>
                <div>owner liability</div>
              </div>
              <div className="rounded-xl bg-neutral-50 p-3">
                <div className="text-lg font-bold">265+</div>
                <div>active days</div>
              </div>
            </div>
          </div>
        </CardBox>
      </section>

      {/* Good Deals */}
      <section id="deals" className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold">Good Deals • Ready & Inspected</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Curated vehicles available for purchase — fully inspected and rental-ready.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <CardBox>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">2019 Toyota Camry SE</div>
                <div className="text-sm text-neutral-600">Atlanta, GA</div>
              </div>
              <Badge>Ready</Badge>
            </div>
            <p className="mt-3 text-sm text-neutral-700">Inspection complete • Est. $950/mo • 265+ days target</p>
            <div className="mt-3">
              <Btn href="#contact">Request Details</Btn>
            </div>
          </CardBox>

          <CardBox>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">2021 Tesla Model 3 SR+</div>
                <div className="text-sm text-neutral-600">Miami, FL</div>
              </div>
              <Badge>Inspected</Badge>
            </div>
            <p className="mt-3 text-sm text-neutral-700">Fleet-ready • Est. $1,480/mo • Clean CarFax</p>
            <div className="mt-3">
              <Btn href="#contact">Request Details</Btn>
            </div>
          </CardBox>

          <CardBox>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">2020 Honda Civic EX</div>
                <div className="text-sm text-neutral-600">Dallas, TX</div>
              </div>
              <Badge>Ready</Badge>
            </div>
            <p className="mt-3 text-sm text-neutral-700">Inspection complete • Est. $880/mo • Low miles</p>
            <div className="mt-3">
              <Btn href="#contact">Request Details</Btn>
            </div>
          </CardBox>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold">How it works</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <CardBox>
            <UserPlus className="mb-2" /> <b>Apply</b>
            <p className="mt-2 text-sm text-neutral-700">Submit VIN, photos, and agree to 265+ active days.</p>
          </CardBox>

          <CardBox>
            <FileText className="mb-2" /> <b>e-Sign</b>
            <p className="mt-2 text-sm text-neutral-700">DocuSign: Consignment + DMV POA. We activate insurance.</p>
          </CardBox>

          <CardBox>
            <MapPin className="mb-2" /> <b>Tag & Go</b>
            <p className="mt-2 text-sm text-neutral-700">We ship your Florida plate + PM decal. You keep the car.</p>
          </CardBox>

          <CardBox>
            <DollarSign className="mb-2" /> <b>Get Paid</b>
            <p className="mt-2 text-sm text-neutral-700">Coordinate local handoffs. We handle payouts & reporting.</p>
          </CardBox>
        </div>
      </section>

      {/* Social Proof / Reviews */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <CardBox>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-neutral-700">
              “Hands-off income. NLT handled tags, insurance, and renters. I never visited a DMV.” — <b>M. Rivera, FL</b>
            </p>
          </div>
        </CardBox>
      </section>

      {/* Pricing / CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid gap-6 md:grid-cols-3">
          <CardBox>
            <h3 className="text-lg font-semibold">Starter</h3>
            <p className="mt-1 text-sm text-neutral-600">1–2 vehicles • Standard support</p>
            <div className="my-4 text-3xl font-bold">70/30</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check size={16} /> FL registration & PM decal
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Commercial insurance
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Owner keeps possession
              </li>
            </ul>
            <div className="mt-4">
              <Btn
                onClick={(e) => {
                  e.preventDefault();
                  onStart?.();
                }}
              >
                Apply Now
              </Btn>
            </div>
          </CardBox>

          <CardBox>
            <h3 className="text-lg font-semibold">Pro</h3>
            <p className="mt-1 text-sm text-neutral-600">3–6 vehicles • Priority support</p>
            <div className="my-4 text-3xl font-bold">75/25</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check size={16} /> Priority payouts
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Dedicated coordinator
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Damage waiver options
              </li>
            </ul>
            <div className="mt-4">
              <Btn
                onClick={(e) => {
                  e.preventDefault();
                  onStart?.();
                }}
              >
                Scale with Us
              </Btn>
            </div>
          </CardBox>

          <CardBox>
            <h3 className="text-lg font-semibold">Elite</h3>
            <p className="mt-1 text-sm text-neutral-600">7+ vehicles • White-glove</p>
            <div className="my-4 text-3xl font-bold">80/20</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Check size={16} /> Concierge logistics
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Enhanced protections
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} /> Quarterly strategy call
              </li>
            </ul>
            <div className="mt-4">
              <Btn
                onClick={(e) => {
                  e.preventDefault();
                  onStart?.();
                }}
              >
                Join Elite
              </Btn>
            </div>
          </CardBox>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-2xl font-bold">FAQ</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <CardBox>
            <b>Do I keep my car?</b>
            <p className="text-sm text-neutral-700">
              Yes. You keep possession and coordinate local handoffs. We manage registration, insurance, tolls, and
              payouts.
            </p>
          </CardBox>

          <CardBox>
            <b>Which states?</b>
            <p className="text-sm text-neutral-700">
              Nationwide onboarding with Florida as registration nexus. You’ll receive a Florida tag + PM decal.
            </p>
          </CardBox>

          <CardBox>
            <b>Minimum commitment?</b>
            <p className="text-sm text-neutral-700">12-month term, at least 265 active listing days per year.</p>
          </CardBox>

          <CardBox>
            <b>Insurance & tickets?</b>
            <p className="text-sm text-neutral-700">
              Covered under our commercial policy. Tolls and camera citations route to us, not the owner.
            </p>
          </CardBox>

          <CardBox>
            <b>How fast can I go live?</b>
            <p className="text-sm text-neutral-700">
              Usually within 7–10 business days after you complete onboarding and submit required photos + info.
            </p>
          </CardBox>
        </div>
      </section>
    </div>
  );
}

function OwnerDashboard() {
  const [tab, setTab] = useState<"fleet" | "calendar" | "payouts" | "docs">("fleet");

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-black font-bold text-white">N</div>
            <h1 className="text-xl font-semibold">Owner Portal</h1>
          </div>
          <button className="rounded-full border bg-white px-4 py-2 text-sm" type="button">
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex items-center gap-2">
          {(["fleet", "calendar", "payouts", "docs"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`rounded-full px-4 py-2 text-sm ${
                tab === k ? "bg-black text-white" : "border bg-white"
              }`}
            >
              {k[0].toUpperCase() + k.slice(1)}
            </button>
          ))}
        </div>

        {tab === "fleet" && (
          <div className="grid gap-4 md:grid-cols-3">
            {demoVehicles.map((v) => (
              <CardBox key={v.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-neutral-500">{v.id}</div>
                    <div className="font-semibold">{v.title}</div>
                    <div className="flex items-center gap-1 text-sm text-neutral-600">
                      <MapPin size={14} /> {v.location}
                    </div>
                  </div>
                  <Badge>{v.status}</Badge>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl bg-neutral-50 p-2">
                    <div className="font-bold">{v.days}</div>
                    <div>days active</div>
                  </div>
                  <div className="rounded-xl bg-neutral-50 p-2">
                    <div className="font-bold">${v.est}</div>
                    <div>est / mo</div>
                  </div>
                  <div className="rounded-xl bg-neutral-50 p-2">
                    <div className="font-bold">4.8★</div>
                    <div>rating</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <a className="text-black underline" href="#">
                    View Listing
                  </a>
                  <button className="rounded-full border bg-white px-3 py-1" type="button">
                    Update Availability
                  </button>
                </div>
              </CardBox>
            ))}
          </div>
        )}

        {tab === "calendar" && (
          <CardBox>
            <div className="mb-2 flex items-center gap-2">
              <CalendarDays />
              <b>Availability Calendar</b>
            </div>
            <p className="text-sm text-neutral-600">
              Connect Google Calendar to sync booking windows. Owners agree to 265+ listing days / year.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Dot active />
              <Dot active />
              <Dot />
              <Dot />
              <Dot />
            </div>
          </CardBox>
        )}

        {tab === "payouts" && (
          <CardBox>
            <div className="mb-2 flex items-center gap-2">
              <DollarSign />
              <b>Payouts</b>
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              <div className="rounded-xl bg-neutral-50 p-4">
                <div className="text-sm text-neutral-600">This Month</div>
                <div className="text-2xl font-bold">$3,780</div>
              </div>
              <div className="rounded-xl bg-neutral-50 p-4">
                <div className="text-sm text-neutral-600">Pending</div>
                <div className="text-2xl font-bold">$920</div>
              </div>
              <div className="rounded-xl bg-neutral-50 p-4">
                <div className="text-sm text-neutral-600">Last Month</div>
                <div className="text-2xl font-bold">$4,110</div>
              </div>
            </div>
          </CardBox>
        )}

        {tab === "docs" && (
          <CardBox>
            <div className="mb-2 flex items-center gap-2">
              <FileText />
              <b>Documents</b>
            </div>
            <ul className="list-disc pl-6 text-sm text-neutral-700">
              <li>Consignment Agreement (executed)</li>
              <li>DMV POA (executed)</li>
              <li>Insurance Certificate</li>
              <li>Florida PM Tag Assignment Letter</li>
            </ul>
            <div className="mt-3">
              <button className="rounded-full bg-black px-4 py-2 text-white" type="button">
                Upload New Doc
              </button>
            </div>
          </CardBox>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<"landing" | "dashboard">("landing");

  return (
    <div className="min-h-screen">
      <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
        <span className="rounded-full border bg-white px-3 py-1 text-xs">Preview</span>
        <button
          type="button"
          onClick={() => setMode("landing")}
          className={`rounded-full px-3 py-1 text-xs ${mode === "landing" ? "bg-black text-white" : "border bg-white"}`}
        >
          Landing
        </button>
        <button
          type="button"
          onClick={() => setMode("dashboard")}
          className={`rounded-full px-3 py-1 text-xs ${
            mode === "dashboard" ? "bg-black text-white" : "border bg-white"
          }`}
        >
          Owner Dashboard
        </button>
      </div>

      {mode === "landing" ? <Landing onStart={() => setMode("dashboard")} /> : <OwnerDashboard />}

      <footer className="mx-auto max-w-6xl px-4 py-10 text-xs text-neutral-500">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} NLT SPORTS DRIVE</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">
              <LogIn className="mr-1 inline" size={12} /> DocuSign Portal
            </a>
            <a href="#" className="hover:underline">
              <FileText className="mr-1 inline" size={12} /> Terms
            </a>
            <a href="#" className="hover:underline">
              <Shield className="mr-1 inline" size={12} /> Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
