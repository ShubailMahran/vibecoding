'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Settings, HelpCircle, Zap, Bell, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const appNavItems = [
  { id: 'inbox', label: 'Inbox', href: '/inbox' },
  { id: 'solutions', label: 'Solutions', href: '/about' },
  { id: 'security', label: 'Security', href: '/privacy' },
]

const docsNavItems = [
  { id: 'guides', label: 'Guides', href: '/api-docs' },
  { id: 'api', label: 'API Reference', href: '/api-docs' },
  { id: 'sdks', label: 'SDKs', href: '/api-docs' },
  { id: 'changelog', label: 'Changelog', href: '/api-docs' },
]

const marketingNavItems = [
  { id: 'features', label: 'Features', href: '/#features' },
  { id: 'pricing', label: 'Pricing', href: '/#pricing' },
  { id: 'docs', label: 'Docs', href: '/api-docs' },
  { id: 'about', label: 'About', href: '/about' },
]

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false)
  const pathname = usePathname() || '/'
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true)
  }, [])

  let variant = 'app'
  let activeItem = 'inbox'
  
  if (pathname === '/' || pathname === '/about' || pathname === '/privacy' || pathname === '/contact') {
    variant = 'marketing'
    activeItem = pathname === '/' ? 'features' : pathname.replace('/', '')
  } else if (pathname.startsWith('/api-docs')) {
    variant = 'docs'
    activeItem = 'api'
  }

  const navItems =
    variant === 'docs'
      ? docsNavItems
      : variant === 'marketing'
      ? marketingNavItems
      : appNavItems

  if (!mounted) return <nav className="navbar shadow-nav h-14" />

  return (
    <nav className="navbar shadow-nav">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-2">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" fill="white" />
        </div>
        <span className="font-bold text-gray-900 text-base tracking-tight">
          TempMail<span className="text-primary-600">AI</span>
        </span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-1 ml-2">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn('nav-link px-3 py-1.5 rounded-md hover:bg-gray-100', {
              active: activeItem === item.id || (activeItem === '' && item.id === 'features'),
            })}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className={cn(
        'relative flex items-center transition-all duration-200',
        searchFocused ? 'w-64' : 'w-48'
      )}>
        <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder={variant === 'docs' ? 'Search documentation...' : 'Search mail...'}
          className={cn(
            'input-search w-full text-sm bg-gray-50 border-gray-200',
            searchFocused && 'bg-white border-primary-300 ring-2 ring-primary-100'
          )}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-1 ml-2">
        <button className="btn-icon btn-ghost relative" aria-label="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="btn-icon btn-ghost" aria-label="Help">
          <HelpCircle className="w-4 h-4" />
        </button>
        <button className="btn-icon btn-ghost" aria-label="Settings">
          <Settings className="w-4 h-4" />
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-gray-100 transition-colors ml-1">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </button>
      </div>
    </nav>
  )
}
