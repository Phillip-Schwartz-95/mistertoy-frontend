import { toyService } from '../../services/toy.service.js'
import { store } from '../store.js'
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
  const filterBy = store.getState().toyModule.filterBy
  store.dispatch({ type: SET_TOY_LOADING, isLoading: true })

  return toyService.query(filterBy)
    .then(toys => {
      store.dispatch({ type: SET_TOYS, toys })
    })
    .catch(err => {
      console.log('toy action -> Cannot load toys', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_TOY_LOADING, isLoading: false })
    })
}

export function removeToy(toyId) {
  return toyService.remove(toyId)
    .then(() => {
      store.dispatch({ type: REMOVE_TOY, toyId })
    })
    .catch(err => {
      console.log('toy action -> Cannot remove toy', err)
      throw err
    })
}

export function removeToyOptimistic(toyId) {
  store.dispatch({ type: REMOVE_TOY, toyId })
  return toyService.remove(toyId)
    .then(() => {
      console.log('Removed Toy!')
    })
    .catch(err => {
      store.dispatch({ type: TOY_UNDO })
      console.log('toy action -> Cannot remove toy', err)
      throw err
    })
}

export function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  return toyService.save(toy)
    .then(savedToy => {
      store.dispatch({ type, toy: savedToy })
      return savedToy
    })
    .catch(err => {
      console.log('toy action -> Cannot save toy', err)
      throw err
    })
}

export function setToyFilter(filterBy) {
  store.dispatch({ type: SET_TOY_FILTER, filterBy })
}
