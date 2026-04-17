

export default function PrivacyPage() {
  return (
    <div className="flex flex-col bg-white">
      <main className="flex-1 pt-14">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 mb-10">Last updated: October 2023</p>
          
          <div className="prose prose-lg text-gray-600">
            <p>
              At TempMail AI, privacy is not just a feature; it is the core foundation of our service. Our entire infrastructure is designed around the concept of transient data.
            </p>
            
            <h3>1. Data Collection</h3>
            <p>
              We do not collect personal information. Using our core service requires no registration, no name, and no passwords. We log standard server telemetry (such as error rates and connection status) for operational security, but these logs are anonymized and contain no email contents.
            </p>
            
            <h3>2. Email Content and Attachments</h3>
            <p>
              Emails received by our servers are stored entirely in RAM (volatile memory). We actively prevent emails from being written to persistent storage devices (like HDDs or SSDs). Once the lifecycle of an email concludes (maximum 24 hours), the memory structure is released and overwritten. The data is mathematically unrecoverable.
            </p>

            <h3>3. Tracking and Cookies</h3>
            <p>
              We use functional cookies required to establish your session with our WebSocket servers so you can view your inbox. We do not use third-party tracking cookies or sell any session data to advertisers.
            </p>

            <h3>4. Security Measures</h3>
            <p>
              All connections to our service are encrypted using TLS 1.3. While data is in transit between the sender and our servers, we opportunistically use TLS if the sender supports it.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
