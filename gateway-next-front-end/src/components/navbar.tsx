// "use client"

import Link from "next/link";
// import { useTheme } from "@/contexts/theme-context"
import { Building2, LogOut } from "lucide-react";
// import { usePathname } from "next/navigation"
import { cookies } from "next/headers";
import { Button } from "./ui/button";
import { ButtonToggleTheme } from "./ui/buttonToggleTheme";
import { redirect } from "next/navigation";

export async function logoutAction() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete("apiKey");

  redirect("/login");
}

export default async function Navbar() {
  
  const cookiesStore = await cookies();
  const apiKey = cookiesStore.get("apiKey")?.value !== undefined;

  // const { theme, toggleTheme } = useTheme()
  // const pathname = usePathname()

  // Don't show navbar on login and register pages
  // if (pathname === "/" || pathname === "/register") {
  //   return null
  // }

  if (!apiKey) {
    // redirect("/login");
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Building2 className="h-6 w-6" />
          <span>Full Cycle Gateway Week</span>
        </Link>
        <div className="flex items-center gap-2">
          
          <Button onClick={logoutAction}>
            <Building2 className="mr-2" />
            <LogOut />
          </Button>
          <ButtonToggleTheme />
        </div>
      </div>
    </nav>
  );
}
