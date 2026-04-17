export default function AboutPage() {
  return (
    <div className="flex flex-col bg-white">
      <main className="flex-1 pt-14">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">About TempMail AI</h1>
          <div className="prose prose-lg text-gray-600">
            <p>
              We built TempMail AI because privacy shouldn&apos;t be an afterthought. In an era where every signup requires an email address and data breaches are common, protecting your primary inbox is essential.
            </p>
            <p>
              Our mission is to provide developers and users with a robust, instant, and frictionless disposable email service. Whether you&apos;re testing an onboarding flow in your application or signing up for a newsletter you don&apos;t fully trust, TempMail AI provides a secure buffer.
            </p>
            <h2>Built for Scale</h2>
            <p>
              We process millions of emails daily through our highly optimized WebSocket architecture, ensuring that the moment an email hits our servers, it is piped directly to your screen in milliseconds.
            </p>
            <h2>Zero Persistence</h2>
            <p>
              Privacy is guaranteed by our architecture. We do not write the contents of your temporary emails to disk. Everything lives in volatile memory and is permanently purged according to strict TTL (Time To Live) policies.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
