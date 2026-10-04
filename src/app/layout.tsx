import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediDecode",
  description: "AI-powered prescription and medicine decoder"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
