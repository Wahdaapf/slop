import type { Metadata } from "next";
import "./globals.css";
import "./screens.css";
import "./responsive.css";
import "./type-scale.css";
import "./design-system.css";
import "./landing.css";

export const metadata: Metadata = {
  title: "PlayTest ID — Platform Pengujian Aplikasi Android",
  description: "Kelola siklus pengujian Android dengan misi yang jelas, progres terukur, dan insight tester.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
