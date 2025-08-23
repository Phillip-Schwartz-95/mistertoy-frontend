import { useState } from 'react'

export default function Chat() {
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')

  function handleSend(ev) {
    ev.preventDefault()
    if (!input.trim()) return

    const userMsg = { from: 'user', text: input }
    setMsgs(prev => [...prev, userMsg])
    setInput('')

    // Auto response with delay
    setTimeout(() => {
      const botMsg = { from: 'bot', text: `You said: "${userMsg.text}"` }
      setMsgs(prev => [...prev, botMsg])
    }, 1000)
  }

  return (
    <div className="chat">
      <ul className="chat-msgs">
        {msgs.map((msg, idx) => (
          <li key={idx} className={msg.from}>
            <strong>{msg.from === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSend}>
        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
