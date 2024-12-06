import { Send, LayoutTemplateIcon as Template, Clock, UserCheck } from 'lucide-react'

const stats = [
  { icon: Send, label: 'Sent Greetings', value: '152' },
  { icon: Template, label: 'Popular Template', value: 'Birthday Bash' },
  { icon: Clock, label: 'Avg. Response Time', value: '2 days' },
  { icon: UserCheck, label: 'User Satisfaction', value: '98%' }
]

export function Statistics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map(({ icon: Icon, label, value }, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center"
        >
          <Icon size={24} className="text-skin-accent mb-2" />
          <div className="text-sm text-skin-dark-text">{label}</div>
          <div className="text-xl font-semibold text-skin-text mt-1">{value}</div>
        </div>
      ))}
    </div>
  )
}

