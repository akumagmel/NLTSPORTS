"use client";

import React from "react";
import Link from "next/link";
import {
  Check,
  Clock,
  DollarSign,
  Globe2,
  Lock,
  Shield,
  Star,
  Car,
  UserPlus,
  FileText,
  MapPin,
  Zap,
  LogIn
} from "lucide-react";
import { Badge, Btn, CardBox, useCountdownPersisted } from "@/components/Shared";

export default function Page() {
  const { d, h, m, s } = useCountdownPersisted(24 * 30, "nlt_onboarding_target_v1");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-neutral-50 to-white text-neutral-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-black font-bold text-white">N</div>
          <span className="text-lg font-semibold">NLT SPORTS DRIVE</span>
        </div>

        <div className="flex items-center gap-3">
          <a className="text-sm hover:underline" href="#deals">Good Deals</a>
          <a className="text-sm hover:underline" href="#how">How it works</a>
          <a className="text-sm hover:underline" href="#faq">FAQ</a>
          <Btn href="/apply">Start Consigning</Btn>
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 pb-10 pt-8 md:grid-cols-2">
        <div>
          <Badge><Zap size={14} /> New: Nationwide Remote Consignment</Badge>

          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Turn your idle car into{" "}
            <span className="underline decoration-amber-400 decoration-4 underline-offset-4">monthly income</span> — from anywhere.
          </h1>

          <p className="mt-4 text-neutral-700">
            List your car with NLT SPORTS DRIVE. We handle <b>Florida registration (PM decal)</b>, <b>commercial insurance</b>, tolls & citations —
            you keep possession and coordinate local handoffs. 1-year term, 265+ active days.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Btn href="/apply">Start in 5 minutes</Btn>
            <span className="text-sm text-neutral-600">No owner liability • Keep your title • Direct deposits</span>
          </div>

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

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
            <span className="inline-flex items-center gap-2"><Shield size={16} /> Bonded commercial policy</span>
            <span className="inline-flex items-center gap-2"><Lock size={16} /> DocuSign onboarding</span>
            <span className="inline-flex items-center gap-2"><Globe2 size={16} /> Nationwide</span>
          </div>

          <div className="mt-6 text-sm">
            <Link href="/owner" className="underline">Preview Owner Portal</Link>
          </div>
        </div>

        <CardBox className="md:mx-6">
          <div className="flex items-center gap-3">
            <Car />
            <h3 className="text-lg font-semibold">Owner Snapshot</h3>
          </div>

          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-start gap-2"><Check className="mt-0.5" size={16} /> Keep your car. We send FL tag + PM decal.</li>
            <li className="flex items-start gap-2"><Check className="mt-0.5" size={16} /> We cover insurance, tolls, red-light cams.</li>
            <li className="flex items-start gap-2"><Check className="mt-0.5" size={16} /> You coordinate pickup/dropoff locally.</li>
            <li className="flex items-start gap-2"><Check className="mt-0.5" size={16} /> 265+ listing days / 12-month renewable term.</li>
            <li className="flex items-start gap-2"><Check className="mt-0.5" size={16} /> Transparent split & dashboards for payouts.</li>
          </ul>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-xl bg-neutral-50 p-3"><div className="text-lg font-bold">72h</div><div>to first listing</div></div>
            <div className="rounded-xl bg-neutral-50 p-3"><div className="text-lg font-bold">$0</div><div>owner liability</div></div>
            <div className="rounded-xl bg-neutral-50 p-3"><div className="text-lg font-bold">265+</div><div>active days</div></div>
          </div>
        </CardBox>
      </section>

      <section id="deals" className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold">Good Deals • Ready & Inspected</h2>
        <p className="mt-1 text-sm text-neutral-600">Curated vehicles available for purchase — fully inspected and rental-ready.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { title: "2019 Toyota Camry SE", loc: "Atlanta, GA", tag: "Ready", note: "Inspection complete • Est. $950/mo • 265+ days target" },
            { title: "2021 Tesla Model 3 SR+", loc: "Miami, FL", tag: "Inspected", note: "Fleet-ready • Est. $1,480/mo • Clean CarFax" },
            { title: "2020 Honda Civic EX", loc: "Dallas, TX", tag: "Ready", note: "Inspection complete • Est. $880/mo • Low miles" }
          ].map((x) => (
            <CardBox key={x.title}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{x.title}</div>
                  <div className="text-sm text-neutral-600">{x.loc}</div>
                </div>
                <Badge>{x.tag}</Badge>
              </div>
              <p className="mt-3 text-sm text-neutral-700">{x.note}</p>
              <div className="mt-3"><Btn href="/apply">Request Details</Btn></div>
            </CardBox>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <CardBox><UserPlus className="mb-2" /><b>Apply</b><p className="mt-2 text-sm text-neutral-700">Submit VIN, photos, and agree to 265+ active days.</p></CardBox>
          <CardBox><FileText className="mb-2" /><b>e-Sign</b><p className="mt-2 text-sm text-neutral-700">DocuSign: Consignment + DMV POA. We activate insurance.</p></CardBox>
          <CardBox><MapPin className="mb-2" /><b>Tag & Go</b><p className="mt-2 text-sm text-neutral-700">We ship your Florida plate + PM decal. You keep the car.</p></CardBox>
          <CardBox><DollarSign className="mb-2" /><b>Get Paid</b><p className="mt-2 text-sm text-neutral-700">Coordinate local handoffs. We handle payouts & reporting.</p></CardBox>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <CardBox>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <p className="text-sm text-neutral-700">
              “Hands-off income. NLT handled tags, insurance, and renters. I never visited a DMV.” — <b>M. Rivera, FL</b>
            </p>
          </div>
        </CardBox>
      </section>

      <section id="faq" className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <CardBox><b>Do I keep my car?</b><p className="text-sm text-neutral-700">Yes. You keep possession and coordinate local handoffs. We manage registration, insurance, tolls, and payouts.</p></CardBox>
          <CardBox><b>Which states?</b><p className="text-sm text-neutral-700">Nationwide onboarding with Florida as registration nexus. You’ll receive a Florida tag + PM decal.</p></CardBox>
          <CardBox><b>Minimum commitment?</b><p className="text-sm text-neutral-700">12-month term, at least 265 active listing days per year.</p></CardBox>
          <CardBox><b>Insurance & tickets?</b><p className="text-sm text-neutral-700">Covered under our commercial policy. Tolls and camera citations route to us, not the owner.</p></CardBox>
          <CardBox><b>How fast can I go live?</b><p className="text-sm text-neutral-700">Usually within 7–10 business days after onboarding + required photos/info.</p></CardBox>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-10 text-xs text-neutral-500">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} NLT SPORTS DRIVE</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline"><LogIn className="mr-1 inline" size={12} /> DocuSign Portal</a>
            <Link href="/apply" className="hover:underline"><FileText className="mr-1 inline" size={12} /> Terms</Link>
            <a href="#" className="hover:underline"><Shield className="mr-1 inline" size={12} /> Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
