'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, User, Loader2, ArrowRight, Chrome } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  
  const [isSignup, setIsSignup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  
  // Signup form state
  const [signupFullName, setSignupFullName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      setMessage({ type: 'error', text: 'Please fill in all fields' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      })

      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' })
        setTimeout(() => router.push('/tools'), 1500)
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async () => {
    if (!signupFullName || !signupEmail || !signupPassword) {
      setMessage({ type: 'error', text: 'Please fill in all fields' })
      return
    }

    if (signupPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            full_name: signupFullName,
          },
        },
      })

      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ type: 'success', text: 'Check your email to confirm your account!' })
        setSignupFullName('')
        setSignupEmail('')
        setSignupPassword('')
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        setMessage({ type: 'error', text: error.message })
        setLoading(false)
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Card */}
        <div className="border border-border/40 rounded-2xl bg-card/50 backdrop-blur-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2 text-foreground">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isSignup 
                ? 'Join PixelTools and unlock powerful developer tools' 
                : 'Sign in to access your tools'}
            </p>
          </div>

          {/* Message Alert */}
          {message && (
            <div 
              className={`mb-6 p-4 rounded-lg text-sm font-medium animate-slide-down ${
                message.type === 'success'
                  ? 'bg-green-500/15 text-green-700 dark:text-green-400 border border-green-500/30'
                  : 'bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/30'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4 mb-6">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={signupFullName}
                    onChange={(e) => setSignupFullName(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/40 bg-background hover:border-border/60 focus:border-primary/60 focus:ring-1 focus:ring-primary/30 disabled:opacity-50 transition-all outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={isSignup ? signupEmail : loginEmail}
                  onChange={(e) => isSignup ? setSignupEmail(e.target.value) : setLoginEmail(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/40 bg-background hover:border-border/60 focus:border-primary/60 focus:ring-1 focus:ring-primary/30 disabled:opacity-50 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={isSignup ? signupPassword : loginPassword}
                  onChange={(e) => isSignup ? setSignupPassword(e.target.value) : setLoginPassword(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/40 bg-background hover:border-border/60 focus:border-primary/60 focus:ring-1 focus:ring-primary/30 disabled:opacity-50 transition-all outline-none"
                />
              </div>
              {!isSignup && (
                <button
                  onClick={() => setMessage({ type: 'error', text: 'Password reset not implemented yet' })}
                  className="text-xs text-primary hover:text-primary/80 mt-1 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              )}
            </div>
          </div>

          {/* Primary Button */}
          <button
            onClick={isSignup ? handleSignup : handleLogin}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isSignup ? 'Creating account...' : 'Signing in...'}
              </>
            ) : (
              <>
                {isSignup ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full border border-border/40 hover:border-border/60 bg-background hover:bg-muted/30 text-foreground font-medium py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-6"
          >
            <Chrome className="w-4 h-4" />
            Continue with Google
          </button>

          {/* Toggle */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => {
                  setIsSignup(!isSignup)
                  setMessage(null)
                  setLoginEmail('')
                  setLoginPassword('')
                  setSignupFullName('')
                  setSignupEmail('')
                  setSignupPassword('')
                }}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}
