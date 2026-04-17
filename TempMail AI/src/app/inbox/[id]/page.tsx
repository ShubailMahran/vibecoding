'use client'
import { useParams, useRouter } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import EmailViewer from '@/components/email/EmailViewer'
import { mockEmails } from '@/lib/mockData'
import { AlertCircle, Inbox } from 'lucide-react'

export default function EmailViewerPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const email = mockEmails.find((e) => e.id === id)

  if (!email) {
    return (
      <>
        <Sidebar variant="app" />
        <div className="main-content pl-56 bg-bg flex items-center justify-center p-8">
          <div className="card p-10 text-center max-w-sm w-full border-none shadow-md">
             <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
             <h2 className="text-xl font-bold text-gray-900 mb-2">Message not found</h2>
             <p className="text-gray-500 mb-6 text-sm">This email may have expired and been permanently deleted due to our 24-hour retention policy.</p>
             <button onClick={() => router.push('/inbox')} className="btn-primary w-full justify-center">
                <Inbox className="w-4 h-4 mr-2" />
                Return to Inbox
             </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Sidebar variant="app" />
      <div className="main-content pl-56 bg-bg">
        <EmailViewer email={email} />
      </div>
    </>
  )
}
