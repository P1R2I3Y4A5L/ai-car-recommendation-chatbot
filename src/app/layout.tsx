import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vroomy — AI Car Recommendation",
    template: "%s | Vroomy",
  },
  description:
    "Vroomy helps you find the perfect car using AI. Compare cars, explore specs, and get personalised recommendations for Indian and international vehicles.",
  keywords: ["car recommendation", "car comparison", "buy car india", "AI car advisor", "vroomy"],
  openGraph: {
    title: "Vroomy — AI Car Recommendation",
    description: "Find your perfect car with AI-powered recommendations",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  );
}
