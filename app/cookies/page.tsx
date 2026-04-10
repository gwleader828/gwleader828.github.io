import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Cookie Policy - PixelTools",
  description: "Learn about how PixelTools uses cookies and similar technologies.",
}

export default function CookiesPage() {
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
            Cookie Policy
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Last updated: April 6, 2026
          </p>
        </div>

        <div className="prose prose-neutral mt-12 max-w-none animate-slide-up stagger-2 dark:prose-invert">
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">1. What Are Cookies</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Cookies are small text files that are stored on your computer or mobile device when you 
              visit a website. They are widely used to make websites work more efficiently and provide 
              information to the owners of the site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">2. How We Use Cookies</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              PixelTools uses cookies for the following purposes:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Marketing Cookies:</strong> Track visitors across websites for advertising</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">3. Types of Cookies We Use</h2>
            
            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-heading font-semibold">Essential Cookies</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                These cookies are necessary for the website to function and cannot be switched off. 
                They are usually set in response to actions made by you such as setting your privacy 
                preferences, logging in, or filling in forms.
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-heading font-semibold">Performance Cookies</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                These cookies allow us to count visits and traffic sources so we can measure and 
                improve the performance of our site. They help us know which pages are the most and 
                least popular.
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-heading font-semibold">Functional Cookies</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                These cookies enable the website to provide enhanced functionality and personalization. 
                They may be set by us or by third-party providers whose services we have added to our pages.
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-muted/30 p-6">
              <h3 className="font-heading font-semibold">Targeting Cookies</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                These cookies may be set through our site by our advertising partners. They may be 
                used by those companies to build a profile of your interests and show you relevant 
                adverts on other sites.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">4. Managing Cookies</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              You can control and/or delete cookies as you wish. You can delete all cookies that are 
              already on your computer and you can set most browsers to prevent them from being placed. 
              However, if you do this, you may have to manually adjust some preferences every time you 
              visit a site.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Most web browsers allow some control of cookies through browser settings. To find out more 
              about cookies, including how to see what cookies have been set, visit{" "}
              <a 
                href="https://www.allaboutcookies.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                www.allaboutcookies.org
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">5. Third-Party Cookies</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              In some cases, we may use third-party cookies for analytics and marketing purposes. 
              These cookies are subject to the respective third parties&apos; privacy policies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">6. Updates to This Policy</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. Please revisit this page regularly 
              to stay informed about our use of cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold">7. Contact Us</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              If you have any questions about our use of cookies, please contact us at{" "}
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
