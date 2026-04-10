"use client"

import { MapPin } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const tools = [
  {
    id: 1,
    name: "Address Generator",
    description: "Generate realistic random addresses for testing, development, and data mocking purposes.",
    icon: MapPin,
    category: "Data Tools",
    badge: "New",
    href: "/tools/address-generator",
  },
]

export function ToolsGrid() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{tools.length}</span> tool{tools.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <Card
            key={tool.id}
            className="group flex flex-col border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card hover:shadow-lg"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
                {tool.badge && (
                  <Badge
                    variant={tool.badge === "New" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {tool.badge}
                  </Badge>
                )}
              </div>
              <CardTitle className="mt-4 text-lg">{tool.name}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {tool.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{tool.category}</span>
                <Link href={tool.href}>
                  <Button size="sm" variant="ghost" className="h-8 px-3 text-xs">
                    Open Tool
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
