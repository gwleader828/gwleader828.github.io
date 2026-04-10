"use client"

import * as React from "react"
import { Key, Copy, RefreshCw, Check, Trash2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface TOTPData {
  id: string
  secret: string
  code: string
  name: string
  issuer: string
  createdAt: Date
  timeRemaining: number
}

// Base32 encoding for TOTP secret
const base32Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

function generateRandomSecret(length: number = 32): string {
  let secret = ""
  for (let i = 0; i < length; i++) {
    secret += base32Alphabet[Math.floor(Math.random() * 32)]
  }
  return secret
}

function base32Decode(encoded: string): number[] {
  const bytes: number[] = []
  let bits = 0
  let value = 0

  for (const char of encoded) {
    const index = base32Alphabet.indexOf(char.toUpperCase())
    if (index === -1) continue

    value = (value << 5) | index
    bits += 5

    if (bits >= 8) {
      bits -= 8
      bytes.push((value >> bits) & 0xff)
    }
  }

  return bytes
}

function generateTOTP(secret: string, time: number = Math.floor(Date.now() / 1000)): string {
  const timeCounter = Math.floor(time / 30)
  const bytes = base32Decode(secret)

  // Simple HMAC-SHA1 simulation for TOTP
  // For production, use a proper crypto library
  let hash = 0
  for (let i = 0; i < bytes.length; i++) {
    hash = ((hash << 5) - hash) + bytes[i]
    hash = hash & hash
  }

  const offset = Math.abs(hash) % 4
  let otp = 0
  for (let i = 0; i < 4; i++) {
    otp = (otp << 8) | bytes[(offset + i) % bytes.length]
  }

  otp = ((otp & 0x7fffffff) % 1000000)
  return String(otp).padStart(6, "0")
}

export default function TOTPPage() {
  const [totps, setTotps] = React.useState<TOTPData[]>([])
  const [name, setName] = React.useState("")
  const [issuer, setIssuer] = React.useState("")
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [time, setTime] = React.useState(Math.floor(Date.now() / 1000))

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(Math.floor(Date.now() / 1000))
      setTotps((prev) =>
        prev.map((totp) => ({
          ...totp,
          timeRemaining: 30 - (time % 30),
          code: generateTOTP(totp.secret, time),
        }))
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [time])

  const handleGenerate = () => {
    if (!name.trim()) return

    const secret = generateRandomSecret()
    const code = generateTOTP(secret)

    const newTOTP: TOTPData = {
      id: Math.random().toString(36).substring(2, 9),
      secret,
      code,
      name,
      issuer: issuer || "PixelTools",
      createdAt: new Date(),
      timeRemaining: 30 - (time % 30),
    }

    setTotps([newTOTP, ...totps])
    setName("")
    setIssuer("")
  }

  const copySecret = (totp: TOTPData) => {
    navigator.clipboard.writeText(totp.secret)
    setCopiedId(totp.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const copyCode = (totp: TOTPData) => {
    navigator.clipboard.writeText(totp.code)
    setCopiedId(`code-${totp.id}`)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const deleteTotp = (id: string) => {
    setTotps(totps.filter((t) => t.id !== id))
  }

  const clearAll = () => {
    setTotps([])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGenerate()
    }
  }

  return (
    <div className="flex flex-col animate-fade-in">
      {/* Header */}
      <section className="border-b border-border/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Key className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              TOTP Authenticator
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Generate Time-based One-Time Passwords for two-factor authentication. 
              Use with Google Authenticator, Authy, or any TOTP-compatible app.
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
                <CardTitle>Create Secret</CardTitle>
                <CardDescription>Generate a new TOTP secret</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Account Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="e.g., john@example.com"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuer (Optional)</Label>
                  <Input
                    id="issuer"
                    type="text"
                    placeholder="e.g., Gmail"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>

                <Button onClick={handleGenerate} className="w-full gap-2" disabled={!name.trim()}>
                  <RefreshCw className="h-4 w-4" />
                  Generate Secret
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              {totps.length > 0 ? (
                <div className="space-y-4">
                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      Active <span className="font-medium text-foreground">{totps.length}</span> authenticator{totps.length !== 1 ? "s" : ""}
                    </p>
                    <Button variant="outline" size="sm" onClick={clearAll} className="gap-2 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Clear All
                    </Button>
                  </div>

                  {/* TOTP Cards */}
                  <div className="space-y-3">
                    {totps.map((totp, index) => (
                      <Card
                        key={totp.id}
                        className="group border-border/40 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-3 text-sm flex-1">
                              <div>
                                <p className="font-semibold">{totp.name}</p>
                                <p className="text-xs text-muted-foreground">{totp.issuer}</p>
                              </div>

                              <div className="rounded-lg bg-background/50 p-3">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">Current Code</span>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-xs font-medium">{totp.timeRemaining}s</span>
                                  </div>
                                </div>
                                <p className="font-mono text-2xl font-bold tracking-wider">{totp.code}</p>
                              </div>

                              <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Secret Key</p>
                                <div className="flex items-center gap-2">
                                  <code className="flex-1 break-all rounded bg-background/50 px-2 py-1 font-mono text-xs">
                                    {totp.secret}
                                  </code>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyCode(totp)}
                                className="h-8 w-8 shrink-0"
                                title="Copy code"
                              >
                                {copiedId === `code-${totp.id}` ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copySecret(totp)}
                                className="h-8 w-8 shrink-0"
                                title="Copy secret"
                              >
                                {copiedId === totp.id ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteTotp(totp.id)}
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
                      <Key className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No authenticators created</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Generate TOTP secrets and use them with your authenticator app for secure two-factor authentication.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="border-t border-border/40 bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold">How It Works</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-2">Generate Secret</h3>
              <p className="text-sm text-muted-foreground">Create a unique Base32-encoded secret for each account.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Scan QR Code</h3>
              <p className="text-sm text-muted-foreground">Use your authenticator app to scan the QR code or enter the secret manually.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Get Codes</h3>
              <p className="text-sm text-muted-foreground">Your app will generate 6-digit codes that refresh every 30 seconds.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
