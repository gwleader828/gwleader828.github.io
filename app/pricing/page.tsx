import type { Metadata } from "next"
import Link from "next/link"
import { Check, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Pricing - ToolsHub",
  description: "Choose the perfect plan for your needs. Start free and scale as you grow.",
}

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    period: "forever",
    features: [
      { name: "5 tools access", included: true },
      { name: "100 API calls/month", included: true },
      { name: "Community support", included: true },
      { name: "Basic analytics", included: true },
      { name: "Priority support", included: false },
      { name: "Custom integrations", included: false },
      { name: "Team collaboration", included: false },
      { name: "Advanced analytics", included: false },
    ],
    cta: "Get Started",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    description: "Best for professionals",
    price: "$19",
    period: "/month",
    features: [
      { name: "All tools access", included: true },
      { name: "10,000 API calls/month", included: true },
      { name: "Email support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority support", included: true },
      { name: "Custom integrations", included: true },
      { name: "Team collaboration", included: false },
      { name: "White-label options", included: false },
    ],
    cta: "Start Free Trial",
    href: "/signup",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large teams & organizations",
    price: "$99",
    period: "/month",
    features: [
      { name: "All tools access", included: true },
      { name: "Unlimited API calls", included: true },
      { name: "24/7 priority support", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Priority support", included: true },
      { name: "Custom integrations", included: true },
      { name: "Team collaboration", included: true },
      { name: "White-label options", included: true },
    ],
    cta: "Contact Sales",
    href: "/signup",
    popular: false,
  },
]

const faqs = [
  {
    question: "Can I change plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, all paid plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for enterprise customers.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. You can cancel your subscription at any time with no questions asked.",
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Choose the perfect plan for your needs. Start free and scale as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative flex flex-col border-border/40 transition-all duration-300 hover:border-border hover:shadow-lg",
                  plan.popular && "border-primary shadow-lg"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="pb-4 pt-6">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="mb-8 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Minus className="h-4 w-4 text-muted-foreground/50" />
                        )}
                        <span
                          className={cn(
                            "text-sm",
                            !feature.included && "text-muted-foreground/50"
                          )}
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border/40 bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently asked questions
            </h2>
            <dl className="mt-12 space-y-8">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-base font-semibold">{faq.question}</dt>
                  <dd className="mt-2 text-muted-foreground">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Still have questions?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our team is here to help. Contact us for personalized assistance.
            </p>
            <div className="mt-8">
              <Button size="lg" variant="outline">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
