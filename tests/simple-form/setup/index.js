import React from "react"
import { Provider } from "react-redux"

import createStore from "./redux/store"
import App from "./app"

export default props => {
  const store = createStore()
  const wrapper = mount(
    <Provider store={store}>
      <App {...props} />
    </Provider>
  )
  return {
    store,
    wrapper,
  }
}


