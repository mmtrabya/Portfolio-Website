import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import { CursorGlow } from "@/components/cursor-glow";
import {
  ThemeProvider,
  THEME_BOOTSTRAP_SCRIPT,
} from "@/components/theme-provider";
import { withBasePath } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohammedtarabay.dev"),
  title: "Mohammed Tarabay | Software Engineer — AI, DevOps & Robotics",
  description:
    "AI Engineering student at Mansoura University shipping AI-driven systems across robotics, autonomous vehicles, and cloud-native DevOps.",
  openGraph: {
    title: "Mohammed Tarabay | Software Engineer — AI, DevOps & Robotics",
    description:
      "AI · DevOps · Robotics. Builder of autonomous mobility, ADAS, and cloud-native systems.",
    url: "https://mohammedtarabay.dev",
    siteName: "Mohammed Tarabay",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Mohammed Tarabay — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Tarabay | Software Engineer",
    description: "AI · DevOps · Robotics. Builder of autonomous mobility and cloud-native systems.",
    images: ["/og-image.svg"],
  },
  // Icons are wired manually in <head> below because Next's metadata.icons
  // doesn't reliably prepend basePath in static export.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrains.variable} dark`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href={withBasePath("/favicon.svg")} />
        <link rel="apple-touch-icon" href={withBasePath("/favicon.svg")} />
        <script
          dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }}
        />
      </head>
      <body className="antialiased text-sm sm:text-base">
        <ThemeProvider>
          <CursorGlow />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-subtle)",
              },
            }}
          />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
