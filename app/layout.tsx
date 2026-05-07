import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LocIntel MVP",
  description: "Synthetic location intelligence MVP"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
