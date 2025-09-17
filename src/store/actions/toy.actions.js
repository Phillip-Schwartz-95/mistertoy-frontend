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

// Async Actions
export async function loadToys(filterBy, sortBy) {
    store.dispatch({ type: SET_TOY_LOADING, isLoading: true })
    try {
        const toys = await toyService.query(filterBy, sortBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.error('Failed to load toys:', err)
        throw err
    } finally {
        store.dispatch({ type: SET_TOY_LOADING, isLoading: false })
    }
}

export async function saveToy(toy) {
    try {
        const savedToy = await toyService.save(toy)
        if (toy._id) store.dispatch({ type: UPDATE_TOY, toy: savedToy })
        else store.dispatch({ type: ADD_TOY, toy: savedToy })
        return savedToy
    } catch (err) {
        console.error('Failed to save toy:', err)
        throw err
    }
}

export async function deleteToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.error('Failed to delete toy:', err)
        throw err
    }
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
