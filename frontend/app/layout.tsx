import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Ask Stablecode!",
  description: "Help you to find your dream career",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  )
}
