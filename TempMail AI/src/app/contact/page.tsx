
import { Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="flex flex-col bg-white">
      <main className="flex-1 pt-14">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Get in touch</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our API, enterprise plans, or experiencing issues? We&apos;re here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="card p-8 bg-gray-50/50 border-none">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                    <input type="text" className="input" placeholder="Alex Vanguard" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email" className="input" placeholder="alex@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea className="input min-h-[120px] resize-y" placeholder="How can we help you?"></textarea>
                  </div>
                  <button type="button" className="btn-primary w-full shadow-md py-2.5">
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-10 pl-0 md:pl-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary-600" /> Email Support
                </h3>
                <p className="text-gray-600 mb-2">For general inquiries and technical support:</p>
                <a href="mailto:support@tempmail.ai" className="text-primary-600 font-semibold hover:underline">
                  support@tempmail.ai
                </a>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" /> Office
                </h3>
                <p className="text-gray-600">
                  TempMail AI Inc.<br />
                  100 Privacy Way, Suite 404<br />
                  San Francisco, CA 94107
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
