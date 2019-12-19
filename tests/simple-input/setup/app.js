import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { SimpleForm, SimpleInput } from "src"
import * as appActions from "./redux/actions"

const App = ({
  isFormSubmitted,
  setFormSubmitted,
  onFormCompleted,
  ...restProps
}) => (
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
      {...restProps}
    />
  </SimpleForm>
)

const mapState = state => ({
  ...state.app,
})

const mapDispatch = dispatch => bindActionCreators(appActions, dispatch)

export default connect(mapState, mapDispatch)(App)
