"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CalendarDays, DollarSign, FileText, MapPin, Shield } from "lucide-react";
import { Badge, Btn, CardBox, Dot } from "@/components/Shared";

const demoVehicles = [
  { id: "VIN-001", title: "2022 Tesla Model 3", location: "Miami, FL", status: "Available", days: 226, est: 1480 },
  { id: "VIN-002", title: "2019 Toyota Camry", location: "Tampa, FL", status: "Booked", days: 204, est: 980 },
  { id: "VIN-003", title: "2021 BMW X5", location: "Orlando, FL", status: "Maintenance", days: 212, est: 1320 }
];

export default function OwnerPage() {
  const [tab, setTab] = useState<"fleet" | "calendar" | "payouts" | "docs">("fleet");

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-black font-bold text-white">N</div>
            <h1 className="text-xl font-semibold">Owner Portal</h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full border bg-white px-4 py-2 text-sm hover:bg-neutral-100"
            >
              Back to Site
            </Link>
            <button className="rounded-full border bg-white px-4 py-2 text-sm" type="button">
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
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

          <div className="ml-auto">
            <Btn href="/apply">Add Vehicle</Btn>
          </div>
        </div>

        {/* Fleet */}
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

        {/* Calendar */}
        {tab === "calendar" && (
          <CardBox>
            <div className="mb-2 flex items-center gap-2">
              <CalendarDays />
              <b>Availability Calendar</b>
            </div>
            <p className="text-sm text-neutral-600">
              Connect Google Calendar later to sync booking windows. Owners agree to 265+ listing days / year.
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

        {/* Payouts */}
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

        {/* Docs */}
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

        <div className="mt-10 flex items-center justify-between text-xs text-neutral-500">
          <span>© {new Date().getFullYear()} NLT SPORTS DRIVE</span>
          <span className="inline-flex items-center gap-2">
            <Shield size={12} /> Owner Portal
          </span>
        </div>
      </div>
    </div>
  );
}
