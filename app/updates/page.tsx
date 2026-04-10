import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Sparkles, Zap, Shield, Globe, Palette, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Updates - PixelTools",
  description: "Stay up to date with the latest features, improvements, and announcements from PixelTools.",
}

const updates = [
  {
    date: "April 5, 2026",
    version: "v2.5.0",
    title: "Introducing AI-Powered Code Generation",
    description: "We've added a new AI-powered code generation tool that helps you write code faster. Simply describe what you want, and let AI do the heavy lifting.",
    icon: Sparkles,
    type: "feature",
    highlights: [
      "Support for 15+ programming languages",
      "Context-aware suggestions",
      "One-click code export",
    ],
  },
  {
    date: "March 28, 2026",
    version: "v2.4.2",
    title: "Performance Improvements",
    description: "Major performance optimizations across all tools. Experience up to 3x faster load times and smoother interactions.",
    icon: Zap,
    type: "improvement",
    highlights: [
      "Reduced initial load time by 60%",
      "Optimized image processing",
      "Better caching strategies",
    ],
  },
  {
    date: "March 15, 2026",
    version: "v2.4.0",
    title: "Enhanced Security Features",
    description: "Your security is our priority. We've implemented additional security measures to keep your data safe.",
    icon: Shield,
    type: "security",
    highlights: [
      "Two-factor authentication",
      "End-to-end encryption for sensitive data",
      "Advanced session management",
    ],
  },
  {
    date: "March 1, 2026",
    version: "v2.3.0",
    title: "Global CDN Integration",
    description: "We've expanded our infrastructure with a global CDN, ensuring fast and reliable access from anywhere in the world.",
    icon: Globe,
    type: "infrastructure",
    highlights: [
      "50+ edge locations worldwide",
      "99.99% uptime guarantee",
      "Automatic failover",
    ],
  },
  {
    date: "February 20, 2026",
    version: "v2.2.0",
    title: "New Design System",
    description: "A complete visual refresh with a new design system. Enjoy a more modern, accessible, and consistent experience.",
    icon: Palette,
    type: "design",
    highlights: [
      "Dark mode improvements",
      "Better accessibility (WCAG 2.1 AA)",
      "Responsive design updates",
    ],
  },
  {
    date: "February 5, 2026",
    version: "v2.1.0",
    title: "API v2 Launch",
    description: "Introducing API v2 with improved endpoints, better documentation, and higher rate limits for all users.",
    icon: Code,
    type: "api",
    highlights: [
      "RESTful API redesign",
      "GraphQL support",
      "Interactive API playground",
    ],
  },
]

const typeColors: Record<string, string> = {
  feature: "bg-primary/10 text-primary",
  improvement: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  security: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  infrastructure: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  design: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  api: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
}

const typeLabels: Record<string, string> = {
  feature: "New Feature",
  improvement: "Improvement",
  security: "Security",
  infrastructure: "Infrastructure",
  design: "Design",
  api: "API",
}

export default function UpdatesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-8 gap-2 animate-fade-in">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-slide-up stagger-1 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Product <span className="gradient-text">Updates</span>
            </h1>
            <p className="mt-6 animate-slide-up stagger-2 text-lg leading-relaxed text-muted-foreground">
              Stay informed about the latest features, improvements, and announcements. 
              We&apos;re constantly working to make PixelTools better for you.
            </p>
          </div>
        </div>
      </section>

      {/* Updates Timeline */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 hidden h-full w-px bg-border md:block" />

            <div className="space-y-12">
              {updates.map((update, index) => (
                <div 
                  key={update.version}
                  className={cn(
                    "animate-slide-up relative",
                    index === 0 ? "stagger-1" : 
                    index === 1 ? "stagger-2" : 
                    index === 2 ? "stagger-3" : 
                    index === 3 ? "stagger-4" : 
                    index === 4 ? "stagger-5" : "stagger-6"
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 hidden h-4 w-4 rounded-full border-4 border-background bg-primary md:block" />

                  <Card className="card-hover ml-0 overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl md:ml-20">
                    <CardContent className="p-0">
                      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start">
                        {/* Icon */}
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                          <update.icon className="h-7 w-7 text-primary" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className={cn(
                              "rounded-full px-3 py-1 text-xs font-medium",
                              typeColors[update.type]
                            )}>
                              {typeLabels[update.type]}
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">
                              {update.version}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {update.date}
                            </span>
                          </div>

                          <h2 className="mt-3 font-heading text-xl font-semibold">
                            {update.title}
                          </h2>
                          <p className="mt-2 leading-relaxed text-muted-foreground">
                            {update.description}
                          </p>

                          {/* Highlights */}
                          <ul className="mt-4 space-y-2">
                            {update.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" className="gap-2">
              View All Updates
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-border/50 bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold">Stay in the Loop</h2>
          <p className="mt-4 text-muted-foreground">
            Subscribe to our newsletter to get the latest updates delivered directly to your inbox.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full max-w-sm rounded-xl border border-border/50 bg-background px-4 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button size="lg" className="w-full shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 sm:w-auto">
              Subscribe
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  )
}
