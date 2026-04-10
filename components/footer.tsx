"use client"

import Link from "next/link"
import { Sparkles, Twitter, Github, Linkedin } from "lucide-react"

const footerLinks = {
  company: [
    { label: "About", href: "/contact" },
    { label: "Updates", href: "/updates" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">PixelTools</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your one-stop platform for powerful developer tools. Build faster, ship sooner.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wide">Company</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wide">Legal</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PixelTools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
