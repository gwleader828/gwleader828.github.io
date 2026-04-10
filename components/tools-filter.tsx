"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "all", label: "All Categories", count: 12 },
  { id: "code", label: "Code Tools", count: 4 },
  { id: "api", label: "API Tools", count: 3 },
  { id: "data", label: "Data Tools", count: 2 },
  { id: "image", label: "Image Tools", count: 2 },
  { id: "security", label: "Security", count: 1 },
]

export function ToolsFilter() {
  const [activeCategory, setActiveCategory] = React.useState("all")

  return (
    <div className="rounded-lg border border-border/40 bg-card/50 p-4">
      <h3 className="mb-4 text-sm font-semibold">Categories</h3>
      <nav className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
              activeCategory === category.id
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <span>{category.label}</span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs",
                activeCategory === category.id
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {category.count}
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}
