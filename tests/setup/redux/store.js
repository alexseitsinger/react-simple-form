import {
  compose,
  applyMiddleware,
  createStore as createReduxStore,
} from "redux"
import thunk from "redux-thunk"
import { combineReducers } from "redux"

import { appReducer } from "./reducer"

export default (initialState = {}) => {
  const rootReducer = combineReducers({
    app: appReducer,
  })
  const middleware = [thunk]
  const storeEnhancers = compose(applyMiddleware(...middleware))
  const store = createReduxStore(rootReducer, initialState, storeEnhancers)
  return store
}

