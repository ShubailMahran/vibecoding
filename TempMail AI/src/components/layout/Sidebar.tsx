'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Inbox, Send, Trash2, BarChart2, Plus,
  ListChecks, Globe, Key, MessageSquare, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  variant?: 'app' | 'docs'
  onNewEmail?: () => void
  unreadCount?: number
}

const appItems = [
  { id: 'inbox', label: 'Inbox', icon: Inbox, href: '/inbox', badge: 4 },
  { id: 'sent', label: 'Sent', icon: Send, href: '/inbox?tab=sent' },
  { id: 'trash', label: 'Trash', icon: Trash2, href: '/inbox?tab=trash' },
  { id: 'analytics', label: 'Analytics', icon: BarChart2, href: '/inbox?tab=analytics' },
]

const docsCoreItems = [
  { id: 'inbox', label: 'Inbox', icon: Inbox, href: '/inbox' },
  { id: 'sent', label: 'Sent', icon: Send, href: '/inbox?tab=sent' },
  { id: 'trash', label: 'Trash', icon: Trash2, href: '/inbox?tab=trash' },
  { id: 'analytics', label: 'Analytics', icon: BarChart2, href: '/inbox?tab=analytics' },
]

const docsEndpoints = [
  { id: 'list-domains', label: 'List Domains', method: 'GET', href: '/api-docs?endpoint=list-domains' },
  { id: 'create-token', label: 'Create Token', method: 'POST', href: '/api-docs?endpoint=create-token' },
  { id: 'retrieve-message', label: 'Retrieve Message', method: 'GET', href: '/api-docs?endpoint=retrieve-message' },
]

export default function Sidebar({ variant = 'app', onNewEmail, unreadCount = 0 }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="sidebar">
      {/* Workspace header */}
      <div className="px-4 pt-4 pb-4">
        {variant === 'app' ? (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center flex-shrink-0">
              <Inbox className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm text-gray-900">Workspace</p>
              <span className="text-xs text-gray-400 font-medium">Pro Plan</span>
            </div>
          </div>
        ) : (
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
            Core Resources
          </p>
        )}

        {/* New Email CTA */}
        <button
          onClick={onNewEmail}
          className="btn-primary w-full justify-center gap-2 py-2"
        >
          <Plus className="w-4 h-4" />
          New Email
        </button>
      </div>

      {/* App Nav Items */}
      {variant === 'app' && (
        <nav className="flex flex-col gap-0.5 px-2">
          {appItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href.split('?')[0])
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn('sidebar-item', isActive && 'active')}
              >
                <Icon className="sidebar-icon" />
                <span className="flex-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="ml-auto bg-primary-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      )}

      {/* Docs Core Items */}
      {variant === 'docs' && (
        <>
          <nav className="flex flex-col gap-0.5 px-2 mb-6">
            {docsCoreItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn('sidebar-item', isActive && 'active')}
                >
                  <Icon className="sidebar-icon" />
                  <span className="flex-1">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Endpoints */}
          <div className="px-4 mb-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Endpoints</p>
          </div>
          <nav className="flex flex-col gap-0.5 px-2">
            {docsEndpoints.map((ep) => (
              <Link
                key={ep.id}
                href={ep.href}
                className="sidebar-item group"
              >
                <span className={cn(
                  'text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide flex-shrink-0',
                  ep.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                )}>
                  {ep.method}
                </span>
                <span className="text-xs truncate">{ep.label}</span>
              </Link>
            ))}
          </nav>
        </>
      )}

      {/* Bottom section */}
      <div className="mt-auto px-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Free Plan</span>
          <button className="text-primary-600 font-semibold hover:underline">Upgrade</button>
        </div>
        <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary-500 rounded-full w-2/5" />
        </div>
        <p className="text-[10px] text-gray-400 mt-1">4 / 10 emails used</p>
      </div>
    </aside>
  )
}
