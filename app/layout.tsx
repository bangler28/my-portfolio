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
    default: "Ferdiansyah | Editor & Web Developer",
    template: "%s | Ferdiansyah"
  },
  description:
    "Transforming complex problems into elegant web experiences. Explore the portfolio of Ferdiansyah Avattar, a Front-end Engineer with immersive UI/UX design.",
  keywords: [
    "Ferdiansyah", 
    "Who Ferdiansyah",
    "Ferdiansyah", 
    "Avattar", 
    "Ferdiansyah Portfolio", 
    "Portofolio Ferdiansyah",  
    "UI/UX Designer Indonesia", 
    "Frontend Developer Indonesia",
    "Frontend Engineer", 
    "Web Developer Garut", 
    "React Ecosystem Developer",
    "Interactive Web Design",
    "Next.js Developer"
  ],
  authors: [{ name: "Ferdiansyah", url: "https://ferdy-portofolio.web.id" }],
  creator: "Ferdiansyah",
  publisher: "Ferdiansyah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ferdy-portofolio.web.id'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://ferdy.portofolio.web.id",
    title: "Ferdiansyah | Editor & Web Developer",
    description:
      "Transforming complex problems into elegant web experiences. Explore the portfolio of Ferdiansyah, a Web Developer blending the React ecosystem with immersive design.",
    siteName: "Ferdiansyah",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ferdiansyah | Editor & Web Developer',
      },
    ],
    firstName: "Ferdy",
    lastName: "ansyah",
    username: "ferdy",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferdiansyah | Editor & Web Developer",
    description: "Transforming complex problems into elegant web experiences. Explore the portfolio of Ferdiansyah.",
    images: ['/og-image.png'],
    creator: '@3Br4n',
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
  verification: {
    google: "VaPDMhXb57mnJ9x602y0gB3nvsWj1IFntRvYYI3vasc",
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1a1918',
}

import { Toaster } from 'sonner'

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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "url": "https://ferdy.portofolio.web.id",
                "name": "Ferdiansyah Portfolio",
                "description": "Portfolio of Ferdiansyah, a  Editor and Web Developer.",
                "publisher": {
                  "@type": "Person",
                  "name": "Ferdiansyah"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                "dateCreated": "2024-01-01T00:00:00+07:00",
                "dateModified": new Date().toISOString(),
                "mainEntity": {
                  "@type": "Person",
                  name: "Ferdiansyah",
                  url: "https://ferdy.portofolio.web.id",
                  jobTitle: "Front-end Developer & UI/UX Designer",
                  image: "https://ferdy.portofolio.web.id/saya-versi-ai.png",
                  sameAs: [
                    "https://github.com/BranProHengker", 
                    "https://www.linkedin.com/in/gusti-gibran-avattar-819455389/",
                    "https://instagram.com/ferdysocold"
                  ],
                  description:
                    "Ferdiansyah is a passionate Editor & Web Developer specializing in building immersive web applications with the React ecosystem and modern web technologies.",
                  knowsAbout: [
                    "UI/UX Design",
                    "Front-end Development",
                    "React Ecosystem",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "Creative Coding",
                    "GSAP Animation",
                    "Web Developer",
                    "Editor",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Garut",
                    addressRegion: "West Java",
                    addressCountry: "Indonesia"
                  }
                }
              }
            ]),
          }}
        />
      </head>
      <body className={`${leagueSpartan.variable} font-sans antialiased`}>
        <NoiseOverlay />
        <VibePlayer />
        {children}
        <Toaster position="top-center" richColors theme="dark" />
        <Analytics />
      </body>
    </html>
  )
}
