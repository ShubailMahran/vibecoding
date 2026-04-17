import Navbar from '@/components/layout/Navbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell flex-col">
      <Navbar />
      <div className="flex-1 flex overflow-hidden w-full relative">
        {children}
      </div>
    </div>
  )
}
