"use client"

import * as React from "react"
import { Mail, Copy, RefreshCw, Check, Trash2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TempEmail {
  id: string
  email: string
  createdAt: Date
  expiresAt: Date
}

const domains = [
  "tempmail.com",
  "mailinator.com",
  "10minutemail.com",
  "throwaway.email",
  "temp-mail.org",
  "guerrillamail.com",
  "tempmail.io",
  "sharklasers.com",
  "dispostable.com",
  "fakeinbox.com",
]

const adjectives = [
  "swift", "bright", "lucky", "happy", "clever", "bold", "silent", "quick",
  "smooth", "strong", "fresh", "cool", "nice", "smart", "wise", "kind",
  "fierce", "brave", "wild", "free", "pure", "deep", "rich", "rare",
]

const nouns = [
  "phoenix", "dragon", "tiger", "falcon", "wolf", "raven", "hawk", "eagle",
  "storm", "thunder", "lightning", "ocean", "mountain", "forest", "river", "sky",
  "star", "moon", "sun", "cloud", "wave", "fire", "ice", "stone",
]

function generateTempEmail(): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const number = Math.floor(Math.random() * 10000)
  const domain = domains[Math.floor(Math.random() * domains.length)]
  return `${adjective}${noun}${number}@${domain}`
}

export default function TempMailPage() {
  const [emails, setEmails] = React.useState<TempEmail[]>([])
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  const handleGenerate = () => {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 10 * 60 * 1000) // 10 minutes

    const newEmail: TempEmail = {
      id: Math.random().toString(36).substring(2, 9),
      email: generateTempEmail(),
      createdAt: now,
      expiresAt,
    }

    setEmails([newEmail, ...emails])
  }

  const copyEmail = (email: TempEmail) => {
    navigator.clipboard.writeText(email.email)
    setCopiedId(email.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const deleteEmail = (id: string) => {
    setEmails(emails.filter((e) => e.id !== id))
  }

  const clearAll = () => {
    setEmails([])
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString()
  }

  const timeUntilExpiry = (expiresAt: Date) => {
    const now = new Date()
    const diff = expiresAt.getTime() - now.getTime()
    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  return (
    <div className="flex flex-col animate-fade-in">
      {/* Header */}
      <section className="border-b border-border/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Temporary Email Generator
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Generate disposable email addresses instantly. Perfect for testing, 
              sign-ups, and maintaining privacy online.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Settings Panel */}
            <Card className="h-fit border-border/40 bg-card/50 backdrop-blur-sm lg:sticky lg:top-24">
              <CardHeader>
                <CardTitle>Generate Email</CardTitle>
                <CardDescription>Create temporary email addresses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button onClick={handleGenerate} className="w-full gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Generate Email
                </Button>
                <p className="text-xs text-muted-foreground">
                  Each email expires in 10 minutes. Generate new ones as needed.
                </p>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              {emails.length > 0 ? (
                <div className="space-y-4">
                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      Generated <span className="font-medium text-foreground">{emails.length}</span> email{emails.length !== 1 ? "s" : ""}
                    </p>
                    <Button variant="outline" size="sm" onClick={clearAll} className="gap-2 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Clear All
                    </Button>
                  </div>

                  {/* Email List */}
                  <div className="space-y-3">
                    {emails.map((email, index) => (
                      <Card
                        key={email.id}
                        className="group border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2 text-sm flex-1">
                              <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <span className="font-mono text-base break-all">{email.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>Created: {formatTime(email.createdAt)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <Badge variant="secondary" className="text-xs">
                                  Expires in: {timeUntilExpiry(email.expiresAt)}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyEmail(email)}
                                className="h-8 w-8 shrink-0"
                              >
                                {copiedId === email.id ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteEmail(email.id)}
                                className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <Card className="border-dashed border-border/40 bg-card/30">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Mail className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No emails generated</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Click the generate button to create temporary email addresses for testing and privacy.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/40 bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold">Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <Badge variant="secondary" className="mb-3">Instant Generation</Badge>
              <p className="text-sm text-muted-foreground">Create new email addresses in seconds with a single click.</p>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-3">Privacy Protected</Badge>
              <p className="text-sm text-muted-foreground">Keep your real email address safe from spam and unwanted contact.</p>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="mb-3">Time Limited</Badge>
              <p className="text-sm text-muted-foreground">Emails expire in 10 minutes for added security and cleanup.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
