import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mathematics Club | IIT(ISM) Dhanbad",
  description:
    "The official Mathematics Club of IIT (ISM) Dhanbad - fostering mathematical curiosity, problem-solving, and academic excellence.",
  keywords: "Mathematics Club, IIT ISM Dhanbad, math, Pi, IITISM, club",
  openGraph: {
    title: "Mathematics Club | IIT(ISM) Dhanbad",
    description: "Exploring the infinite beauty of mathematics.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
