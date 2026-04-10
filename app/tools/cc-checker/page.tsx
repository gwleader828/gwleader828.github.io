"use client"

import * as React from "react"
import { CheckCircle2, AlertCircle, Copy, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface ValidationResult {
  id: string
  number: string
  isValid: boolean
  brand: string
  message: string
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

export default function CCCheckerPage() {
  const [cardNumber, setCardNumber] = React.useState("")
  const [results, setResults] = React.useState<ValidationResult[]>([])
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  const handleCheck = () => {
    if (!cardNumber.trim()) return

    const cleanNumber = cardNumber.replace(/\D/g, "")
    const isValid = validateLuhn(cleanNumber)
    const brand = detectBrand(cleanNumber)

    const result: ValidationResult = {
      id: Math.random().toString(36).substring(2, 9),
      number: cardNumber,
      isValid,
      brand,
      message: isValid ? "Valid credit card number" : "Invalid credit card number",
    }

    setResults([result, ...results])
    setCardNumber("")
  }

  const copyResult = (result: ValidationResult) => {
    const text = `${result.number}\n${result.brand}\nStatus: ${result.isValid ? "Valid" : "Invalid"}`
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCheck()
    }
  }

  return (
    <div className="flex flex-col animate-fade-in">
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
              Validate credit card numbers using the Luhn algorithm. 
              Check card validity, detect brand, and verify card authenticity.
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
                <CardTitle>Validate Card</CardTitle>
                <CardDescription>Enter a credit card number to validate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="card-input">Card Number</Label>
                  <Input
                    id="card-input"
                    type="text"
                    placeholder="Enter card number..."
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="font-mono"
                  />
                  <p className="text-xs text-muted-foreground">Enter 13-19 digit card numbers</p>
                </div>

                <Button onClick={handleCheck} className="w-full gap-2" disabled={!cardNumber.trim()}>
                  <CheckCircle2 className="h-4 w-4" />
                  Validate Card
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              {results.length > 0 ? (
                <div className="space-y-4">
                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      Validated <span className="font-medium text-foreground">{results.length}</span> card{results.length !== 1 ? "s" : ""}
                    </p>
                    <Button variant="outline" size="sm" onClick={clearAll} className="gap-2 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Clear All
                    </Button>
                  </div>

                  {/* Results List */}
                  <div className="space-y-3">
                    {results.map((result, index) => (
                      <Card
                        key={result.id}
                        className="group border-border/40 transition-all duration-300 hover:border-border animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2 text-sm flex-1">
                              <div className="flex items-center gap-3">
                                {result.isValid ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 text-destructive" />
                                )}
                                <Badge
                                  variant={result.isValid ? "default" : "destructive"}
                                  className="text-xs"
                                >
                                  {result.isValid ? "Valid" : "Invalid"}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {result.brand}
                                </Badge>
                              </div>
                              <p className="font-mono text-base tracking-wide">{result.number}</p>
                              <p className="text-muted-foreground">{result.message}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
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
                      <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No cards validated</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Enter a credit card number to validate using the Luhn algorithm and detect the card brand.
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
          <h2 className="mb-8 text-center text-2xl font-bold">Card Brands Supported</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["Visa", "Mastercard", "American Express", "Discover"].map((brand) => (
              <div key={brand} className="rounded-lg border border-border/40 bg-card/50 p-4 text-center">
                <p className="font-semibold">{brand}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
