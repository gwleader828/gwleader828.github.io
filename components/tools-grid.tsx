"use client"

import { MapPin, CreditCard, CheckCircle2, Mail, Key } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const tools = [
  {
    id: 1,
    name: "Address Generator",
    description: "Generate realistic random addresses for testing, development, and data mocking purposes.",
    icon: MapPin,
    category: "Data Tools",
    badge: "Popular",
    href: "/tools/address-generator",
  },
  {
    id: 2,
    name: "CC Generator",
    description: "Generate valid test credit card numbers using the Luhn algorithm for payment system testing.",
    icon: CreditCard,
    category: "Testing Tools",
    badge: "New",
    href: "/tools/cc-generator",
  },
  {
    id: 3,
    name: "CC Checker",
    description: "Validate credit card numbers and detect card brands using the Luhn algorithm.",
    icon: CheckCircle2,
    category: "Validation Tools",
    badge: "New",
    href: "/tools/cc-checker",
  },
  {
    id: 4,
    name: "Temporary Email",
    description: "Generate disposable email addresses instantly for testing and privacy protection.",
    icon: Mail,
    category: "Privacy Tools",
    badge: "Popular",
    href: "/tools/temp-mail",
  },
  {
    id: 5,
    name: "TOTP Authenticator",
    description: "Generate time-based one-time passwords for two-factor authentication and testing.",
    icon: Key,
    category: "Security Tools",
    badge: "New",
    href: "/tools/totp",
  },
]

export function ToolsGrid() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{tools.length}</span> tool{tools.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <Card
            key={tool.id}
            className="group flex flex-col border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
                {tool.badge && (
                  <Badge
                    variant={tool.badge === "New" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {tool.badge}
                  </Badge>
                )}
              </div>
              <CardTitle className="mt-4 text-lg">{tool.name}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {tool.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{tool.category}</span>
                <Link href={tool.href}>
                  <Button 
                    size="sm" 
                    className="gap-2 px-4 h-9 bg-primary hover:bg-primary/90 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/30"
                  >
                    Open Tool
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
