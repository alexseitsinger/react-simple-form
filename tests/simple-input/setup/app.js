import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { SimpleForm, SimpleInput } from "src"

import * as appActions from "./redux/actions"

const App = props => {
  const {
    isFormSubmitted,
    setFormSubmitted,
    onFormCompleted,
    ...restProps
  } = props

  return (
    <SimpleForm
      isFormSubmitted={isFormSubmitted}
      setFormSubmitted={setFormSubmitted}
      onFormCompleted={onFormCompleted}>
      <SimpleInput
        inputName={"name"}
        inputType={"text"}
        inputPlaceholder={"Name"}
        resetValue={""}
        errorPosition={"centerLeft"}
        errorStyle={{
          //...
        }}
        {...restProps}
      />
    </SimpleForm>
  )
}

const mapState = state => ({
  ...state.app,
})

const mapDispatch = dispatch => bindActionCreators({
  ...appActions,
}, dispatch)

export default connect(mapState, mapDispatch)(App)
