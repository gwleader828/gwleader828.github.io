'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, Sparkles, LogOut, Settings, LayoutDashboard, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Explore Tools' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/updates', label: 'Updates' },
]

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [user, setUser] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setDropdownOpen(false)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const userInitial = user?.user_metadata?.full_name 
    ? user.user_metadata.full_name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || 'U'

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl'>
      <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link href='/' className='group flex items-center gap-2.5'>
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-primary transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25'>
            <Sparkles className='h-4 w-4 text-primary-foreground' />
          </div>
          <span className='font-heading text-xl font-bold tracking-tight'>PixelTools</span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden items-center gap-1 md:flex'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                pathname === link.href
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className='absolute inset-x-2 -bottom-[17px] h-0.5 rounded-full bg-primary' />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className='hidden items-center gap-3 md:flex'>
          <ThemeToggle />
          
          {loading ? (
            <div className='h-10 w-20 animate-pulse rounded-lg bg-muted' />
          ) : user ? (
            <div className='relative'>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className='flex items-center gap-2 rounded-lg border border-border/40 bg-background px-3 py-2 hover:bg-muted/50 transition-colors'
              >
                <div className='flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground'>
                  {userInitial}
                </div>
                <span className='text-sm font-medium text-foreground hidden sm:inline'>{user.email}</span>
                <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', dropdownOpen && 'rotate-180')} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 rounded-lg border border-border/40 bg-card/95 backdrop-blur-sm shadow-lg animate-fade-in'>
                  <Link
                    href='/dashboard'
                    className='flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors rounded-t-lg'
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LayoutDashboard className='h-4 w-4' />
                    Dashboard
                  </Link>
                  <Link
                    href='/account'
                    className='flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors'
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings className='h-4 w-4' />
                    Account Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className='w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-500/10 transition-colors rounded-b-lg border-t border-border/40'
                  >
                    <LogOut className='h-4 w-4' />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href='/login'>
                <Button variant='ghost' size='sm' className='px-4'>
                  Log in
                </Button>
              </Link>
              <Link href='/login'>
                <Button size='sm' className='px-5 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30'>
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className='flex items-center gap-2 md:hidden'>
          <ThemeToggle />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Toggle menu'
            className='transition-transform duration-200 active:scale-95'
          >
            <div className='relative h-5 w-5'>
              <Menu
                className={cn(
                  'absolute inset-0 h-5 w-5 transition-all duration-300',
                  mobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                )}
              />
              <X
                className={cn(
                  'absolute inset-0 h-5 w-5 transition-all duration-300',
                  mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                )}
              />
            </div>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-out md:hidden',
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className='space-y-1 px-4 py-4'>
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'block rounded-xl px-4 py-3 text-base font-medium transition-all duration-200',
                pathname === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
              style={{
                animationDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
              }}
            >
              {link.label}
            </Link>
          ))}
          
          {loading ? (
            <div className='h-10 w-full mt-4 animate-pulse rounded-lg bg-muted' />
          ) : user ? (
            <div className='flex flex-col gap-2 pt-4 border-t border-border/40'>
              <div className='flex items-center gap-2 px-4 py-2'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground'>
                  {userInitial}
                </div>
                <div className='flex flex-col'>
                  <p className='text-sm font-medium text-foreground'>{user.email}</p>
                </div>
              </div>
              <Link
                href='/dashboard'
                onClick={() => setMobileMenuOpen(false)}
                className='flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'
              >
                <LayoutDashboard className='h-4 w-4' />
                Dashboard
              </Link>
              <Link
                href='/account'
                onClick={() => setMobileMenuOpen(false)}
                className='flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors'
              >
                <Settings className='h-4 w-4' />
                Account Settings
              </Link>
              <button
                onClick={() => {
                  handleSignOut()
                  setMobileMenuOpen(false)
                }}
                className='flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-500/10 transition-colors w-full'
              >
                <LogOut className='h-4 w-4' />
                Sign Out
              </button>
            </div>
          ) : (
            <div className='flex flex-col gap-3 pt-4'>
              <Link href='/login' onClick={() => setMobileMenuOpen(false)}>
                <Button variant='outline' className='w-full transition-all duration-200'>
                  Log in
                </Button>
              </Link>
              <Link href='/login' onClick={() => setMobileMenuOpen(false)}>
                <Button className='w-full shadow-lg shadow-primary/25 transition-all duration-200'>
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
