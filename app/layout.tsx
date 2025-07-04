import "./globals.css";
import Navbar from "./components/Navbar/index";
import Footer from "./components/Footer/index";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Unicon Tech | Your Source for Tech Solutions",
  description:
    "Explore cutting-edge tech solutions at Unicon Tech, specializing in innovation and performance.",
  keywords: ["Unicon Tech", "Unicon", "Tech", "Build website", "Unicon website"],
  openGraph: {
    title: "Unicon Tech",
    description: "Your source for tech solutions.",
    url: "https://unicon-tech.vercel.app/",
    images: [
      {
        url: "https://unicon-tech.vercel.app/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://unicon-tech.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        {/* JSON-LD Structured Data */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://unicon-tech.vercel.app/",
              name: "Unicon Tech",
              logo: "https://unicon-tech.vercel.app/logo.png",
              sameAs: [
                "https://www.linkedin.com/company/unicon-tech",
                "https://twitter.com/unicon_tech",
              ],
            }),
          }}
        />
        {/* TinyAdz Script */}
        <Script
          src="https://app.tinyadz.com/scripts/v1.0/ads.js"
          strategy="afterInteractive"
          async
          data-site-id="6867bb8f9b102b1575d383d5"
        />
        {/* Google AdSense Script */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3098710323291507"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
