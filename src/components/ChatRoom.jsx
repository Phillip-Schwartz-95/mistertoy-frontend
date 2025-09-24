import { useEffect, useState } from 'react'
import { socketService } from '../services/socketService.js'
import { userService } from '../services/userService.js'

export default function ChatRoom({ toyId }) {
  const [msgs, setMsgs] = useState([])
  const [txt, setTxt] = useState('')
  const [typingUser, setTypingUser] = useState(null)

  const user = userService.getLoggedInUser()

  useEffect(() => {
    socketService.setup()
    socketService.emit('join-topic', toyId)

    socketService.on('chat-msg', msg => {
      setMsgs(prev => [...prev, msg])
    })

    socketService.on('user-typing', username => {
      setTypingUser(username)
      setTimeout(() => setTypingUser(null), 2000)
    })

    return () => {
      socketService.terminate()
    }
  }, [toyId])

  function sendMsg(ev) {
    ev.preventDefault()
    if (!txt) return
    const msg = { from: user?.fullname || 'Guest', txt }
    socketService.emit('chat-msg', msg)
    setTxt('')
  }

  function handleTyping() {
    socketService.emit('typing', user?.fullname || 'Guest')
  }

  return (
    <section className="chat-room">
      <h3>Chat about this toy</h3>
      <ul>
        {msgs.map((msg, idx) => (
          <li key={idx}>
            <strong>{msg.from}:</strong> {msg.txt}
          </li>
        ))}
      </ul>
      {typingUser && <p>{typingUser} is typing…</p>}
      <form onSubmit={sendMsg}>
        <input
          value={txt}
          onChange={e => setTxt(e.target.value)}
          onKeyDown={handleTyping}
          placeholder="Type a message..."
        />
        <button>Send</button>
      </form>
    </section>
  )
}