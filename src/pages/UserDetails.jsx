import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { userService } from '../services/userService.js'
import { reviewService } from '../services/reviewService.js'

export default function UserDetails() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState([])

  async function loadUser(userId) {
    try {
      const u = await userService.getById(userId)
      setUser(u)
    } catch (err) {
      console.error('Cannot load user', err)
    }
  }

  async function loadReviews(userId) {
    try {
      const r = await reviewService.query({ userId })
      setReviews(r)
    } catch (err) {
      console.error('Cannot load user reviews', err)
    }
  }

  useEffect(() => {
    loadUser(userId)
    loadReviews(userId)
  }, [userId])

  if (!user) return <div>Loading...</div>

  return (
    <section className="user-details">
      <h2>{user.fullname}</h2>
      <p>Username: {user.username}</p>

      <h3>Reviews by {user.fullname}</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map(r => (
            <li key={r._id}>
              On <strong>{r.toy.name}</strong>: {r.txt}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
