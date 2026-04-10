"use client"

import * as React from "react"
import { CheckCircle2, AlertCircle, Copy, Check, Trash2, Play, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ValidationResult {
  id: string
  number: string
  isValid: boolean
  brand: string
  message: string
  cvv?: string
  expiry?: string
}

// Luhn algorithm validation
function validateLuhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "").split("").map(Number)
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let isEven = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i]
    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    isEven = !isEven
  }
  return sum % 10 === 0
}

function detectBrand(cardNumber: string): string {
  const num = cardNumber.replace(/\D/g, "")
  if (/^4/.test(num)) return "Visa"
  if (/^5[1-5]/.test(num)) return "Mastercard"
  if (/^3[47]/.test(num)) return "American Express"
  if (/^6(?:011|5)/.test(num)) return "Discover"
  if (/^30[0-5]/.test(num)) return "Diners Club"
  if (/^35/.test(num)) return "JCB"
  return "Unknown"
}

function parseCardData(input: string): Omit<ValidationResult, 'id' | 'isValid' | 'brand' | 'message'>[] {
  const lines = input.split('\n').filter(line => line.trim())
  return lines.map(line => {
    // Try to parse different formats: card|expiry|cvv or just card
    const parts = line.split(/[\s\|,\t]+/).filter(p => p.trim())
    return {
      number: parts[0] || '',
      expiry: parts[1],
      cvv: parts[2],
    }
  })
}

export default function CCCheckerPage() {
  const [pastInput, setPastInput] = React.useState("")
  const [results, setResults] = React.useState<ValidationResult[]>([])
  const [isChecking, setIsChecking] = React.useState(false)
  const [filterStatus, setFilterStatus] = React.useState<"all" | "live" | "dead">("all")
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleCheck = async () => {
    if (!pastInput.trim()) {
      alert("Please paste at least one card number")
      return
    }

    setIsChecking(true)
    const parsedCards = parseCardData(pastInput)
    const newResults: ValidationResult[] = []

    // Simulate checking with slight delay for better UX
    for (const card of parsedCards) {
      if (!card.number.trim()) continue
      
      const cleanNumber = card.number.replace(/\D/g, "")
      const isValid = validateLuhn(cleanNumber)
      const brand = detectBrand(cleanNumber)

      newResults.push({
        id: Math.random().toString(36).substring(2, 9),
        number: card.number,
        isValid,
        brand,
        message: isValid ? "Valid - Live Card" : "Invalid - Dead Card",
        expiry: card.expiry,
        cvv: card.cvv,
      })

      // Small delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    setResults(newResults)
    setPastInput("")
    setIsChecking(false)
  }

  const handleStop = () => {
    setIsChecking(false)
  }

  const copyResult = (result: ValidationResult) => {
    const text = `${result.number}${result.expiry ? `|${result.expiry}` : ''}${result.cvv ? `|${result.cvv}` : ''}`
    navigator.clipboard.writeText(text)
    setCopiedId(result.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const deleteResult = (id: string) => {
    setResults(results.filter((r) => r.id !== id))
  }

  const clearAll = () => {
    setResults([])
  }

  const filteredResults = results.filter(r => {
    if (filterStatus === "live") return r.isValid
    if (filterStatus === "dead") return !r.isValid
    return true
  })

  const liveCount = results.filter(r => r.isValid).length
  const deadCount = results.filter(r => !r.isValid).length

  if (!mounted) return null

  return (
    <div className="flex flex-col animate-fade-in overflow-y-scroll">
      {/* Header */}
      <section className="border-b border-border/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <CheckCircle2 className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Credit Card Validator
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Validate multiple credit card numbers at once. Paste all cards and check live/dead status.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Input Panel */}
            <Card className="h-fit border-border/40 bg-card/50 backdrop-blur-sm lg:sticky lg:top-24">
              <CardHeader>
                <CardTitle>Validate Cards</CardTitle>
                <CardDescription>Paste multiple card numbers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cards-input">Card Numbers</Label>
                  <Textarea
                    id="cards-input"
                    placeholder="Paste card numbers (one per line)&#10;Format: card_number [expiry] [cvv]&#10;&#10;Examples:&#10;4532015112830366&#10;5425233010103442|12/26|123&#10;378282246310005|10/25|1234"
                    value={pastInput}
                    onChange={(e) => setPastInput(e.target.value)}
                    className="font-mono text-sm min-h-[200px] resize-none"
                    disabled={isChecking}
                  />
                  <p className="text-xs text-muted-foreground">
                    One per line. Optional: card|expiry|cvv format
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleCheck}
                    className="flex-1 gap-2"
                    disabled={isChecking || !pastInput.trim()}
                  >
                    <Play className="h-4 w-4" />
                    {isChecking ? "Checking..." : "Start Check"}
                  </Button>
                  {isChecking && (
                    <Button
                      onClick={handleStop}
                      variant="outline"
                      className="gap-2"
                    >
                      <Square className="h-4 w-4" />
                      Stop
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              {results.length > 0 ? (
                <div className="space-y-4 animate-slide-up">
                  {/* Stats and Filter Bar */}
                  <Card className="border-border/40 bg-card/50">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="text-2xl font-bold">{results.length}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-green-600">Live</p>
                            <p className="text-2xl font-bold text-green-500">{liveCount}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-red-600">Dead</p>
                            <p className="text-2xl font-bold text-destructive">{deadCount}</p>
                          </div>
                        </div>

                        {/* Filter Tabs */}
                        <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)} className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="all">All ({results.length})</TabsTrigger>
                            <TabsTrigger value="live">Live ({liveCount})</TabsTrigger>
                            <TabsTrigger value="dead">Dead ({deadCount})</TabsTrigger>
                          </TabsList>
                        </Tabs>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={clearAll}
                            className="flex-1 gap-2 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            Clear All
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Results Table */}
                  <Card className="border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="border-b border-border/40 bg-muted/50">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold">Status</th>
                            <th className="px-4 py-3 text-left font-semibold">Card Number</th>
                            <th className="px-4 py-3 text-left font-semibold">Brand</th>
                            <th className="px-4 py-3 text-left font-semibold">Expiry</th>
                            <th className="px-4 py-3 text-left font-semibold">CVV</th>
                            <th className="px-4 py-3 text-center font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                          {filteredResults.map((result, index) => (
                            <tr
                              key={result.id}
                              className="transition-colors hover:bg-muted/40"
                              style={{ animation: `slideUp 0.3s ease-out ${index * 30}ms forwards`, opacity: 0 }}
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  {result.isValid ? (
                                    <>
                                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                                      <Badge variant="default" className="text-xs bg-green-600">Live</Badge>
                                    </>
                                  ) : (
                                    <>
                                      <AlertCircle className="h-4 w-4 text-destructive" />
                                      <Badge variant="destructive" className="text-xs">Dead</Badge>
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 font-mono text-xs">{result.number}</td>
                              <td className="px-4 py-3">
                                <Badge variant="outline" className="text-xs">{result.brand}</Badge>
                              </td>
                              <td className="px-4 py-3 text-xs text-muted-foreground">{result.expiry || "-"}</td>
                              <td className="px-4 py-3 text-xs text-muted-foreground">{result.cvv || "-"}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => copyResult(result)}
                                    className="h-8 w-8 shrink-0"
                                  >
                                    {copiedId === result.id ? (
                                      <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteResult(result.id)}
                                    className="h-8 w-8 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              ) : (
                <Card className="border-dashed border-border/40 bg-card/30">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No cards checked yet</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Paste multiple credit card numbers above and click "Start Check" to validate them all at once.
                      Live cards will be marked with a green badge, dead cards with red.
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
          <h2 className="mb-8 text-center text-2xl font-bold">Batch Validation Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-2">Bulk Check</h3>
              <p className="text-sm text-muted-foreground">Check unlimited cards at once using Luhn algorithm</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Live/Dead Filter</h3>
              <p className="text-sm text-muted-foreground">Separate valid from invalid cards instantly</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Brand Detection</h3>
              <p className="text-sm text-muted-foreground">Auto-detect Visa, Mastercard, Amex, and more</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Flexible Format</h3>
              <p className="text-sm text-muted-foreground">Paste cards with optional expiry and CVV data</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Real-time Stats</h3>
              <p className="text-sm text-muted-foreground">See live/dead card count updated instantly</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Copy Individual</h3>
              <p className="text-sm text-muted-foreground">Copy any card with its metadata to clipboard</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
