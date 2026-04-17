'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import EmailIdentityCard from '@/components/email/EmailIdentityCard'
import EmailList from '@/components/email/EmailList'
import { Shield, Zap } from 'lucide-react'
import { mockEmails, mockMailbox } from '@/lib/mockData'
import { Email } from '@/types'

export default function InboxPage() {
  const router = useRouter()
  // Ensure we sort messages by date descending
  const sortedEmails = [...mockEmails].sort(
    (a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime()
  )

  const unreadCount = sortedEmails.filter((e) => !e.isRead).length

  const handleSelectEmail = (email: Email) => {
    router.push(`/inbox/${email.id}`)
  }

  return (
    <>
      <Sidebar variant="app" unreadCount={unreadCount} />
      <div className="main-content pl-56 bg-bg flex justify-center">
        <div className="max-w-4xl w-full p-6 md:p-8">
          <EmailIdentityCard
            initialEmail={mockMailbox.address}
            initialExpiresAt={mockMailbox.expiresAt}
          />

          <EmailList
            emails={sortedEmails}
            onSelect={handleSelectEmail}
            isLoading={false}
          />

          {/* Under-list Feature info - matching Screen 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-12">
            <div className="card p-6 border-none bg-gray-100/50 hover:bg-white hover:shadow-sm transition-all text-left group">
              <Shield className="w-8 h-8 text-primary-600 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">End-to-End Privacy</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your data is never stored on our physical drives. Everything exists in a volatile memory layer that evaporates when the timer hits zero.
              </p>
            </div>
            <div className="card p-6 border-none bg-gray-100/50 hover:bg-white hover:shadow-sm transition-all text-left group">
              <Zap className="w-8 h-8 text-amber-600 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Real-time Delivery</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                Websocket architecture ensures your emails arrive the millisecond they are sent. No manual refreshing needed for your verification codes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
