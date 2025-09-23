import { createStore, combineReducers, compose } from 'redux'
import { toyReducer } from './reducers/toy.reducer.js'
import { reviewReducer } from './reducers/review.reducer.js'

const rootReducer = combineReducers({
    toyModule: toyReducer,
    reviewModule: reviewReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    rootReducer,
    composeEnhancers() // no thunk
)

window.gStore = store
