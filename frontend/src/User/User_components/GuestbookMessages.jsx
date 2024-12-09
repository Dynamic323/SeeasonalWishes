const messages = [
    'Thank you for the lovely card!',
    'Your message made my day!',
    'So thoughtful of you!'
  ]
  
  export function GuestbookMessages() {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Guestbook Messages</h2>
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className="p-3 border border-skin-dark-border rounded-lg"
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  