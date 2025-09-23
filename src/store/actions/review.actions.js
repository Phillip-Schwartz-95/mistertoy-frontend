import { reviewService } from '../../services/reviewService.js'
import { store } from '../store.js'
import { SET_REVIEWS, ADD_REVIEW, REMOVE_REVIEW } from '../reducers/review.reducer.js'

// Async actions
export async function loadReviews(filterBy) {
    const reviews = await reviewService.query(filterBy)
    store.dispatch({ type: SET_REVIEWS, reviews })
    return reviews
}

export async function addReview(review) {
    const savedReview = await reviewService.add(review)
    store.dispatch({ type: ADD_REVIEW, review: savedReview })
    return savedReview
}

export async function removeReview(reviewId) {
    await reviewService.remove(reviewId)
    store.dispatch({ type: REMOVE_REVIEW, reviewId })
}
