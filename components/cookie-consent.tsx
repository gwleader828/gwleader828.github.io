"use client"

import * as React from "react"
import Link from "next/link"
import { X, Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const COOKIE_CONSENT_KEY = "pixeltools-cookie-consent"

export function CookieConsent() {
  const [mounted, setMounted] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    setIsClosing(true)
    setTimeout(() => {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
      setIsVisible(false)
    }, 300)
  }

  const handleDecline = () => {
    setIsClosing(true)
    setTimeout(() => {
      localStorage.setItem(COOKIE_CONSENT_KEY, "declined")
      setIsVisible(false)
    }, 300)
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }

  // Don't render anything on server or before mount
  if (!mounted || !isVisible) return null

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md sm:p-0",
        "transition-all duration-300 ease-out",
        isClosing 
          ? "translate-y-full opacity-0 sm:translate-y-0 sm:translate-x-full" 
          : "translate-y-0 opacity-100 sm:translate-x-0"
      )}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-background/95 p-6 shadow-2xl backdrop-blur-xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Cookie className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 pr-6">
            <h3 className="font-heading text-lg font-semibold">We use cookies</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
            </p>
            <Link 
              href="/cookies" 
              className="mt-2 inline-block text-sm text-primary transition-colors hover:underline"
            >
              Learn more
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={handleAccept}
            className="flex-1 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
          >
            Accept All
          </Button>
          <Button
            variant="outline"
            onClick={handleDecline}
            className="flex-1 transition-all duration-300"
          >
            Decline
          </Button>
        </div>

        {/* Decorative gradient */}
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </div>
  )
}
