import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toyService } from '../services/toyService.js'
import { reviewService } from '../services/reviewService.js'
import { userService } from '../services/userService.js'
import Popup from '../components/Popup.jsx'
import Chat from '../components/Chat.jsx'

export default function ToyDetails() {
  const { toyId } = useParams()
  const [toy, setToy] = useState(null)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState('')
  const [newMsg, setNewMsg] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)

  const user = userService.getLoggedInUser()

  useEffect(() => {
    const loadToy = async () => {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    }
    const loadReviews = async () => {
      const reviews = await reviewService.query({ toyId })
      setReviews(reviews)
    }
    loadToy()
    loadReviews()
  }, [toyId])

  async function onAddReview(ev) {
    ev.preventDefault()
    if (!user) return alert('Login required')
    try {
      const review = await reviewService.add({ txt: newReview, toyId })
      setReviews(prev => [...prev, review])
      setNewReview('')
    } catch (err) {
      console.error('Failed to add review', err)
    }
  }

  async function onAddMsg(ev) {
    ev.preventDefault()
    if (!user) return alert('You must be logged in to add a message')

    try {
      const msg = await toyService.addMsg(toyId, newMsg)   // call backend
      setToy(prev => ({ ...prev, msgs: [...(prev.msgs || []), msg] }))
      setNewMsg('')
    } catch (err) {
      console.error('Cannot add message', err)
    }
  }

  async function onRemoveReview(reviewId) {
    try {
      await reviewService.remove(reviewId)
      setReviews(prev => prev.filter(r => r._id !== reviewId))
    } catch (err) {
      console.error('Failed to delete review', err)
    }
  }

  if (!toy) return <div>Loading...</div>

  return (
    <>
      <section className="toy-details">
        <h2>{toy.name}</h2>
        {toy.imgUrl && <img src={toy.imgUrl} alt={toy.name} />}
        <p>Price: ${toy.price}</p>
        <p>Labels: {toy.labels.join(', ')}</p>
        <p>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>


        {/* Messages map */}
        <h3>Messages</h3>
        <ul>
          {toy.msgs?.map(msg => (
            <li key={msg.id}>
              <strong>{msg.by?.fullname || 'Anonymous'}:</strong> {msg.txt}
            </li>
          ))}
        </ul>

        {/* Add message form for users */}
        {user ? (
          <form onSubmit={onAddMsg}>
            <input
              type="text"
              value={newMsg}
              onChange={e => setNewMsg(e.target.value)}
              placeholder="Write a message..."
              required
            />
            <button type="submit">Send</button>
          </form>
        ) : (
          <p style={{ color: 'gray' }}>Login to add a message</p>
        )}

        {/* Reviews Map */}
        <h4>Reviews</h4>
        <ul>
          {reviews.map(r => (
            <li key={r._id}>
              <strong>{r.user.fullname}:</strong> {r.txt}
              {(user?.isAdmin || user?._id === r.user._id) && (
                <button onClick={() => onRemoveReview(r._id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>

        {/* Add Review Form */}
        {user ? (
          <form onSubmit={onAddReview}>
            <input
              type="text"
              value={newReview}
              onChange={e => setNewReview(e.target.value)}
              placeholder="Write a review..."
              required
            />
            <button type="submit">Post Review</button>
          </form>
        ) : (
          <p style={{ color: 'gray' }}>Login to add a review</p>
        )}

        {/* Chat button */}
        <button onClick={() => setIsChatOpen(true)}>💬 Chat</button>

        {isChatOpen && (
          <Popup
            heading="Toy Chat"
            footer={<button onClick={() => setIsChatOpen(false)}>Close</button>}
            onClose={() => setIsChatOpen(false)}
          >
            <Chat />
          </Popup>
        )}
      </section>

    </>
  )
}
