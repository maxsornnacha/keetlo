"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/clsx"

const navItems = [
  { name: "My Account", href: "/my-account" },
  { name: "Meeting History", href: "/my-account/meeting-history" },
  { name: "Security Settings", href: "/my-account/security-settings" },
  { name: "My Stats", href: "/my-account/account-stats" },
  { name: "Recent Activity", href: "/my-account/recent-activity" },
  { name: "Account Settings", href: "/my-account/account-settings" },
]

export function ProfileNavigation() {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 flex-wrap">
      {navItems.map((item) => (
        <div key={item.href} className="hover:text-red-500">
        <Link
          href={item.href}
          className={cn(
            "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium",
            pathname === item.href
              ? "text-red-500 underline underline-offset-4"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {item.name}
        </Link>
        </div>
      ))}
    </nav>
  )
}
