"use client"

import * as React from "react"
import { CreditCard, Copy, RefreshCw, Check, Trash2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface GeneratedCard {
  id: string
  bin: string
  fullCard: string
  brand: string
  expiryDate: string
  expiryYear: string
  cvv: string
}

// BIN database for auto-detection
const BIN_PREFIXES: Record<string, { brand: string; length: number }> = {
  "4": { brand: "Visa", length: 16 },
  "5": { brand: "Mastercard", length: 16 },
  "34": { brand: "American Express", length: 15 },
  "37": { brand: "American Express", length: 15 },
  "6": { brand: "Discover", length: 16 },
}

function detectCardBrand(bin: string): { brand: string; length: number } {
  if (!bin) return { brand: "Unknown", length: 16 }
  
  // Check longer prefixes first
  if (bin.length >= 2 && BIN_PREFIXES[bin.substring(0, 2)]) {
    return BIN_PREFIXES[bin.substring(0, 2)]
  }
  
  if (BIN_PREFIXES[bin[0]]) {
    return BIN_PREFIXES[bin[0]]
  }
  
  return { brand: "Unknown", length: 16 }
}

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

function generateFullCardNumber(bin: string): string {
  const { length } = detectCardBrand(bin)
  const remainingLength = length - bin.length - 1 // -1 for check digit
  
  let cardDigits = bin.split("").map(Number)
  
  // Generate random middle digits
  for (let i = 0; i < remainingLength; i++) {
    cardDigits.push(Math.floor(Math.random() * 10))
  }
  
  // Calculate check digit using Luhn algorithm
  const checkDigit = luhnChecksum(cardDigits)
  cardDigits.push(checkDigit)
  
  return cardDigits.join("")
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
    const fullCard = generateFullCardNumber(bin)
    const brandInfo = detectCardBrand(bin)
    
    const expiryDate = expiryDateMode === "custom" ? customExpiryDate : String(Math.floor(1 + Math.random() * 12)).padStart(2, "0")
    const expiryYear = expiryYearMode === "custom" ? customExpiryYear : String(Math.floor(25 + Math.random() * 10))
    const cvv = cvvMode === "custom" ? customCVV : String(Math.floor(100 + Math.random() * 900))
    
    cards.push({
      id: Math.random().toString(36).substring(2, 9),
      bin: bin,
      fullCard: fullCard,
      brand: brandInfo.brand,
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
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleBinChange = (value: string) => {
    // Only allow digits and limit to 16
    const filtered = value.replace(/\D/g, "").slice(0, 16)
    setBin(filtered)
    if (filtered.length >= 2) {
      const brandInfo = detectCardBrand(filtered)
      setAutoDetectedBrand(brandInfo.brand)
    } else {
      setAutoDetectedBrand("Unknown")
    }
  }

  const handleGenerate = () => {
    if (!bin) {
      alert("Please enter a BIN (2-16 digits)")
      return
    }
    
    if (bin.length < 2) {
      alert("BIN must be at least 2 digits")
      return
    }

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
    
    let csv = "BIN,Full Card,Card Type,Expiry Date,Expiry Year,CVV\n"
    cards.forEach((card) => {
      csv += `${card.bin},${card.fullCard},${card.brand},${card.expiryDate},${card.expiryYear},${card.cvv}\n`
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
      .map((card) => `${card.bin}\t${card.fullCard}\t${card.expiryDate}\t${card.expiryYear}\t${card.cvv}`)
      .join("\n")
    
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setCards([])
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col animate-fade-in overflow-y-scroll">
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
              Generate test credit card numbers from BIN. Just enter the BIN (2-16 digits) and we'll generate full valid cards.
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
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm lg:col-span-1 h-fit sticky top-20 z-10">
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
                <CardDescription>Set your card parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* BIN Input */}
                <div className="space-y-2">
                  <Label htmlFor="bin">BIN (2-16 Digits)*</Label>
                  <Input
                    id="bin"
                    placeholder="e.g., 453786"
                    value={bin}
                    onChange={(e) => handleBinChange(e.target.value)}
                    maxLength={16}
                    className="font-mono text-base"
                  />
                  <div className="text-xs text-muted-foreground">
                    Card Type: <span className="font-semibold text-foreground">{autoDetectedBrand}</span>
                  </div>
                </div>

                {/* Expiry Date */}
                <div className="space-y-3">
                  <Label>Expiry Date (MM)</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={expiryDateMode === "random" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExpiryDateMode("random")}
                      className="flex-1 transition-all duration-200"
                    >
                      Random
                    </Button>
                    <Button
                      variant={expiryDateMode === "custom" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExpiryDateMode("custom")}
                      className="flex-1 transition-all duration-200"
                    >
                      Custom
                    </Button>
                  </div>
                  {expiryDateMode === "custom" && (
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      placeholder="01-12"
                      value={customExpiryDate}
                      onChange={(e) => setCustomExpiryDate(e.target.value)}
                      className="text-sm font-mono"
                    />
                  )}
                </div>

                {/* Expiry Year */}
                <div className="space-y-3">
                  <Label>Expiry Year (YY)</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={expiryYearMode === "random" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExpiryYearMode("random")}
                      className="flex-1 transition-all duration-200"
                    >
                      Random
                    </Button>
                    <Button
                      variant={expiryYearMode === "custom" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExpiryYearMode("custom")}
                      className="flex-1 transition-all duration-200"
                    >
                      Custom
                    </Button>
                  </div>
                  {expiryYearMode === "custom" && (
                    <Input
                      type="number"
                      placeholder="25"
                      value={customExpiryYear}
                      onChange={(e) => setCustomExpiryYear(e.target.value)}
                      maxLength={2}
                      className="text-sm font-mono"
                    />
                  )}
                </div>

                {/* CVV */}
                <div className="space-y-3">
                  <Label>CVV</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={cvvMode === "random" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCvvMode("random")}
                      className="flex-1 transition-all duration-200"
                    >
                      Random
                    </Button>
                    <Button
                      variant={cvvMode === "custom" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCvvMode("custom")}
                      className="flex-1 transition-all duration-200"
                    >
                      Custom
                    </Button>
                  </div>
                  {cvvMode === "custom" && (
                    <Input
                      type="number"
                      placeholder="123"
                      value={customCVV}
                      onChange={(e) => setCustomCVV(e.target.value)}
                      maxLength={4}
                      className="text-sm font-mono"
                    />
                  )}
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (Max 1000)*</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="1000"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="font-mono"
                  />
                </div>

                {/* Generate Button */}
                <Button onClick={handleGenerate} className="w-full gap-2 h-11 text-base font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-200">
                  <RefreshCw className="h-5 w-5" />
                  Generate Cards
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="lg:col-span-3">
              {cards.length > 0 ? (
                <div className="space-y-4 animate-slide-up">
                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 p-4 bg-card/50 rounded-lg border border-border/40">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Generated <span className="font-bold text-foreground text-base">{cards.length}</span> card{cards.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button variant="outline" size="sm" onClick={copyAll} className="gap-2 hover:bg-primary/10 hover:text-primary">
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
                      <Button variant="outline" size="sm" onClick={downloadCards} className="gap-2 hover:bg-primary/10 hover:text-primary">
                        <Download className="h-4 w-4" />
                        Download CSV
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearAll} 
                        className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
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
                            <th className="px-4 py-3 text-left font-semibold">Full Card</th>
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
                              className="transition-colors hover:bg-muted/40"
                              style={{ animation: `slideUp 0.3s ease-out ${index * 30}ms forwards`, opacity: 0 }}
                            >
                              <td className="px-4 py-3 font-mono text-sm text-foreground">{card.bin}</td>
                              <td className="px-4 py-3 font-mono text-sm text-foreground">{card.fullCard}</td>
                              <td className="px-4 py-3">
                                <Badge variant="secondary" className="text-xs">{card.brand}</Badge>
                              </td>
                              <td className="px-4 py-3 font-mono text-sm">{card.expiryDate}</td>
                              <td className="px-4 py-3 font-mono text-sm">{card.expiryYear}</td>
                              <td className="px-4 py-3 font-mono text-sm">{card.cvv}</td>
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
                      Enter a BIN (2-16 digits), configure your options, and click "Generate Cards" to create test credit cards.
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
              <h3 className="font-semibold mb-2">1. Enter BIN</h3>
              <p className="text-sm text-muted-foreground">Provide a Bank Identification Number (2-16 digits)</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Auto Detection</h3>
              <p className="text-sm text-muted-foreground">Card brand is detected automatically (Visa, Mastercard, etc)</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. Custom Options</h3>
              <p className="text-sm text-muted-foreground">Choose random or custom expiry dates and CVV values</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4. Generate</h3>
              <p className="text-sm text-muted-foreground">Generate full valid card numbers using Luhn algorithm</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">5. Export</h3>
              <p className="text-sm text-muted-foreground">Download as CSV or copy all cards to clipboard</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">6. Test</h3>
              <p className="text-sm text-muted-foreground">Use for development and testing purposes only</p>
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
