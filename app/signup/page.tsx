import type { Metadata } from "next"
import Link from "next/link"
import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Sign Up - ToolsHub",
  description: "Create a ToolsHub account to access powerful developer tools.",
}

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Create your account</h1>
          <p className="mt-2 text-muted-foreground">
            Get started with ToolsHub for free
          </p>
        </div>
        <AuthForm mode="signup" />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
