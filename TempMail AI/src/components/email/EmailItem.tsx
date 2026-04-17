'use client'
import { Email } from '@/types'
import { cn } from '@/lib/utils'

interface EmailItemProps {
  email: Email
  isActive?: boolean
  onClick?: () => void
}

export default function EmailItem({ email, isActive, onClick }: EmailItemProps) {
  return (
    <div
      className={cn(
        'email-item group',
        !email.isRead && 'unread',
        isActive && 'active'
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={`Email from ${email.from.name}: ${email.subject}`}
    >
      {/* Unread indicator */}
      {!email.isRead && (
        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary-600" />
      )}

      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-sm font-bold"
        style={{ backgroundColor: email.from.avatarColor }}
      >
        {email.from.initials}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className={cn('text-sm truncate', email.isRead ? 'text-gray-700 font-medium' : 'text-gray-900 font-semibold')}>
            {email.from.name}
          </span>
          <span className="text-xs text-gray-400 flex-shrink-0">{email.timeAgo}</span>
        </div>
        <p className={cn('text-sm truncate mb-0.5', email.isRead ? 'text-gray-600' : 'text-gray-800 font-medium')}>
          {email.subject}
        </p>
        <p className="text-xs text-gray-400 truncate">{email.preview}</p>
      </div>

      {/* Priority badge */}
      {email.isPriority && (
        <span className="badge-priority flex-shrink-0">Priority</span>
      )}
    </div>
  )
}
