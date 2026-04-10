import type { Metadata } from "next"
import Link from "next/link"
import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Log In - ToolsHub",
  description: "Log in to your ToolsHub account to access powerful developer tools.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Log in to your account to continue
          </p>
        </div>
        <AuthForm mode="login" />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
