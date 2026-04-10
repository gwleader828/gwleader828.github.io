"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Explore Tools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/updates", label: "Updates" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight">PixelTools</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute inset-x-2 -bottom-[17px] h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm" className="px-4">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="px-5 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="transition-transform duration-200 active:scale-95"
          >
            <div className="relative h-5 w-5">
              <Menu 
                className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-300",
                  mobileMenuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                )} 
              />
              <X 
                className={cn(
                  "absolute inset-0 h-5 w-5 transition-all duration-300",
                  mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                )} 
              />
            </div>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-out md:hidden",
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-1 px-4 py-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              style={{ 
                animationDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full transition-all duration-200">
                Log in
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full shadow-lg shadow-primary/25 transition-all duration-200">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
