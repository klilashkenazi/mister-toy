import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { toyReducer } from "./reducers/toy.reducer"
import { userReducer } from "./reducers/user.reducer"
import { reviewReducer } from "./reducers/review.reducer"


const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    reviewModule: reviewReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

// console.log('store.getState():', store.getState())
window.gStore = store


// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })

