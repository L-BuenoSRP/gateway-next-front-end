"use client"

import Link from "next/link"
import { useTheme } from "@/contexts/theme-context"
import { Sun, Moon, Building2 } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()

  // Don't show navbar on login and register pages
  if (pathname === "/" || pathname === "/register") {
    return null
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
          <Building2 className="h-6 w-6" />
          <span>Full Cycle Gateway Week</span>
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
      </div>
    </nav>
  )
}
