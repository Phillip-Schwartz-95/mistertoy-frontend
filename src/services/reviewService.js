// services/reviewService.js
import { httpService } from './httpService.js'

const BASE_ENDPOINT = 'review/'

export const reviewService = {
    query,
    add,
    remove
}

function query(filterBy = {}) {
    return httpService.get(BASE_ENDPOINT, filterBy)
}

function add(review) {
    return httpService.post(BASE_ENDPOINT, review)
}

function remove(reviewId) {
    return httpService.delete(BASE_ENDPOINT + reviewId)
}
