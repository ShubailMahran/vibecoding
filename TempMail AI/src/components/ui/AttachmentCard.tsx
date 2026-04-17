'use client'

import { getFileIcon } from '@/lib/utils'
import { Download } from 'lucide-react'

interface AttachmentCardProps {
  name: string
  size: string
  type: string
}

export default function AttachmentCard({ name, size, type }: AttachmentCardProps) {
  const icon = getFileIcon(type)
  return (
    <div className="attachment-card group max-w-sm w-full">
      <div className="w-10 h-10 rounded-lg bg-white border border-border flex flex-shrink-0 items-center justify-center text-xl shadow-sm">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
        <p className="text-xs text-gray-500">{size}</p>
      </div>
      <button className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center text-gray-400 group-hover:text-primary-600 transition-colors shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 flex-shrink-0">
        <Download className="w-4 h-4" />
      </button>
    </div>
  )
}
