"use client"

import * as React from "react"
import { MapPin, Copy, RefreshCw, Check, Download, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

// Address data for different countries
const addressData = {
  us: {
    streets: ["Oak Street", "Maple Avenue", "Cedar Lane", "Pine Road", "Elm Boulevard", "Birch Drive", "Walnut Way", "Cherry Court", "Willow Place", "Spruce Terrace", "Hickory Lane", "Ash Street", "Poplar Avenue", "Cypress Road", "Magnolia Drive"],
    cities: ["Springfield", "Riverside", "Georgetown", "Franklin", "Clinton", "Madison", "Chester", "Salem", "Greenville", "Bristol", "Fairview", "Manchester", "Oakland", "Burlington", "Ashland"],
    states: [
      { name: "California", abbr: "CA" },
      { name: "Texas", abbr: "TX" },
      { name: "Florida", abbr: "FL" },
      { name: "New York", abbr: "NY" },
      { name: "Illinois", abbr: "IL" },
      { name: "Pennsylvania", abbr: "PA" },
      { name: "Ohio", abbr: "OH" },
      { name: "Georgia", abbr: "GA" },
      { name: "North Carolina", abbr: "NC" },
      { name: "Michigan", abbr: "MI" },
    ],
    zipFormat: () => String(Math.floor(10000 + Math.random() * 90000)),
  },
  uk: {
    streets: ["High Street", "Station Road", "Church Lane", "Victoria Road", "Green Lane", "Manor Road", "Park Avenue", "Queens Road", "Kings Road", "Mill Lane", "The Crescent", "School Lane", "London Road", "Chapel Street", "Bridge Street"],
    cities: ["London", "Manchester", "Birmingham", "Leeds", "Liverpool", "Bristol", "Sheffield", "Newcastle", "Nottingham", "Southampton", "Leicester", "Edinburgh", "Glasgow", "Cardiff", "Belfast"],
    states: [
      { name: "England", abbr: "ENG" },
      { name: "Scotland", abbr: "SCO" },
      { name: "Wales", abbr: "WAL" },
      { name: "Northern Ireland", abbr: "NI" },
    ],
    zipFormat: () => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      return `${letters[Math.floor(Math.random() * 26)]}${letters[Math.floor(Math.random() * 26)]}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${letters[Math.floor(Math.random() * 26)]}${letters[Math.floor(Math.random() * 26)]}`
    },
  },
  ca: {
    streets: ["Rue Principale", "Avenue du Parc", "Boulevard Saint-Laurent", "Chemin de la Côte", "Rue Sainte-Catherine", "Avenue des Pins", "Rue Saint-Denis", "Boulevard René-Lévesque", "Rue Sherbrooke", "Avenue du Mont-Royal"],
    cities: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Victoria"],
    states: [
      { name: "Ontario", abbr: "ON" },
      { name: "Quebec", abbr: "QC" },
      { name: "British Columbia", abbr: "BC" },
      { name: "Alberta", abbr: "AB" },
      { name: "Manitoba", abbr: "MB" },
      { name: "Saskatchewan", abbr: "SK" },
    ],
    zipFormat: () => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      return `${letters[Math.floor(Math.random() * 26)]}${Math.floor(Math.random() * 10)}${letters[Math.floor(Math.random() * 26)]} ${Math.floor(Math.random() * 10)}${letters[Math.floor(Math.random() * 26)]}${Math.floor(Math.random() * 10)}`
    },
  },
  au: {
    streets: ["George Street", "King Street", "Queen Street", "Elizabeth Street", "Collins Street", "Flinders Street", "Bourke Street", "Pitt Street", "William Street", "Market Street"],
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle", "Hobart", "Darwin"],
    states: [
      { name: "New South Wales", abbr: "NSW" },
      { name: "Victoria", abbr: "VIC" },
      { name: "Queensland", abbr: "QLD" },
      { name: "Western Australia", abbr: "WA" },
      { name: "South Australia", abbr: "SA" },
      { name: "Tasmania", abbr: "TAS" },
    ],
    zipFormat: () => String(Math.floor(1000 + Math.random() * 9000)),
  },
  de: {
    streets: ["Hauptstraße", "Bahnhofstraße", "Schulstraße", "Gartenstraße", "Dorfstraße", "Bergstraße", "Kirchstraße", "Waldstraße", "Ringstraße", "Parkstraße"],
    cities: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Leipzig", "Dortmund", "Essen"],
    states: [
      { name: "Bavaria", abbr: "BY" },
      { name: "North Rhine-Westphalia", abbr: "NW" },
      { name: "Baden-Württemberg", abbr: "BW" },
      { name: "Lower Saxony", abbr: "NI" },
      { name: "Hesse", abbr: "HE" },
    ],
    zipFormat: () => String(Math.floor(10000 + Math.random() * 90000)),
  },
}

const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Emma", "Oliver", "Ava", "Noah", "Sophia"]
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris"]

interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  stateAbbr: string
  zip: string
  country: string
  phone: string
}

