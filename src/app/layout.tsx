import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/contexts/theme-context"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gateway de Pagamento",
  description: "Sistema de gateway de pagamento para empresas com múltiplas filiais",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-200`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
            © 2025 Full Cycle Gateway Week. Todos os direitos reservados.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
