import type React from "react"
import type { Metadata } from "next"
import { League_Spartan } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-league-spartan",
})

export const metadata: Metadata = {
  title: "Gusti Gibran - UI/UX Designer & Front-end Developer",
  description:
    "Portfolio of Gusti Gibran, a UI/UX Designer and Front-end Developer specializing in modern web applications and game design. Explore my projects and skills.",
  keywords: ["UI/UX Designer", "Front-end Developer", "React", "Next.js", "Web Design", "Game Design"],
  authors: [{ name: "Gusti Gibran" }],
  creator: "Gusti Gibran",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gustigibranavattarcv.vercel.app",
    title: "Gusti Gibran - UI/UX Designer & Front-end Developer",
    description:
      "Portfolio of Gusti Gibran, a UI/UX Designer and Front-end Developer specializing in modern web applications and game design.",
    siteName: "Gusti Gibran Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gusti Gibran - UI/UX Designer & Front-end Developer",
    description: "Explore my portfolio of UI/UX design and front-end development projects.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Gusti Gibran",
              url: "https://gustigibranavattarcv.vercel.app",
              jobTitle: "UI/UX Designer & Front-end Developer",
              image: "/cv-gusti.png",
              sameAs: ["https://github.com/BranProHengker", "https://www.linkedin.com/in/gusti-gibran"],
              description:
                "UI/UX Designer and Front-end Developer specializing in modern web applications and game design",
            }),
          }}
        />
      </head>
      <body className={`${leagueSpartan.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
