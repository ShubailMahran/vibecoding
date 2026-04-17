export interface Email {
  id: string
  from: {
    name: string
    address: string
    initials: string
    avatarColor: string
  }
  subject: string
  preview: string
  body: string
  receivedAt: string
  timeAgo: string
  isRead: boolean
  isPriority: boolean
  isImportant: boolean
  attachments: Attachment[]
  tags: string[]
}

export interface Attachment {
  id: string
  name: string
  size: string
  type: 'pdf' | 'zip' | 'image' | 'doc' | 'xls' | 'other'
}

export interface TempMailbox {
  address: string
  expiresAt: Date
  createdAt: Date
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT'
  path: string
  title: string
  description: string
  parameters: ApiParameter[]
  responseSchema: ApiResponseField[]
  codeExamples: CodeExample[]
}

export interface ApiParameter {
  name: string
  type: string
  required: boolean
  description: string
}

export interface ApiResponseField {
  name: string
  type: string
  description: string
}

export interface CodeExample {
  language: 'curl' | 'nodejs' | 'python'
  label: string
  code: string
}

export type SidebarItem = {
  id: string
  label: string
  icon: string
  href: string
  badge?: number
}
