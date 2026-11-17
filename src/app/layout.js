import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/seo/JsonLd";

import { siteConfig } from "@/config/site";
import { globalSchema } from "@/lib/seo/schemas";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  applicationName: siteConfig.name,

  referrer: "strict-origin-when-cross-origin",

  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${newsreader.variable}`}
    >
      <body className="min-h-screen">
        <JsonLd data={globalSchema()} />

        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}