import FeatureCards from '@/components/home/FeatureCards'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col bg-white w-full">
      <main className="flex-1 w-full flex flex-col items-center pt-14">
        {/* Hero Section */}
        <section className="hero-gradient px-4 pt-24 pb-32 text-center border-b border-gray-100 flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-white/40 shadow-sm text-sm text-primary-700 font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
            TempMail AI API is now in public beta
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight max-w-4xl mx-auto mb-6 text-balance">
            Transient email for <br />
            <span className="hero-text-gradient">modern applications</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
            Generate secure, disposable email addresses instantly. Protect your real inbox from spam, track test environments, and integrate directly via API.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link href="/inbox" className="btn-primary btn-lg shadow-xl shadow-primary-500/20">
              Open Free Inbox <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
            <Link href="/api-docs" className="btn-outline btn-lg bg-white/50 backdrop-blur-sm border-gray-200">
              Read API Docs
            </Link>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center gap-8 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-400" />
              Over 10M+ emails processed
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                +2k
              </div>
            </div>
          </div>
        </section>

        {/* Features overlaying hero */}
        <FeatureCards />
        
        {/* Simple CTA before footer */}
        <section className="py-24 px-4 w-full flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to secure your inbox?</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">No credit card required. No registration needed. Instantly generate a mailbox and start receiving.</p>
          <Link href="/inbox" className="btn-primary btn-lg">
            Generate Email Now
          </Link>
        </section>
      </main>
    </div>
  )
}
