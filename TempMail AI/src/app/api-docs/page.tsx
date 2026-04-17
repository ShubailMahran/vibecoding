'use client'
import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import CodeBlock from '@/components/ui/CodeBlock'
import { mockApiEndpoints } from '@/lib/mockData'
import { Copy, FileText, Key, Lightbulb } from 'lucide-react'
import { cn, copyToClipboard } from '@/lib/utils'

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState<'curl' | 'nodejs' | 'python'>('curl')
  
  // For this mockup, we'll just show the first endpoint (Generate)
  const endpoint = mockApiEndpoints[0]
  const activeCodeExample = endpoint.codeExamples.find(e => e.language === activeTab)

  return (
    <>
      <Sidebar variant="docs" />
      <div className="main-content pl-56 bg-bg flex">
        {/* Left Pane: Documentation */}
        <div className="w-[55%] p-10 overflow-y-auto border-r border-border bg-white">
          <div className="flex items-center gap-2 text-sm font-bold text-primary-600 mb-6 uppercase tracking-wider">
            <FileText className="w-4 h-4" /> API Reference
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight max-w-lg">
            {endpoint.title}
          </h1>
          
          <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-xl">
            {endpoint.description}
          </p>

          <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg mb-10 font-mono text-sm shadow-sm text-blue-900">
            <span className="badge-post">{endpoint.method}</span>
            {endpoint.path}
          </div>

          {/* Parameters */}
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            Request Parameters
          </h3>
          
          <div className="border border-border rounded-xl overflow-hidden mb-12">
            <table className="w-full text-left text-sm">
              <tbody>
                {endpoint.parameters.map((param, i) => (
                  <tr key={param.name} className={cn("border-b border-border last:border-0", i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50')}>
                    <td className="p-4 align-top w-1/3">
                      <div className="font-mono font-semibold text-gray-900">{param.name}</div>
                      <div className="text-gray-500 text-xs mt-1">{param.type}</div>
                    </td>
                    <td className="p-4 align-top">
                      {param.required ? (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-red-600 mb-2 inline-block">Required</span>
                      ) : (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-2 inline-block">Optional</span>
                      )}
                      <p className="text-gray-600 leading-relaxed">{param.description}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Response Schema */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">Response Schema</h3>
          <p className="text-sm text-gray-600 mb-4">Returns a <span className="font-semibold text-gray-900">MailboxObject</span> upon success.</p>
          
          <div className="card bg-gray-50/50 border-gray-200 p-6 space-y-4">
            {endpoint.responseSchema.map((field) => (
              <div key={field.name} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-0.5">
                    {field.name} <span className="font-normal text-gray-500 font-mono text-xs ml-1">{field.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{field.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-20"></div>
        </div>

        {/* Right Pane: Code Examples */}
        <div className="w-[45%] bg-[#1E293B] overflow-y-auto">
          <div className="p-8">
            
            {/* Tabs */}
            <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-4">
              <div className="flex items-center bg-gray-800 p-1 rounded-lg">
                {[
                  { id: 'curl', label: 'cURL' },
                  { id: 'nodejs', label: 'Node.js' },
                  { id: 'python', label: 'Python' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    className={cn(
                      "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                      activeTab === tab.id ? "bg-gray-700 text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
                    )}
                    onClick={() => setActiveTab(tab.id as any)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button 
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                onClick={() => copyToClipboard(activeCodeExample?.code || '')}
              >
                <div className="p-1.5 bg-gray-800 rounded-md"><Copy className="w-3.5 h-3.5" /></div>
                Copy Code
              </button>
            </div>

            {/* Code Block */}
            <div className="bg-[#0F172A] rounded-xl border border-gray-700 overflow-hidden mb-8 shadow-xl">
               <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border-b border-gray-700 text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                 <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                 </div>
                 <span className="ml-2">Request Example</span>
               </div>
               <CodeBlock code={activeCodeExample?.code || ''} language={activeTab === 'curl' ? 'bash' : activeTab === 'nodejs' ? 'typescript' : 'python'} />
            </div>

            {/* Response Code Block */}
            <div className="bg-[#0F172A] rounded-xl border border-gray-700 overflow-hidden mb-8 shadow-xl">
               <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700 text-[10px] font-mono uppercase tracking-wider">
                 <span className="text-gray-400">200 OK Response</span>
                 <span className="text-green-400 font-bold">Success</span>
               </div>
               <CodeBlock language="json" code={`{
  "id": "em_9x21_vj0l",
  "address": "user-onboarding_92@tempmail.ai",
  "expires_at": "2023-10-27T14:20:00Z",
  "status": "active"
}`} />
            </div>

            {/* Developer Tip */}
            <div className="bg-blue-900/40 border border-blue-800/60 p-5 rounded-xl flex items-start gap-3 mt-12">
               <div className="bg-blue-800/50 p-2 rounded-lg text-blue-300 shadow-sm border border-blue-700/50">
                 <Lightbulb className="w-5 h-5" />
               </div>
               <div>
                  <h4 className="text-sm font-bold text-blue-100 mb-1.5">Developer Tip</h4>
                  <p className="text-xs text-blue-300 leading-relaxed mb-4">Use our official SDKs for automatic retries and built-in type safety. Available for Go, Node, and Ruby.</p>
                  <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                     <Key className="w-3.5 h-3.5" /> Copy API Key
                  </button>
               </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