function generatePhone(country: string): string {
  const formats: Record<string, () => string> = {
    us: () => `+1 (${Math.floor(200 + Math.random() * 800)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
    uk: () => `+44 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(100000 + Math.random() * 900000)}`,
    ca: () => `+1 (${Math.floor(200 + Math.random() * 800)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
    au: () => `+61 ${Math.floor(400 + Math.random() * 100)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`,
    de: () => `+49 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
  }
  return formats[country]?.() || formats.us()
}

function generateAddress(country: string, includeName: boolean, includePhone: boolean): Address {
  const data = addressData[country as keyof typeof addressData] || addressData.us
  const streetNum = Math.floor(1 + Math.random() * 9999)
  const street = data.streets[Math.floor(Math.random() * data.streets.length)]
  const city = data.cities[Math.floor(Math.random() * data.cities.length)]
  const state = data.states[Math.floor(Math.random() * data.states.length)]
  
  const countryNames: Record<string, string> = {
    us: "United States",
    uk: "United Kingdom",
    ca: "Canada",
    au: "Australia",
    de: "Germany",
  }

  return {
    id: Math.random().toString(36).substring(2, 9),
    name: includeName ? `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}` : "",
    street: `${streetNum} ${street}`,
    city,
    state: state.name,
    stateAbbr: state.abbr,
    zip: data.zipFormat(),
    country: countryNames[country] || "United States",
    phone: includePhone ? generatePhone(country) : "",
  }
}

export default function AddressGeneratorPage() {
  const [addresses, setAddresses] = React.useState<Address[]>([])
  const [country, setCountry] = React.useState("us")
  const [quantity, setQuantity] = React.useState([1])
  const [includeName, setIncludeName] = React.useState(true)
  const [includePhone, setIncludePhone] = React.useState(true)
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  const handleGenerate = () => {
    const newAddresses = Array.from({ length: quantity[0] }, () => 
      generateAddress(country, includeName, includePhone)
    )
    setAddresses(newAddresses)
  }

  const copyAddress = (address: Address) => {
    const text = [
      address.name,
      address.street,
      `${address.city}, ${address.stateAbbr} ${address.zip}`,
      address.country,
      address.phone,
    ].filter(Boolean).join("\n")
    
    navigator.clipboard.writeText(text)
    setCopiedId(address.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const copyAll = () => {
    const text = addresses.map(address => 
      [
        address.name,
        address.street,
        `${address.city}, ${address.stateAbbr} ${address.zip}`,
        address.country,
        address.phone,
      ].filter(Boolean).join("\n")
    ).join("\n\n---\n\n")
    
    navigator.clipboard.writeText(text)
    setCopiedId("all")
    setTimeout(() => setCopiedId(null), 2000)
  }

  const downloadAsJson = () => {
    const blob = new Blob([JSON.stringify(addresses, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "addresses.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearAll = () => {
    setAddresses([])
  }

  return (
    <div className="flex flex-col animate-fade-in">
      {/* Header */}
      <section className="border-b border-border/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Address Generator
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Generate realistic random addresses for testing, development, and data mocking. 
              Perfect for forms, databases, and application testing.
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
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your address generation options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Country Selection */}
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantity */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Quantity</Label>
                    <span className="text-sm font-medium text-primary">{quantity[0]}</span>
                  </div>
                  <Slider
                    value={quantity}
                    onValueChange={setQuantity}
                    min={1}
                    max={10}
                    step={1}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>

                {/* Include Options */}
                <div className="space-y-4">
                  <Label>Include Fields</Label>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-name" className="text-sm font-normal text-muted-foreground">
                      Full Name
                    </Label>
                    <Switch
                      id="include-name"
                      checked={includeName}
                      onCheckedChange={setIncludeName}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-phone" className="text-sm font-normal text-muted-foreground">
                      Phone Number
                    </Label>
                    <Switch
                      id="include-phone"
                      checked={includePhone}
                      onCheckedChange={setIncludePhone}
                    />
                  </div>
                </div>

                {/* Generate Button */}
                <Button onClick={handleGenerate} className="w-full gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Generate Addresses
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              {addresses.length > 0 ? (
                <div className="space-y-4">
                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      Generated <span className="font-medium text-foreground">{addresses.length}</span> address{addresses.length !== 1 ? "es" : ""}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={copyAll} className="gap-2">
                        {copiedId === "all" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        Copy All
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadAsJson} className="gap-2">
                        <Download className="h-4 w-4" />
                        JSON
                      </Button>
                      <Button variant="outline" size="sm" onClick={clearAll} className="gap-2 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Clear
                      </Button>
                    </div>
                  </div>

                  {/* Address Cards */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    {addresses.map((address, index) => (
                      <Card 
                        key={address.id} 
                        className="group border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1 text-sm">
                              {address.name && (
                                <p className="font-semibold">{address.name}</p>
                              )}
                              <p>{address.street}</p>
                              <p>{address.city}, {address.stateAbbr} {address.zip}</p>
                              <p className="text-muted-foreground">{address.country}</p>
                              {address.phone && (
                                <p className="mt-2 text-muted-foreground">{address.phone}</p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyAddress(address)}
                              className="h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              {copiedId === address.id ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
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
                      <MapPin className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No addresses generated</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Configure your settings and click the generate button to create random addresses.
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Multiple Countries", desc: "Generate addresses for US, UK, Canada, Australia, and Germany" },
              { title: "Realistic Data", desc: "Street names, cities, and zip codes that look authentic" },
              { title: "Bulk Generation", desc: "Generate up to 10 addresses at once for efficiency" },
              { title: "Easy Export", desc: "Copy individual addresses or download all as JSON" },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <Badge variant="secondary" className="mb-3">{feature.title}</Badge>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
