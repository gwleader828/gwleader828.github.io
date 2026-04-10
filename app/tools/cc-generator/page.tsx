"use client"

import * as React from "react"
import { CreditCard, Copy, RefreshCw, Check, Trash2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

interface GeneratedCard {
  id: string
  bin: string
  brand: string
  expiryDate: string
  expiryYear: string
  cvv: string
}

// BIN database for auto-detection
const BIN_DATA: Record<string, string> = {
  "4": "Visa",
  "5": "Mastercard",
  "3": "American Express",
  "6": "Discover",
}

// Luhn algorithm
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

function generateValidBIN(brand: string): string {
  const prefixes: Record<string, string> = {
    visa: "4",
    mastercard: "5",
    amex: "3",
    discover: "6",
  }
  const prefix = prefixes[brand] || "4"
  const bin = prefix + Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join("")
  return bin
}

function detectCardBrand(bin: string): string {
  if (!bin) return "Unknown"
  const firstDigit = bin[0]
  return BIN_DATA[firstDigit] || "Unknown"
}

function generateCards(
  bin: string,
  quantity: number,
  expiryDateMode: "random" | "custom",
  customExpiryDate: string,
  expiryYearMode: "random" | "custom",
  customExpiryYear: string,
  cvvMode: "random" | "custom",
  customCVV: string
): GeneratedCard[] {
  const cards: GeneratedCard[] = []
  
  for (let i = 0; i < quantity; i++) {
    const currentBin = bin || generateValidBIN("visa")
    const brand = detectCardBrand(currentBin)
    
    const expiryDate = expiryDateMode === "custom" ? customExpiryDate : String(Math.floor(1 + Math.random() * 12)).padStart(2, "0")
    const expiryYear = expiryYearMode === "custom" ? customExpiryYear : String(Math.floor(25 + Math.random() * 10))
    const cvv = cvvMode === "custom" ? customCVV : String(Math.floor(100 + Math.random() * 900))
    
    cards.push({
      id: Math.random().toString(36).substring(2, 9),
      bin: currentBin,
      brand,
      expiryDate: expiryDate.padStart(2, "0"),
      expiryYear,
      cvv,
    })
  }
  
  return cards
}

export default function CCGeneratorPage() {
  const [bin, setBin] = React.useState("")
  const [autoDetectedBrand, setAutoDetectedBrand] = React.useState("Unknown")
  const [quantity, setQuantity] = React.useState("5")
  const [expiryDateMode, setExpiryDateMode] = React.useState<"random" | "custom">("random")
  const [customExpiryDate, setCustomExpiryDate] = React.useState("01")
  const [expiryYearMode, setExpiryYearMode] = React.useState<"random" | "custom">("random")
  const [customExpiryYear, setCustomExpiryYear] = React.useState("25")
  const [cvvMode, setCvvMode] = React.useState<"random" | "custom">("random")
  const [customCVV, setCustomCVV] = React.useState("123")
  const [cards, setCards] = React.useState<GeneratedCard[]>([])
  const [copied, setCopied] = React.useState(false)

  const handleBinChange = (value: string) => {
    setBin(value)
    setAutoDetectedBrand(detectCardBrand(value))
  }

  const handleGenerate = () => {
    if (quantity === "" || parseInt(quantity) <= 0) {
      alert("Please enter a valid quantity")
      return
    }
    
    const qty = Math.min(parseInt(quantity), 1000)
    const generated = generateCards(
      bin,
      qty,
      expiryDateMode,
      customExpiryDate,
      expiryYearMode,
      customExpiryYear,
      cvvMode,
      customCVV
    )
    setCards(generated)
  }

  const downloadCards = () => {
    if (cards.length === 0) return
    
    let csv = "BIN,Card Type,Expiry Date,Expiry Year,CVV\n"
    cards.forEach((card) => {
      csv += `${card.bin},${card.brand},${card.expiryDate},${card.expiryYear},${card.cvv}\n`
    })
    
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `credit-cards-${Date.now()}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const copyAll = () => {
    if (cards.length === 0) return
    
    const text = cards
      .map((card) => `${card.bin}\t${card.expiryDate}\t${card.expiryYear}\t${card.cvv}`)
      .join("\n")
    
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setCards([])
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
              Generate test credit card numbers with custom BIN, expiry dates, and CVVs. Perfect for development and testing.
            </p>
            <Badge variant="secondary" className="mt-4">For Testing Only - Not Real Cards</Badge>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Settings Panel */}
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm lg:col-span-1 h-fit">
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>Set your card parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* BIN Input */}
                <div className="space-y-2">
                  <Label htmlFor="bin">BIN (Optional)</Label>
                  <Input
                    id="bin"
                    placeholder="e.g., 453786"
                    value={bin}
                    onChange={(e) => handleBinChange(e.target.value)}
                    maxLength={6}
                    className="font-mono"
                  />
                  <div className="text-xs text-muted-foreground">
                    Auto-detect: <span className="font-semibold text-foreground">{autoDetectedBrand}</span>
                  </div>
                </div>

                {/* Expiry Date */}
                <div className="space-y-3">
                  <Label>Expiry Date (MM)</Label>
                  <RadioGroup value={expiryDateMode} onValueChange={(v) => setExpiryDateMode(v as "random" | "custom")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="random" id="expiry-random" />
                      <Label htmlFor="expiry-random" className="text-sm font-normal cursor-pointer">Random</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="expiry-custom" />
                      <Label htmlFor="expiry-custom" className="text-sm font-normal cursor-pointer">Custom</Label>
                    </div>
                  </RadioGroup>
                  {expiryDateMode === "custom" && (
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      placeholder="01-12"
                      value={customExpiryDate}
                      onChange={(e) => setCustomExpiryDate(e.target.value)}
                      className="text-sm"
                    />
                  )}
                </div>

                {/* Expiry Year */}
                <div className="space-y-3">
                  <Label>Expiry Year (YY)</Label>
                  <RadioGroup value={expiryYearMode} onValueChange={(v) => setExpiryYearMode(v as "random" | "custom")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="random" id="year-random" />
                      <Label htmlFor="year-random" className="text-sm font-normal cursor-pointer">Random</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="year-custom" />
                      <Label htmlFor="year-custom" className="text-sm font-normal cursor-pointer">Custom</Label>
                    </div>
                  </RadioGroup>
                  {expiryYearMode === "custom" && (
                    <Input
                      type="number"
                      placeholder="25"
                      value={customExpiryYear}
                      onChange={(e) => setCustomExpiryYear(e.target.value)}
                      maxLength={2}
                      className="text-sm"
                    />
                  )}
                </div>

                {/* CVV */}
                <div className="space-y-3">
                  <Label>CVV</Label>
                  <RadioGroup value={cvvMode} onValueChange={(v) => setCvvMode(v as "random" | "custom")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="random" id="cvv-random" />
                      <Label htmlFor="cvv-random" className="text-sm font-normal cursor-pointer">Random</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="cvv-custom" />
                      <Label htmlFor="cvv-custom" className="text-sm font-normal cursor-pointer">Custom</Label>
                    </div>
                  </RadioGroup>
                  {cvvMode === "custom" && (
                    <Input
                      type="number"
                      placeholder="123"
                      value={customCVV}
                      onChange={(e) => setCustomCVV(e.target.value)}
                      maxLength={4}
                      className="text-sm"
                    />
                  )}
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (Max 1000)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="1000"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                {/* Generate Button */}
                <Button onClick={handleGenerate} className="w-full gap-2 h-10">
                  <RefreshCw className="h-4 w-4" />
                  Generate Cards
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="lg:col-span-3">
              {cards.length > 0 ? (
                <div className="space-y-4 animate-slide-up">
                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Generated <span className="font-bold text-foreground text-base">{cards.length}</span> card{cards.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="sm" onClick={copyAll} className="gap-2">
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy All
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadCards} className="gap-2">
                        <Download className="h-4 w-4" />
                        Download CSV
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearAll} 
                        className="gap-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        Clear
                      </Button>
                    </div>
                  </div>

                  {/* Table */}
                  <Card className="border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="border-b border-border/40 bg-muted/50">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold">BIN</th>
                            <th className="px-4 py-3 text-left font-semibold">Card Type</th>
                            <th className="px-4 py-3 text-left font-semibold">Expiry Date</th>
                            <th className="px-4 py-3 text-left font-semibold">Expiry Year</th>
                            <th className="px-4 py-3 text-left font-semibold">CVV</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                          {cards.map((card, index) => (
                            <tr 
                              key={card.id} 
                              className="transition-colors hover:bg-muted/30"
                              style={{ animation: `slideUp 0.3s ease-out ${index * 30}ms forwards`, opacity: 0 }}
                            >
                              <td className="px-4 py-3 font-mono text-foreground">{card.bin}</td>
                              <td className="px-4 py-3">
                                <Badge variant="secondary">{card.brand}</Badge>
                              </td>
                              <td className="px-4 py-3 font-mono">{card.expiryDate}</td>
                              <td className="px-4 py-3 font-mono">{card.expiryYear}</td>
                              <td className="px-4 py-3 font-mono">{card.cvv}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
              ) : (
                <Card className="border-dashed border-border/40 bg-card/30">
                  <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No cards generated yet</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Configure your card parameters on the left and click "Generate Cards" to create test credit cards.
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
          <h2 className="mb-8 text-center text-2xl font-bold">Features</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold mb-2">Auto BIN Detection</h3>
              <p className="text-sm text-muted-foreground">Automatically detects card brand from BIN numbers.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Custom Expiry</h3>
              <p className="text-sm text-muted-foreground">Choose random or custom expiry dates and years.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Custom CVV</h3>
              <p className="text-sm text-muted-foreground">Set random or fixed CVV values for your tests.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Bulk Export</h3>
              <p className="text-sm text-muted-foreground">Download as CSV or copy all cards to clipboard.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
