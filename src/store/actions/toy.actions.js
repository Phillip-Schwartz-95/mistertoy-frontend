import { toyService } from '../../services/toyService.js'
import { store } from '../toy.store.js'
import {
    SET_TOYS,
    REMOVE_TOY,
    ADD_TOY,
    UPDATE_TOY,
    TOY_UNDO,
    SET_TOY_FILTER,
    SET_TOY_LOADING,
    SET_TOY_SORT,
} from '../reducers/toy.reducer.js'

// SYNCHRONOUS ACTIONS

export function setToys(toys) {
    store.dispatch({ type: SET_TOYS, toys })
}

export function removeToySync(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
}

export function addToy(toy) {
    store.dispatch({ type: ADD_TOY, toy })
}

export function updateToy(toy) {
    store.dispatch({ type: UPDATE_TOY, toy })
}

export function undoToy() {
    store.dispatch({ type: TOY_UNDO })
}

export function setToyFilter(filterBy) {
    store.dispatch({ type: SET_TOY_FILTER, filterBy })
}

export function setToySort(sortBy) {
    store.dispatch({ type: SET_TOY_SORT, sortBy })
}

export function setToyLoading(isLoading) {
    store.dispatch({ type: SET_TOY_LOADING, isLoading })
}

// ASYNC OPERATIONS MOVED TO COMPONENTS

// Example usage in components:
// toyService.query(filterBy, sortBy).then(toys => setToys(toys))
// toyService.remove(toyId).then(() => removeToySync(toyId))
// toyService.save(toy).then(savedToy => { toy._id ? updateToy(savedToy) : addToy(savedToy) })
