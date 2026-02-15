"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Car, FileText, MapPin, Shield, User } from "lucide-react";
import { Badge, Btn, CardBox } from "@/components/Shared";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white text-neutral-900">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-black font-bold text-white">N</div>
            <div>
              <div className="text-sm text-neutral-500">Onboarding</div>
              <div className="text-lg font-semibold">Start Consigning</div>
            </div>
          </div>

          <Link href="/" className="text-sm hover:underline">
            Back to site
          </Link>
        </div>

        <CardBox>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText />
              <h1 className="text-xl font-semibold">Application</h1>
            </div>
            <Badge>
              <Shield size={14} /> DocuSign-ready
            </Badge>
          </div>

          <p className="mt-2 text-sm text-neutral-700">
            Submit your info to begin. Next step is DocuSign (Consignment + DMV POA) and we ship your Florida plate + PM decal.
          </p>

          {submitted ? (
            <div className="mt-6 rounded-2xl border bg-neutral-50 p-5">
              <div className="text-lg font-semibold">Submitted ✅</div>
              <p className="mt-2 text-sm text-neutral-700">
                You’re in the pipeline. Next: document review, vehicle photos, then DocuSign.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Btn href="/owner">Go to Owner Portal</Btn>
                <Btn href="/">Return Home</Btn>
              </div>
            </div>
          ) : (
            <form
              className="mt-6 grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid gap-3 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1 inline-flex items-center gap-2 text-sm font-medium">
                    <User size={14} /> Full Name
                  </span>
                  <input
                    required
                    className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                    placeholder="Owner name"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 inline-flex items-center gap-2 text-sm font-medium">
                    <MapPin size={14} /> City / State
                  </span>
                  <input
                    required
                    className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                    placeholder="Miami, FL"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 inline-flex items-center gap-2 text-sm font-medium">
                  <Car size={14} /> Vehicle (Year Make Model)
                </span>
                <input
                  required
                  className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="2022 Tesla Model 3"
                />
              </label>

              <label className="block">
                <span className="mb-1 text-sm font-medium">VIN (or last 6)</span>
                <input
                  required
                  className="w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="VIN or last 6"
                />
              </label>

              <label className="block">
                <span className="mb-1 text-sm font-medium">Notes</span>
                <textarea
                  className="min-h-[90px] w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                  placeholder="Availability, mileage, condition, questions…"
                />
              </label>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Btn>Submit Application</Btn>
                <span className="text-xs text-neutral-600">
                  By submitting, you agree to the 12-month term and 265+ active listing days target.
                </span>
              </div>
            </form>
          )}
        </CardBox>

        <div className="mt-8 text-xs text-neutral-500">
          © {new Date().getFullYear()} NLT SPORTS DRIVE •{" "}
          <Link className="hover:underline" href="/owner">
            Owner Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
