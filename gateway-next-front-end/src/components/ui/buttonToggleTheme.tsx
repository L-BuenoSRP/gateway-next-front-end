"use client";

import { useTheme } from "@/contexts/theme-context";
import { Moon, Sun } from "lucide-react";

export function ButtonToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label={
        theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"
      }
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}
