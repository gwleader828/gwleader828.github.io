"use client"

import * as React from "react"
import { Mail, Copy, RefreshCw, Check, Trash2, Clock, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EmailAccount {
  id: string
  email: string
  token: string
  createdAt: Date
}

interface Message {
  id: string
  from: string
  subject: string
  intro: string
  text?: string
  html?: string[]
  createdAt: string
  isRead: boolean
}

interface MailState {
  accounts: EmailAccount[]
  messages: { [key: string]: Message[] }
  selectedMessage: Message | null
  loading: boolean
  error: string | null
  checkingAccounts: { [key: string]: boolean }
}

export default function TempMailPage() {
  const [state, setState] = React.useState<MailState>({
    accounts: [],
    messages: {},
    selectedMessage: null,
    loading: false,
    error: null,
    checkingAccounts: {},
  })

  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  const handleGenerateEmail = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await fetch('/api/mail/create-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to create email')
      }

      const newAccount: EmailAccount = {
        id: data.id,
        email: data.email,
        token: data.token,
        createdAt: new Date(),
      }

      setState(prev => ({
        ...prev,
        accounts: [newAccount, ...prev.accounts],
        messages: { ...prev.messages, [newAccount.id]: [] },
        loading: false,
      }))

      // Start checking for messages
      checkMessages(newAccount.id, data.token)
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to create email',
      }))
    }
  }

  const checkMessages = async (accountId: string, token: string) => {
    setState(prev => ({
      ...prev,
      checkingAccounts: { ...prev.checkingAccounts, [accountId]: true },
    }))

    try {
      const response = await fetch('/api/mail/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (data.success) {
        setState(prev => ({
          ...prev,
          messages: { ...prev.messages, [accountId]: data.messages },
        }))
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setState(prev => ({
        ...prev,
        checkingAccounts: { ...prev.checkingAccounts, [accountId]: false },
      }))
    }
  }

  const openMessage = async (message: Message, accountId: string) => {
    const account = state.accounts.find(acc => acc.id === accountId)
    if (!account) return

    try {
      const response = await fetch('/api/mail/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: account.token, messageId: message.id }),
      })

      const data = await response.json()

      if (data.success) {
        setState(prev => ({ ...prev, selectedMessage: data.message }))
      }
    } catch (error) {
      console.error('Error fetching message:', error)
    }
  }

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedId(email)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const deleteAccount = (id: string) => {
    setState(prev => ({
      ...prev,
      accounts: prev.accounts.filter(acc => acc.id !== id),
      messages: { ...prev.messages, [id]: undefined },
    }))
  }

  const clearAll = () => {
    setState(prev => ({
      ...prev,
      accounts: [],
      messages: {},
    }))
  }

  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString()
    } catch {
      return dateString
    }
  }

  // Auto-refresh messages every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      state.accounts.forEach(account => {
        if (!state.checkingAccounts[account.id]) {
          checkMessages(account.id, account.token)
        }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [state.accounts, state.checkingAccounts])

  return (
    <div className="flex flex-col animate-fade-in overflow-y-scroll">
      {/* Header */}
      <section className="border-b border-border/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Temporary Email Generator
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Generate disposable email addresses instantly. Perfect for testing, 
              sign-ups, and maintaining privacy online.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Settings Panel */}
            <Card className="h-fit border-border/40 bg-card/50 backdrop-blur-sm lg:sticky lg:top-24 z-10">
              <CardHeader>
                <CardTitle>Generate Email</CardTitle>
                <CardDescription>Create temporary email addresses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button 
                  onClick={handleGenerateEmail}
                  disabled={state.loading}
                  className="w-full gap-2"
                >
                  {state.loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      Generate Email
                    </>
                  )}
                </Button>
                {state.error && (
                  <p className="text-xs text-destructive">{state.error}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Each email receives messages for 24 hours. Messages auto-refresh every 5 seconds.
                </p>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              {state.accounts.length > 0 ? (
                <div className="space-y-4">
                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{state.accounts.length}</span> email{state.accounts.length !== 1 ? "s" : ""} generated
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearAll}
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear All
                    </Button>
                  </div>

                  {/* Email Accounts */}
                  <div className="space-y-4">
                    {state.accounts.map((account, index) => (
                      <div
                        key={account.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Email Card */}
                        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between gap-4 mb-4">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-3">
                                  <Mail className="h-5 w-5 text-primary" />
                                  <span className="font-mono text-base break-all">{account.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>Created: {formatTime(account.createdAt.toISOString())}</span>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => copyEmail(account.email)}
                                  className="h-8 w-8"
                                >
                                  {copiedId === account.email ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteAccount(account.id)}
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Refresh Button */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => checkMessages(account.id, account.token)}
                              disabled={state.checkingAccounts[account.id]}
                              className="w-full gap-2 mb-4"
                            >
                              {state.checkingAccounts[account.id] ? (
                                <>
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                  Checking...
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="h-3 w-3" />
                                  Check Messages
                                </>
                              )}
                            </Button>

                            {/* Messages */}
                            {(state.messages[account.id]?.length || 0) > 0 ? (
                              <div className="space-y-2">
                                <p className="text-xs font-semibold text-muted-foreground">
                                  Messages: {state.messages[account.id]?.length || 0}
                                </p>
                                {state.messages[account.id]?.map(msg => (
                                  <Card
                                    key={msg.id}
                                    className="border-border/40 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => openMessage(msg, account.id)}
                                  >
                                    <CardContent className="p-3">
                                      <div className="space-y-1">
                                        <p className="text-xs font-semibold text-foreground truncate">
                                          {msg.subject || '(No Subject)'}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                          From: {msg.from}
                                        </p>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                          {msg.intro || '(No preview)'}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {formatTime(msg.createdAt)}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground text-center py-4">
                                No messages yet. Waiting for emails...
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Card className="border-dashed border-border/40 bg-card/30">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Mail className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No emails generated</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Click the generate button to create temporary email addresses for testing and privacy.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Message Modal */}
      {state.selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto border-border/40">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex-1 space-y-2">
                <CardTitle>{state.selectedMessage.subject || '(No Subject)'}</CardTitle>
                <CardDescription>From: {state.selectedMessage.from}</CardDescription>
                <p className="text-xs text-muted-foreground">
                  {formatTime(state.selectedMessage.createdAt)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setState(prev => ({ ...prev, selectedMessage: null }))}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.selectedMessage.text && (
                <div className="rounded-lg bg-muted/30 p-4">
                  <p className="whitespace-pre-wrap text-sm">{state.selectedMessage.text}</p>
                </div>
              )}
              {state.selectedMessage.html && state.selectedMessage.html.length > 0 && (
                <div className="rounded-lg bg-muted/30 p-4">
                  {state.selectedMessage.html.map((part, idx) => (
                    <div key={idx} className="text-sm" dangerouslySetInnerHTML={{ __html: part }} />
                  ))}
                </div>
              )}
              {!state.selectedMessage.text && (!state.selectedMessage.html || state.selectedMessage.html.length === 0) && (
                <p className="text-sm text-muted-foreground">(No content)</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
