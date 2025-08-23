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
} from '../reducers/toy.reducer.js'

export function loadToys() {
    return dispatch => {
        const { filterBy, sortBy } = store.getState().toyModule
        console.log('filterBy:', filterBy, 'sortBy:', sortBy)
        dispatch({ type: SET_TOY_LOADING, isLoading: true })

        return toyService.query(filterBy, sortBy)
            .then(toys => {
                dispatch({ type: SET_TOYS, toys })
            })
            .catch(err => {
                console.log('toy action -> Cannot load toys', err)
                throw err
            })
            .finally(() => {
                dispatch({ type: SET_TOY_LOADING, isLoading: false })
            })
    }
}

export function removeToy(toyId) {
    return dispatch => {
        return toyService.remove(toyId)
            .then(() => {
                dispatch({ type: REMOVE_TOY, toyId })
            })
            .catch(err => {
                console.log('toy action -> Cannot remove toy', err)
                throw err
            })
    }
}

export function removeToyOptimistic(toyId) {
    return dispatch => {
        dispatch({ type: REMOVE_TOY, toyId }) // Optimistic update

        return toyService.remove(toyId)
            .then(() => {
                console.log('Removed Toy!')
            })
            .catch(err => {
                dispatch({ type: TOY_UNDO }) // Rollback
                console.log('toy action -> Cannot remove toy', err)
                throw err
            })
    }
}

export function saveToy(toy) {
    return dispatch => {
        const type = toy._id ? UPDATE_TOY : ADD_TOY

        return toyService.save(toy)
            .then(savedToy => {
                dispatch({ type, toy: savedToy })
                return savedToy
            })
            .catch(err => {
                console.log('toy action -> Cannot save toy', err)
                throw err
            })
    }
}

export function setToyFilter(filterBy) {
    return dispatch => {
        dispatch({ type: SET_TOY_FILTER, filterBy })
    }
}

export function setToySort(sortBy) {
    return dispatch => {
        dispatch({ type: SET_TOY_SORT, sortBy })
    }
}