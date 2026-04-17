'use client'
import { useState } from 'react'
import { Email } from '@/types'
import EmailItem from './EmailItem'
import { Filter, RefreshCw, Inbox, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmailListProps {
  emails: Email[]
  activeId?: string
  onSelect: (email: Email) => void
  isLoading?: boolean
}

function SkeletonItem() {
  return (
    <div className="flex items-start gap-4 p-4 border-b border-border">
      <div className="skeleton w-10 h-10 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex justify-between">
          <div className="skeleton h-3.5 w-28 rounded" />
          <div className="skeleton h-3 w-14 rounded" />
        </div>
        <div className="skeleton h-3 w-48 rounded" />
        <div className="skeleton h-3 w-full rounded" />
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4 animate-pulse-soft">
        <Inbox className="w-8 h-8 text-primary-400" />
      </div>
      <h3 className="font-semibold text-gray-800 mb-2">Waiting for emails</h3>
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
        Your temporary inbox is ready. Emails sent to your address will appear here instantly.
      </p>
      <div className="flex items-center gap-1.5 mt-4 text-xs text-primary-500">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-ping" />
        Listening for new mail...
      </div>
    </div>
  )
}

export default function EmailList({ emails, activeId, onSelect, isLoading }: EmailListProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((r) => setTimeout(r, 800))
    setIsRefreshing(false)
  }

  return (
    <div className="mb-6">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary-600" />
            Active Inbox
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Messages are automatically deleted every 24 hours.</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            className="btn-icon btn-outline"
            aria-label="Filter emails"
            title="Filter"
          >
            <Filter className="w-4 h-4" />
          </button>
          <button
            className="btn-icon btn-outline"
            onClick={handleRefresh}
            aria-label="Refresh inbox"
            title="Refresh"
          >
            <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="card overflow-hidden">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonItem key={i} />)
        ) : emails.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            {emails.map((email, idx) => (
              <div
                key={email.id}
                className={cn('animate-fade-in')}
                style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
              >
                <EmailItem
                  email={email}
                  isActive={activeId === email.id}
                  onClick={() => onSelect(email)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
