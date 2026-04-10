import type { Metadata } from "next"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ToolsGrid } from "@/components/tools-grid"
import { ToolsFilter } from "@/components/tools-filter"

export const metadata: Metadata = {
  title: "Explore Tools - ToolsHub",
  description: "Discover our collection of powerful developer tools to streamline your workflow.",
}

export default function ToolsPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="border-b border-border/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Explore Our Tools
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Discover powerful developer tools designed to streamline your workflow and boost
              productivity.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools..."
                className="h-11 pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tools Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar Filter */}
            <aside className="w-full shrink-0 lg:w-64">
              <ToolsFilter />
            </aside>

            {/* Tools Grid */}
            <div className="flex-1">
              <ToolsGrid />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
