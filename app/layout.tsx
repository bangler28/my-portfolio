import type React from "react"
import type { Metadata } from "next"
import { League_Spartan } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import NoiseOverlay from "@/components/noise-overlay"
import VibePlayer from "@/components/vibe-player"
import "./globals.css"

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-league-spartan",
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "Gusti Gibran Avattar - Creative Developer & UI/UX Designer",
    template: "%s | Gusti Gibran Avattar"
  },
  description:
    "Official Portfolio of Gusti Gibran Avattar. A Creative Developer, UI/UX Designer, and Frontend Engineer specializing in immersive web experiences, 3D interactions, and modern interface design.",
  keywords: [
    "Gusti Gibran Avattar", 
    "Gusti Gibran", 
    "Avattar", 
    "Portfolio", 
    "Creative Developer", 
    "UI/UX Designer", 
    "Frontend Developer", 
    "Web Developer Malang", 
    "Interactive Web Design",
    "Next.js Developer",
    "React Specialist",
    "Gusti Gibran Avattar Portfolio"
  ],
  authors: [{ name: "Gusti Gibran Avattar", url: "https://gustigibranavattar.vercel.app" }],
  creator: "Gusti Gibran Avattar",
  publisher: "Gusti Gibran Avattar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gustigibranavattar.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://gustigibranavattar.vercel.app",
    title: "Gusti Gibran Avattar - Front-end Developer & UI/UX Designer",
    description:
      "Explore the creative portfolio of Gusti Gibran Avattar. Featuring interactive web projects, modern UI/UX designs, and frontend development expertise.",
    siteName: "Gusti Gibran Avattar Portfolio",
    images: [
      {
        url: '/saya-versi-ai.png',
        width: 1200,
        height: 630,
        alt: 'Gusti Gibran Avattar - Creative Developer',
      },
    ],
    firstName: "Gusti",
    lastName: "Avattar",
    username: "gustigibran",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gusti Gibran Avattar - Creative Developer & UI/UX Designer",
    description: "Official portfolio of Gusti Gibran Avattar. Creative Developer & UI/UX Designer.",
    images: ['/saya-versi-ai.png'],
    creator: '@gustigibran',
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1a1918',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gusti Gibran Avattar",
              url: "https://gustigibranavattar.vercel.app",
              jobTitle: "Creative Developer & UI/UX Designer",
              image: "https://gustigibranavattar.vercel.app/saya-versi-ai.png",
              sameAs: [
                "https://github.com/BranProHengker", 
                "https://www.linkedin.com/in/gusti-gibran-avattar-819455389/",
                "https://instagram.com/gustigibran"
              ],
              description:
                "Gusti Gibran Avattar is a Creative Developer and UI/UX Designer specializing in building immersive web applications with Next.js and modern technologies.",
              knowsAbout: [
                "UI/UX Design",
                "Front-end Development",
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Creative Coding",
                "GSAP Animation"
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Malang",
                addressRegion: "East Java",
                addressCountry: "Indonesia"
              }
            }),
          }}
        />
      </head>
      <body className={`${leagueSpartan.variable} font-sans antialiased`}>
        <NoiseOverlay />
        <VibePlayer />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
