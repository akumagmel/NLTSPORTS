"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function useCountdownPersisted(hours = 48, storageKey = "nlt_onboarding_target_v1") {
  const target = useMemo(() => {
    if (typeof window === "undefined") return Date.now() + hours * 3600 * 1000;

    const existing = window.localStorage.getItem(storageKey);
    const existingNum = existing ? Number(existing) : NaN;
    if (Number.isFinite(existingNum) && existingNum > Date.now()) return existingNum;

    const next = Date.now() + hours * 3600 * 1000;
    window.localStorage.setItem(storageKey, String(next));
    return next;
  }, [hours, storageKey]);

  const [remaining, setRemaining] = useState(() => Math.max(0, target - Date.now()));

  useEffect(() => {
    const id = window.setInterval(() => setRemaining(Math.max(0, target - Date.now())), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const total = Math.floor(remaining / 1000);
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: Math.floor(total % 60)
  };
}

export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
    {children}
  </span>
);

export const CardBox = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur ${className}`}>{children}</div>
);

export const Dot = ({ active }: { active?: boolean }) => (
  <span className={`h-2 w-2 rounded-full ${active ? "bg-black" : "bg-neutral-300"}`} />
);

function isHashLink(href: string) {
  return href.startsWith("#");
}
function isExternal(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function Btn({
  children,
  href,
  onClick
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-white shadow transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-black/20";

  if (!href) {
    return (
      <button type="button" onClick={onClick as any} className={base}>
        {children} <ChevronRight size={18} />
      </button>
    );
  }

  if (isHashLink(href) || isExternal(href)) {
    return (
      <a href={href} onClick={onClick as any} className={base}>
        {children} <ChevronRight size={18} />
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick as any} className={base}>
      {children} <ChevronRight size={18} />
    </Link>
  );
}
