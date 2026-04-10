"use client"

import Link from "next/link"
import { ArrowRight, Zap, Shield, Globe, Code, Cpu, ChartNoAxesColumnIncreasing, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized tools that run at blazing speed, saving you valuable time on every task.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data stays safe with enterprise-grade security and end-to-end encryption.",
  },
  {
    icon: Globe,
    title: "Access Anywhere",
    description: "Use our tools from any device, anywhere in the world with seamless sync.",
  },
  {
    icon: Code,
    title: "Developer Focused",
    description: "Built by developers, for developers. We understand your workflow needs.",
  },
  {
    icon: Cpu,
    title: "AI Powered",
    description: "Leverage cutting-edge AI to automate tasks and enhance your productivity.",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Smart Analytics",
    description: "Track your usage and optimize your workflow with actionable insights.",
  },
]

const stats = [
  { value: "50+", label: "Tools Available" },
  { value: "100K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex animate-slide-down items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Now with 50+ tools available
            </div>
            <h1 className="animate-blur-in font-heading text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              The complete platform to{" "}
              <span className="gradient-text">
                build faster
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl animate-slide-up stagger-2 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Your toolkit to stop configuring and start innovating. Securely build, deploy, and
              scale the best web experiences with powerful developer tools.
            </p>
            <div className="mt-12 flex animate-slide-up stagger-3 flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="group h-13 min-w-[200px] px-8 text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline" size="lg" className="h-13 min-w-[200px] px-8 text-base transition-all duration-300 hover:bg-secondary">
                  Explore Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/50 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="animate-slide-up text-center"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">{stat.value}</div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="animate-slide-up font-heading text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Everything you need to build faster
            </h2>
            <p className="animate-slide-up stagger-2 mt-6 text-pretty text-lg text-muted-foreground">
              Our platform provides all the tools you need to streamline your development workflow
              and ship products faster.
            </p>
          </div>
          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="card-hover group animate-scale-in cursor-default border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <feature.icon className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-semibold tracking-tight">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-y border-border/50 bg-muted/30 py-24 sm:py-32" id="about">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="animate-slide-right">
              <h2 className="font-heading text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Built for developers, by developers
              </h2>
              <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground">
                We understand the challenges developers face daily. That&apos;s why we&apos;ve built
                a comprehensive suite of tools designed to eliminate friction and boost
                productivity.
              </p>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                From code formatting to API testing, from image optimization to JSON validation,
                our tools are crafted with precision and care to help you focus on what matters
                most: building great products.
              </p>
              <div className="mt-10">
                <Link href="/tools">
                  <Button size="lg" className="group h-13 px-8 text-base shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
                    Explore All Tools
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-slide-left stagger-2">
              <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card to-muted/50 p-10 shadow-xl">
                <div className="flex h-full flex-col items-center justify-center space-y-6">
                  <div className="grid grid-cols-3 gap-5">
                    {[Code, Zap, Shield, Globe, Cpu, ChartNoAxesColumnIncreasing].map((Icon, i) => (
                      <div
                        key={i}
                        className="card-hover animate-scale-in flex h-20 w-20 items-center justify-center rounded-2xl border border-border/50 bg-background shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <Icon className="h-9 w-9 text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-primary" />
                      </div>
                    ))}
                  </div>
                  <p className="pt-4 text-center text-sm font-medium text-muted-foreground">
                    50+ tools and growing
                  </p>
                </div>
                {/* Decorative gradient */}
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-scale-in relative overflow-hidden rounded-[2rem] bg-primary px-8 py-20 shadow-2xl shadow-primary/25 sm:px-16 sm:py-28">
            {/* Decorative elements */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
                Ready to supercharge your workflow?
              </h2>
              <p className="mt-6 text-pretty text-lg text-primary-foreground/80">
                Join thousands of developers who are already using PixelTools to build faster and
                smarter.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-13 min-w-[200px] px-8 text-base shadow-lg transition-all duration-300 hover:shadow-xl"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-13 min-w-[200px] border-primary-foreground/20 bg-transparent px-8 text-base text-primary-foreground transition-all duration-300 hover:bg-primary-foreground/10"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
