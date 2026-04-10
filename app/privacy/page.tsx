import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacy Policy - PixelTools",
  description: "Learn how PixelTools collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Last updated: April 6, 2026
          </p>
        </div>

        <div className="prose prose-neutral mt-12 max-w-none animate-slide-up stagger-2 dark:prose-invert">
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">1. Introduction</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Welcome to PixelTools. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">2. Information We Collect</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We may collect the following types of information:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li><strong>Personal Information:</strong> Name, email address, and account credentials when you register.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our tools and services.</li>
              <li><strong>Device Information:</strong> Browser type, IP address, and device identifiers.</li>
              <li><strong>Cookies:</strong> Small data files stored on your device to enhance your experience.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">3. How We Use Your Information</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We use the information we collect to:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience on our platform</li>
              <li>Send you important updates and communications</li>
              <li>Analyze usage patterns to enhance our tools</li>
              <li>Ensure the security of our platform</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">4. Data Sharing and Disclosure</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>Service providers who help us operate our platform</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your explicit consent</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">5. Data Security</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We implement industry-standard security measures to protect your data, including encryption, 
              secure servers, and regular security audits. However, no method of transmission over the 
              internet is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">6. Your Rights</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              You have the right to:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">7. Contact Us</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <Link href="/contact" className="text-primary hover:underline">
                our contact page
              </Link>{" "}
              or email us at privacy@pixeltools.dev
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
