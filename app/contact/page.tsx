"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Mail, MessageSquare, HelpCircle, Send, MapPin, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email and we'll respond within 24 hours.",
    contact: "support@pixeltools.dev",
    href: "mailto:support@pixeltools.dev",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our support team in real-time.",
    contact: "Available 9AM - 6PM EST",
    href: "#",
  },
  {
    icon: HelpCircle,
    title: "Help Center",
    description: "Browse our knowledge base for quick answers.",
    contact: "View Documentation",
    href: "#",
  },
]

const faqs = [
  {
    question: "How do I get started with PixelTools?",
    answer: "Simply sign up for a free account and you'll have immediate access to all our basic tools. No credit card required.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and wire transfers for enterprise accounts.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.",
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

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
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="mt-6 animate-slide-up stagger-2 text-lg leading-relaxed text-muted-foreground">
              Have a question or need help? Our team is here to assist you. 
              Reach out and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <Link 
                key={method.title} 
                href={method.href}
                className={cn(
                  "animate-slide-up",
                  index === 0 ? "stagger-1" : index === 1 ? "stagger-2" : "stagger-3"
                )}
              >
                <Card className="card-hover h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                      <method.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-semibold">{method.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{method.description}</p>
                    <p className="mt-4 font-medium text-primary">{method.contact}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="border-y border-border/50 bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Form */}
            <div className="animate-slide-right">
              <h2 className="font-heading text-3xl font-bold">Send us a message</h2>
              <p className="mt-4 text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-semibold">Message Sent!</h3>
                  <p className="mt-2 text-muted-foreground">
                    Thank you for reaching out. We&apos;ll be in touch soon.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-6"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input 
                        id="firstName" 
                        placeholder="John" 
                        required 
                        className="h-12 rounded-xl border-border/50 bg-background transition-all duration-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe" 
                        required 
                        className="h-12 rounded-xl border-border/50 bg-background transition-all duration-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      className="h-12 rounded-xl border-border/50 bg-background transition-all duration-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      placeholder="How can we help?" 
                      required 
                      className="h-12 rounded-xl border-border/50 bg-background transition-all duration-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your question..." 
                      required 
                      rows={5}
                      className="rounded-xl border-border/50 bg-background transition-all duration-300 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full gap-2 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="animate-slide-left lg:pl-8">
              <h2 className="font-heading text-3xl font-bold">Other Ways to Reach Us</h2>
              <p className="mt-4 text-muted-foreground">
                Prefer a different method? Here are other ways to get in touch.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4 rounded-2xl border border-border/50 bg-background p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">Office Location</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      123 Developer Street<br />
                      San Francisco, CA 94102<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-border/50 bg-background p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">Business Hours</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday: 10:00 AM - 2:00 PM EST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-border/50 bg-background p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">Email Addresses</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      General: hello@pixeltools.dev<br />
                      Support: support@pixeltools.dev<br />
                      Sales: sales@pixeltools.dev
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="animate-slide-up rounded-2xl border border-border/50 bg-card/50 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <h3 className="font-heading font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
