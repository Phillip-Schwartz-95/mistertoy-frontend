import { useEffect, useState } from 'react'
import { reviewService } from '../services/reviewService.js'
import { userService } from '../services/userService.js'

export default function ReviewExplore() {
    const [reviews, setReviews] = useState([])
    const [filterTxt, setFilterTxt] = useState('')
    const user = userService.getLoggedInUser()

    async function loadReviews() {
        try {
            const all = await reviewService.query()
            setReviews(all)
        } catch (err) {
            console.error('Cannot load reviews', err)
        }
    }

    useEffect(() => {
        loadReviews()
    }, [])

    const filtered = filterTxt
        ? reviews.filter(r =>
            r.txt.toLowerCase().includes(filterTxt.toLowerCase()) ||
            r.user.fullname.toLowerCase().includes(filterTxt.toLowerCase()) ||
            r.toy.name.toLowerCase().includes(filterTxt.toLowerCase())
        )
        : reviews

    async function onRemoveReview(reviewId) {
        try {
            await reviewService.remove(reviewId)
            setReviews(prev => prev.filter(r => r._id !== reviewId))
        } catch (err) {
            console.error('Failed to delete review', err)
        }
    }

    return (
        <section className="review-explore">
            <h2>Explore Reviews</h2>
            <input
                type="text"
                placeholder="Filter by text, user, or toy..."
                value={filterTxt}
                onChange={e => setFilterTxt(e.target.value)}
            />

            {filtered.length === 0 ? (
                <p>No reviews found.</p>
            ) : (
                <ul>
                    {filtered.map(r => (
                        <li key={r._id}>
                            <strong>{r.user.fullname}</strong> on{' '}
                            <em>{r.toy.name}</em>: {r.txt}
                            {(user?.isAdmin || user?._id === r.user._id) && (
                                <button onClick={() => onRemoveReview(r._id)}>Delete</button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
