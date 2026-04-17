import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomEmail(): string {
  const adjectives = ['swift', 'nova', 'echo', 'pulse', 'flux', 'void', 'arc', 'neo', 'vex', 'zen']
  const nouns = ['shield', 'vault', 'proxy', 'guard', 'mask', 'filter', 'gate', 'cloak', 'haven']
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const num = Math.floor(Math.random() * 9999).toString().padStart(2, '0')
  return `${adj}.${noun}_${num}@tempmail.ai`
}                                   

export function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00'
  const totalSeconds = Math.floor(ms / 1000)
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function getFileIcon(type: string): string {
  const icons: Record<string, string> = {
    pdf: '📄',
    zip: '📦',
    image: '🖼️',
    doc: '📝',
    xls: '📊',
    other: '📎',
  }
  return icons[type] || icons.other
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}
