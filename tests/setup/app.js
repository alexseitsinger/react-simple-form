import React from "react"
import { SimpleInput } from "@alexseitsinger/react-simple-input"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import * as actions from "./redux/actions"
import { SimpleForm } from "@src/simple-form"

export const App = ({
  onFormFinished,
  onFormCompleted,
  onFormSubmitted,
  setFormSubmitted,
  isFormSubmitted,
  onPrepare,
  includedData,
  renderSubmitButtonBody,
  ...restProps
}) => (
  <SimpleForm
    includedData={includedData}
    onPrepare={onPrepare}
    renderSubmitButtonBody={renderSubmitButtonBody}
    isFormSubmitted={isFormSubmitted}
    onFormSubmitted={onFormSubmitted}
    setFormSubmitted={setFormSubmitted}
    onFormCompleted={onFormCompleted}
    onFormFinished={onFormFinished}>
    <SimpleInput
      {...restProps}
      inputName={"name"}
      inputType={"text"}
      inputPlaceholder={"Name"}
      resetValue={""}
      errorPosition={"centerLeft"}
      errorStyle={{
        //...
      }}
    />
  </SimpleForm>
)

const mapState = state => ({
  ...state.app,
})

const mapDispatch = dispatch => bindActionCreators({
  ...actions,
}, dispatch)

export default connect(mapState, mapDispatch)(App)
