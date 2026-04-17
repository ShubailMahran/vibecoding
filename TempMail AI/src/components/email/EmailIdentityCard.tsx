'use client'
import { useState, useEffect, useCallback } from 'react'
import { Copy, RefreshCw, Check, Clock } from 'lucide-react'
import { cn, copyToClipboard, generateRandomEmail, formatCountdown } from '@/lib/utils'

interface EmailIdentityCardProps {
  initialEmail?: string
  initialExpiresAt?: Date
}

export default function EmailIdentityCard({
  initialEmail = 'alex.vanguard_92@tempmail.ai',
  initialExpiresAt,
}: EmailIdentityCardProps) {
  const [email, setEmail] = useState(initialEmail)
  const [expiresAt, setExpiresAt] = useState<Date>(
    initialExpiresAt ?? new Date(Date.now() + 10 * 60 * 1000)
  )
  const [msLeft, setMsLeft] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Countdown tick
  useEffect(() => {
    const tick = () => setMsLeft(Math.max(0, expiresAt.getTime() - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [expiresAt])

  const isUrgent = msLeft < 2 * 60 * 1000

  const handleCopy = async () => {
    await copyToClipboard(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true)
    await new Promise((r) => setTimeout(r, 600))
    setEmail(generateRandomEmail())
    setExpiresAt(new Date(Date.now() + 10 * 60 * 1000))
    setIsGenerating(false)
  }, [])

  return (
    <div className="identity-card animate-fade-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Your Temporary Identity
          </p>
          <p
            className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight break-all"
            id="temp-email-address"
          >
            {email}
          </p>
        </div>

        {/* Countdown badge */}
        <div className={cn('countdown-badge flex-shrink-0', isUrgent && 'urgent')}>
          <Clock className="w-3.5 h-3.5" />
          <span>Expires in {formatCountdown(msLeft)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 mt-5 flex-wrap">
        <button
          id="copy-email-btn"
          onClick={handleCopy}
          className={cn(
            'btn-primary gap-2 transition-all',
            copied && 'bg-green-600 hover:bg-green-700'
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Address
            </>
          )}
        </button>

        <button
          id="generate-email-btn"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="btn-outline gap-2"
        >
          <RefreshCw className={cn('w-4 h-4', isGenerating && 'animate-spin')} />
          {isGenerating ? 'Generating...' : 'Generate New'}
        </button>
      </div>

      {/* Progress bar for expiry */}
      <div className="mt-4">
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-1000',
              isUrgent ? 'bg-red-400' : 'bg-amber-400'
            )}
            style={{ width: `${(msLeft / (10 * 60 * 1000)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
