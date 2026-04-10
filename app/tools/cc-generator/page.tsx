"use client"

import * as React from "react"
import { CreditCard, Copy, RefreshCw, Check, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface CreditCard {
  id: string
  number: string
  holder: string
  expiry: string
  cvv: string
  brand: string
}

// Luhn algorithm to generate valid credit card numbers
function luhnChecksum(digits: number[]): number {
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
  return (10 - (sum % 10)) % 10
}

function generateValidCreditCard(brand: string): string {
  const prefixes: Record<string, { prefix: string; length: number }> = {
    visa: { prefix: "4", length: 16 },
    mastercard: { prefix: "5", length: 16 },
    amex: { prefix: "3", length: 15 },
    discover: { prefix: "6", length: 16 },
  }

  const { prefix, length } = prefixes[brand] || prefixes.visa
  const digits = prefix.split("").map(Number)

  // Generate random digits
  for (let i = digits.length; i < length - 1; i++) {
    digits.push(Math.floor(Math.random() * 10))
  }

  // Add luhn checksum
  digits.push(luhnChecksum(digits))

  return digits.join("")
}

function generateCreditCard(brand: string): CreditCard {
  const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael"]
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller"]
  const cardNumber = generateValidCreditCard(brand)
  const expMonth = String(Math.floor(1 + Math.random() * 12)).padStart(2, "0")
  const expYear = String(Math.floor(25 + Math.random() * 10))

  return {
    id: Math.random().toString(36).substring(2, 9),
    number: cardNumber,
    holder: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    expiry: `${expMonth}/${expYear}`,
    cvv: String(Math.floor(100 + Math.random() * 900)),
    brand: brand.charAt(0).toUpperCase() + brand.slice(1),
  }
}

export default function CCGeneratorPage() {
  const [cards, setCards] = React.useState<CreditCard[]>([])
  const [brand, setBrand] = React.useState("visa")
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  const handleGenerate = () => {
    const newCard = generateCreditCard(brand)
    setCards([...cards, newCard])
  }

  const copyCard = (card: CreditCard) => {
    const text = `${card.number}\n${card.holder}\n${card.expiry}\n${card.cvv}`
    navigator.clipboard.writeText(text)
    setCopiedId(card.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const deleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id))
  }

  const clearAll = () => {
    setCards([])
  }

  const maskNumber = (number: string) => {
    return `**** **** **** ${number.slice(-4)}`
  }

  return (
    <div className="flex flex-col animate-fade-in">
      {/* Header */}
      <section className="border-b border-border/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <CreditCard className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Credit Card Generator
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Generate realistic test credit card numbers using the Luhn algorithm. 
              Perfect for testing payment systems and development environments.
            </p>
            <Badge variant="secondary" className="mt-4">For Testing Only - Not Real Cards</Badge>
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
                <CardTitle>Settings</CardTitle>
                <CardDescription>Choose card brand and generate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Card Brand</Label>
                  <Select value={brand} onValueChange={setBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="mastercard">Mastercard</SelectItem>
                      <SelectItem value="amex">American Express</SelectItem>
                      <SelectItem value="discover">Discover</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleGenerate} className="w-full gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Generate Card
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              {cards.length > 0 ? (
                <div className="space-y-4">
                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      Generated <span className="font-medium text-foreground">{cards.length}</span> card{cards.length !== 1 ? "s" : ""}
                    </p>
                    <Button variant="outline" size="sm" onClick={clearAll} className="gap-2 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                      Clear All
                    </Button>
                  </div>

                  {/* Card List */}
                  <div className="space-y-3">
                    {cards.map((card, index) => (
                      <Card
                        key={card.id}
                        className="group border-border/40 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2 text-sm flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">{card.brand}</span>
                                <Badge variant="outline" className="text-xs">{card.expiry}</Badge>
                              </div>
                              <p className="font-mono text-base tracking-wider">{maskNumber(card.number)}</p>
                              <p className="text-muted-foreground">{card.holder}</p>
                              <p className="text-xs text-muted-foreground">CVV: {card.cvv}</p>
                              <p className="text-xs text-muted-foreground">Full: {card.number}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => copyCard(card)}
                                className="h-8 w-8 shrink-0"
                              >
                                {copiedId === card.id ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteCard(card.id)}
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
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No cards generated</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Click the generate button to create test credit cards for development and testing purposes.
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
              <h3 className="font-semibold mb-2">Luhn Algorithm</h3>
              <p className="text-sm text-muted-foreground">All generated cards are valid according to the Luhn algorithm used in real payment systems.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Testing Only</h3>
              <p className="text-sm text-muted-foreground">These are test cards for development environments. They won't work for real transactions.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Multiple Brands</h3>
              <p className="text-sm text-muted-foreground">Support for Visa, Mastercard, American Express, and Discover card formats.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
