const greetings = [
    { type: 'Birthday Wish', status: 'Delivered' },
    { type: 'Anniversary Card', status: 'Scheduled' },
    { type: 'Holiday Greetings', status: 'Scheduled' }
  ]
  
  export function ScheduledGreetings() {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Scheduled Greetings</h2>
        <div className="space-y-3">
          {greetings.map((greeting, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-skin-dark-border rounded-lg"
            >
              <span>{greeting.type}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  greeting.status === 'Delivered'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {greeting.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  