import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Terms of Service - PixelTools",
  description: "Read the terms and conditions for using PixelTools platform.",
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="animate-fade-in">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="animate-slide-up stagger-1">
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Last updated: April 6, 2026
          </p>
        </div>

        <div className="prose prose-neutral mt-12 max-w-none animate-slide-up stagger-2 dark:prose-invert">
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              By accessing or using PixelTools, you agree to be bound by these Terms of Service and all 
              applicable laws and regulations. If you do not agree with any of these terms, you are 
              prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">2. Use License</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Permission is granted to temporarily access and use PixelTools for personal, non-commercial 
              transitory viewing only. This is the grant of a license, not a transfer of title, and under 
              this license you may not:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">3. Account Responsibilities</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              When you create an account with us, you must provide accurate and complete information. 
              You are responsible for:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring your use complies with all applicable laws</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">4. Prohibited Activities</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>Violating any applicable laws or regulations</li>
              <li>Infringing on intellectual property rights</li>
              <li>Transmitting harmful code or malware</li>
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Harassing or intimidating other users</li>
              <li>Using our services for any illegal purpose</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">5. Service Modifications</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              PixelTools reserves the right to modify, suspend, or discontinue any part of our services 
              at any time without prior notice. We shall not be liable to you or any third party for any 
              modification, suspension, or discontinuation of services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">6. Limitation of Liability</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              In no event shall PixelTools or its suppliers be liable for any damages arising out of the 
              use or inability to use the materials on our platform. This includes but is not limited to 
              direct, indirect, incidental, consequential, or punitive damages.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">7. Governing Law</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              These terms and conditions are governed by and construed in accordance with applicable laws, 
              and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">8. Contact Information</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <Link href="/contact" className="text-primary hover:underline">
                our contact page
              </Link>{" "}
              or email us at legal@pixeltools.dev
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
