'use client'
import { Email } from '@/types'
import { ArrowLeft, Archive, AlertCircle, Trash2, Reply, Forward, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import AttachmentCard from '../ui/AttachmentCard'

interface EmailViewerProps {
  email: Email
}

export default function EmailViewer({ email }: EmailViewerProps) {
  return (
    <div className="flex flex-col h-full animate-slide-in">
      {/* Header Toolbar */}
      <div className="h-14 border-b border-border flex items-center justify-between px-4 sticky top-0 bg-bg z-10">
        <Link href="/inbox" className="btn btn-ghost px-3 text-gray-600">
          <ArrowLeft className="w-4 h-4" />
          Back to Inbox
        </Link>
        <div className="flex items-center gap-2">
          <button className="btn-icon btn-outline hover:text-gray-900" title="Archive">
            <Archive className="w-4 h-4" />
          </button>
          <button className="btn-icon btn-outline hover:text-gray-900" title="Report Spam">
            <AlertCircle className="w-4 h-4" />
          </button>
          <button className="btn-icon btn-outline hover:text-red-600 hover:bg-red-50 hover:border-red-200" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-border shadow-sm p-6 md:p-10 mb-8">
          {/* Email Header */}
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: email.from.avatarColor }}
              >
                {email.from.initials}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 leading-tight flex items-center gap-2">
                  {email.from.name}
                </h3>
                <p className="text-sm text-gray-500">{email.from.address}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500 mb-1">
                {new Date(email.receivedAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })}
              </p>
              {email.isImportant && (
                <span className="badge-important inline-flex">★ Important</span>
              )}
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
            {email.subject}
          </h1>

          {/* Email Body rendered securely (assuming safe HTML for this mockup) */}
          <div
            className="prose prose-sm md:prose-base prose-blue max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: email.body }}
          />

          {/* Attachments Section */}
          {email.attachments.length > 0 && (
            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Attachments ({email.attachments.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {email.attachments.map((file) => (
                  <AttachmentCard key={file.id} name={file.name} size={file.size} type={file.type} />
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-10 pt-8 border-t border-border flex items-center gap-3">
            <button className="btn-primary">
              <Reply className="w-4 h-4 mr-2" />
              Reply
            </button>
            <button className="btn-outline">
              <Forward className="w-4 h-4 mr-2" />
              Forward
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="max-w-4xl mx-auto flex items-center justify-between mt-auto py-4">
          <button className="flex flex-col items-start text-left group">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-primary-600 transition-colors flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Previous Message
            </span>
            <span className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
              Weekly Sync Notes - O...
            </span>
          </button>
          <button className="flex flex-col items-end text-right group">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 group-hover:text-primary-600 transition-colors flex items-center gap-1">
              Next Message <ChevronRight className="w-3 h-3" />
            </span>
            <span className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
              Security Alert: New Lo...
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
