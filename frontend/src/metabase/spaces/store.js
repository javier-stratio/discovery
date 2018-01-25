import { appReducer } from './logic'
import { curiReducer } from '@curi/redux'
import { createStore, combineReducers } from 'redux'

import { loadState, saveState } from './storage'

const reducer = combineReducers({
    // app logic
    app: appReducer,
    // routing logic via curi
    curi: curiReducer
})

const persistedState = loadState()

const store = createStore(
    reducer,
    persistedState
)

// todo ? maybe throttle?
store.subscribe(() => {
    saveState(store.getState())
})

export default store
