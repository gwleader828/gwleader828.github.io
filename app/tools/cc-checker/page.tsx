"use client"

import * as React from "react"
import { CheckCircle2, AlertCircle, Copy, Check, Trash2, Play, Square, Clock, Zap } from "lucide-react"
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
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [totalCards, setTotalCards] = React.useState(0)
  const [elapsedTime, setElapsedTime] = React.useState(0)
  const [startTime, setStartTime] = React.useState<number | null>(null)
  const isCheckingRef = React.useRef(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    let timer: NodeJS.Timeout
    if (isChecking && startTime) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
      }, 100)
    }
    return () => clearInterval(timer)
  }, [isChecking, startTime])

  const handleCheck = async () => {
    if (!pastInput.trim()) {
      alert("Please paste at least one card number")
      return
    }

    const parsedCards = parseCardData(pastInput)
    if (parsedCards.length === 0) {
      alert("No valid card numbers found")
      return
    }

    setIsChecking(true)
    isCheckingRef.current = true
    setStartTime(Date.now())
    setElapsedTime(0)
    setCurrentIndex(0)
    setTotalCards(parsedCards.length)
    setResults([]) // Clear previous results
    const newResults: ValidationResult[] = []

    for (let i = 0; i < parsedCards.length; i++) {
      if (!isCheckingRef.current) {
        console.log("[v0] Check stopped by user at card", i)
        break
      }
      
      const card = parsedCards[i]
      if (!card.number.trim()) continue
      
      const cleanNumber = card.number.replace(/\D/g, "")
      if (!cleanNumber) continue
      
      const isValid = validateLuhn(cleanNumber)
      const brand = detectBrand(cleanNumber)

      const newResult: ValidationResult = {
        id: Math.random().toString(36).substring(2, 9),
        number: cleanNumber,
        isValid,
        brand,
        message: isValid ? "✓ Valid Card" : "✗ Invalid Card",
        expiry: card.expiry,
        cvv: card.cvv,
      }

      newResults.push(newResult)
      setResults([...newResults])
      setCurrentIndex(i + 1)

      // 100ms delay between checks for real-time visual feedback
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    setPastInput("")
    setIsChecking(false)
    isCheckingRef.current = false
  }

  const handleStop = () => {
    console.log("[v0] Stop button clicked")
    isCheckingRef.current = false
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
    setFilterStatus("all")
  }

  const filteredResults = results.filter(r => {
    if (filterStatus === "live") return r.isValid
    if (filterStatus === "dead") return !r.isValid
    return true
  })

  const liveCount = results.filter(r => r.isValid).length
  const deadCount = results.filter(r => !r.isValid).length
  const remainingCards = totalCards - currentIndex
  const estimatedTimePerCard = elapsedTime > 0 ? elapsedTime / currentIndex : 0.1
  const estimatedTimeRemaining = Math.ceil(remainingCards * estimatedTimePerCard)

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
              Validate multiple credit card numbers at once using real Luhn algorithm validation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Input Panel */}
            <Card className="h-fit border-border/40 bg-card/50 backdrop-blur-sm lg:sticky lg:top-24 z-10">
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
                      variant="destructive"
                      className="gap-2"
                    >
                      <Square className="h-4 w-4" />
                      Stop
                    </Button>
                  )}
                </div>

                {/* Progress Info */}
                {isChecking && (
                  <div className="space-y-3 border-t border-border/40 pt-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Checked</span>
                        <span className="font-semibold">{currentIndex}/{totalCards}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{width: totalCards > 0 ? `${(currentIndex / totalCards) * 100}%` : '0%'}}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        <span>Time: {elapsedTime}s</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>~{estimatedTimeRemaining}s left</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              {results.length > 0 ? (
                <div className="space-y-4 animate-slide-up">
                  {/* Stats and Filter Bar */}
                  <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 rounded-lg bg-muted/40">
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="text-2xl font-bold">{results.length}</p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-green-500/10">
                            <p className="text-sm text-green-600">Live</p>
                            <p className="text-2xl font-bold text-green-500">{liveCount}</p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-red-500/10">
                            <p className="text-sm text-red-600">Dead</p>
                            <p className="text-2xl font-bold text-red-500">{deadCount}</p>
                          </div>
                        </div>

                        {/* Filter Tabs */}
                        <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as any)} className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="all">All ({results.length})</TabsTrigger>
                            <TabsTrigger value="live" className="text-green-600">Live ({liveCount})</TabsTrigger>
                            <TabsTrigger value="dead" className="text-red-600">Dead ({deadCount})</TabsTrigger>
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
                                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                      <Badge className="text-xs bg-green-600 hover:bg-green-700">Live</Badge>
                                    </>
                                  ) : (
                                    <>
                                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                      <Badge variant="destructive" className="text-xs">Dead</Badge>
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 font-mono text-xs break-all">{result.number}</td>
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
                      Paste multiple credit card numbers above and click "Start Check" to validate them. Live cards show green, dead cards show red.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
