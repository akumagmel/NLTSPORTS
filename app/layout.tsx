import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NLT SPORTS DRIVE",
  description: "Nationwide remote vehicle consignment with Florida registration nexus."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
