import { Shield, Zap, Clock, UserX } from 'lucide-react'

const features = [
  {
    icon: <Shield className="w-6 h-6 text-primary-600" />,
    title: 'End-to-End Privacy',
    description: 'Your data is never stored on our physical drives. Everything exists in a volatile memory layer that evaporates when the timer hits zero.',
  },
  {
    icon: <Zap className="w-6 h-6 text-amber-500" />,
    title: 'Real-time Delivery',
    description: 'Websocket architecture ensures your emails arrive the millisecond they are sent. No manual refreshing needed for your verification codes.',
  },
  {
    icon: <Clock className="w-6 h-6 text-green-500" />,
    title: 'Auto-Destructing',
    description: 'Every mailbox and its contents are mathematically guaranteed to be wiped after 24 hours. No traces left behind.',
  },
  {
    icon: <UserX className="w-6 h-6 text-purple-500" />,
    title: 'No Registration Required',
    description: 'Generate an email instantly. We don\'t ask for your personal data, passwords, or phone number.',
  },
]

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto -mt-16 relative z-10 px-4">
      {features.map((feature, idx) => (
        <div key={idx} className="feature-card">
          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-2">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
          <p className="text-gray-500 leading-relaxed text-sm">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  )
}
