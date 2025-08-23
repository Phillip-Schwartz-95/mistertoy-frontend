import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { thunk } from 'redux-thunk' // Correct import
import { toyReducer } from './reducers/toy.reducer.js'

const rootReducer = combineReducers({
  toyModule: toyReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) // thunk applied here
)

window.gStore = store

