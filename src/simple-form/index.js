import React from "react"
import PropTypes from "prop-types"
import _ from "underscore"

import {
  Form,
  FormFields,
  SubmitButtonContainer,
  SubmitButton,
} from "./elements"

let lastFocusedForm
let focusedForm
const focusedFormFieldKeys = {}

/**
 * A simple form.
 *
 * @param {object} props
 * @param {string} props.formName
 * @param {object} props.formStyle
 * @param {object} props.formFieldsStyle
 * @param {function} props.onFormSubmitted
 * @param {function} props.onFormCompleted
 * @param {object} props.submitButtonContainerStyle
 * @param {object} props.submitButtonStyle
 * @param {function} props.submitButtonBody
 * @param {function} props.renderSubmitButtonBody
 * @param {function|array} props.children
 * @param {function} props.onFormFieldsCompleted
 * @param {function} props.onFormFieldsValidated
 * @param {array} props.formFieldTypes
 * @param {object} props.formFieldStyle
 * @param {boolean} props.isResetWhenFinished
 */
export class SimpleForm extends React.Component {
  static propTypes = {
    formName: PropTypes.string,
    formStyle: PropTypes.object,
    formFieldsStyle: PropTypes.object,
    isFormSubmitted: PropTypes.bool.isRequired,
    setFormSubmitted: PropTypes.func.isRequired,
    onFormSubmitted: PropTypes.func,
    onFormCompleted: PropTypes.func.isRequired,
    submitButtonContainerStyle: PropTypes.object,
    submitButtonStyle: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    onFormFieldsCompleted: PropTypes.func,
    onFormFieldsValidated: PropTypes.func,
    formFieldTypes: PropTypes.arrayOf(PropTypes.oneOf([
      "input",
      "textarea",
      "select",
    ])),
    formFieldStyle: PropTypes.object,
    submitButtonBody: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    renderSubmitButtonBody: PropTypes.func,
    isResetWhenFinished: PropTypes.bool,
    onPrepare: PropTypes.func,
    onFormFinished: PropTypes.func,
    includedData: PropTypes.object,
  }

  static defaultProps = {
    onFormFinished: null,
    onPrepare: null,
    onFormSubmitted: null,
    formName: `form_${_.uniqueId()}`,
    formStyle: null,
    formFieldsStyle: null,
    formFieldStyle: null,
    submitButtonContainerStyle: null,
    submitButtonStyle: null,
    submitButtonBody: <span>Submit</span>,
    renderSubmitButtonBody: null,
    formFieldTypes: ["input", "textarea", "select"],
    onFormFieldsCompleted: null,
    onFormFieldsValidated: null,
    isResetWhenFinished: true,
    includedData: null,
  }

  constructor(props) {
    super(props)

    this.validators = []
    this.resetters = []
    this.checkers = []
    this.evaluators = []

    const { formName } = props
    lastFocusedForm = focusedForm
    focusedForm = formName
  }

  componentDidMount() {
    this.setFormSubmitted(false)
  }

  componentWillUnmount() {
    this.setFormSubmitted(false)
  }

  areFormFieldsCompleted = () => {
    const { checkers } = this
    const { onFormFieldsCompleted } = this.props
    if (_.isFunction(onFormFieldsCompleted)) {
      return onFormFieldsCompleted()
    }

    if (checkers.length) {
      return checkers.map(f => f()).every(b => b === false)
    }

    console.log("Notice: Form submissions will always fail because the form fields didn't provide a checker method.")
    return false
  }

  areFormFieldsValidated = () => {
    const { validators } = this
    const { onFormFieldsValidated } = this.props
    if (_.isFunction(onFormFieldsValidated)) {
      return onFormFieldsValidated(validators)
    }
    if (validators.length) {
      return validators.map(f => f()).every(b => b === true)
    }
    return true
  }

  setFormSubmitted = bool => {
    const {
      isFormSubmitted,
      setFormSubmitted,
    } = this.props

    if (_.isFunction(setFormSubmitted)) {
      if (isFormSubmitted !== bool) {
        setFormSubmitted(bool)
      }
    }
  }

  resetFormFields = () => {
    this.resetters.forEach(f => f())
  }

  handleFormSubmission = event => {
    const {
      onPrepare,
      onFormSubmitted,
      onFormCompleted,
      isResetWhenFinished,
      onFormFinished,
      includedData,
    } = this.props

    if (event) {
      // Prevent the default form behavior.
      event.stopPropagation()
      event.preventDefault()
    }

    // Get the DOM elements incase they are needed somewhere.

    // Run a function each time submit is invoked.
    this.setFormSubmitted(true)

    // Run our callbacks on submission
    if (_.isFunction(onFormSubmitted)) {
      onFormSubmitted()
    }

    // Check that each inputs valid value is non-empty.
    if (this.areFormFieldsCompleted() === true) {
      if (this.areFormFieldsValidated() === true) {
        // Set submission value early to prevent any error messages from
        // displaying for a second due to resetting the field values.
        this.setFormSubmitted(false)
        var prepared = this.evaluateFormFields()
        if (_.isObject(includedData)) {
          prepared = {
            ...prepared,
            ...includedData,
          }
        }
        if (_.isFunction(onPrepare)) {
          prepared = onPrepare(prepared)
        }
        onFormCompleted(prepared)
        if (isResetWhenFinished === true) {
          this.resetFormFields()
        }
        if (_.isFunction(onFormFinished)) {
          onFormFinished()
        }
      }
    }

    // Automatically focus the first form field after each sumission to prevent
    // any focus bugs from showing up during the event.
    this.setFocusedKey(0)
  }

  renderSubmitButton = () => {
    const {
      submitButtonContainerStyle,
      submitButtonStyle,
      submitButtonBody,
      renderSubmitButtonBody,
    } = this.props

    var renderedSubmitButtonBody = submitButtonBody
    if (_.isFunction(renderSubmitButtonBody)) {
      renderedSubmitButtonBody = renderSubmitButtonBody()
    }

    return (
      <SubmitButtonContainer css={submitButtonContainerStyle}>
        <SubmitButton
          type={"submit"}
          css={submitButtonStyle}>
          {renderedSubmitButtonBody}
        </SubmitButton>
      </SubmitButtonContainer>
    )
  }

  setFocusedKey = key => {
    const { formName } = this.props
    focusedFormFieldKeys[formName] = key
  }

  getFocusedKey = () => {
    const { formName } = this.props
    if (!(formName in focusedFormFieldKeys)) {
      focusedFormFieldKeys[formName] = 0
    }
    return focusedFormFieldKeys[formName]
  }

  addFormFieldMethod = (arr, func) => {
    if (arr.indexOf(func) === -1) {
      arr.push(func)
    }
  }

  removeFormFieldMethod = (arr, func) => {
    const i = arr.indexOf(func)
    if (i > -1) {
      arr.splice(i, 1)
    }
  }

  evaluateFormFields = () => {
    var data = {}
    this.evaluators.forEach(f => {
      const { name, value } = f()
      data[name] = value
    })
    return data
  }

  renderFormFields = () => {
    const {
      children,
      formFieldStyle,
      isFormSubmitted,
      setFormSubmitted,
      formName,
    } = this.props

    const isFormFocused = (focusedForm === formName)

    return React.Children.map(children, (child, i) => {
      const focusedKey = this.getFocusedKey()

      var isCurrentInputFocused = false
      if (isFormFocused === true) {
        isCurrentInputFocused = (focusedKey === i)
      }

      return React.cloneElement(child, {
        key: _.uniqueId(),
        containerStyle: formFieldStyle,
        isFormSubmitted,
        setFormSubmitted,
        setFormFocused: () => {
          focusedForm = formName
        },
        isCurrentInputFocused,
        setCurrentInputFocused: () => {
          this.setFocusedKey(i)
        },
        setCurrentInputBlurred: () => {
          this.setFocusedKey("")
        },
        setNextInputFocused: () => {
          const nextInputKey = (i + 1)
          this.setFocusedKey(nextInputKey)
        },
        setLastInputFocused: () => {
          var lastInputKey = (i - 1)
          if (lastInputKey < 0) {
            lastInputKey = 0
          }
          this.setFocusedKey(lastInputKey)
        },
        addChecker: f => {
          this.addFormFieldMethod(this.checkers, f)
        },
        removeChecker: f => {
          this.removeFormFieldMethod(this.checkers, f)
        },
        addResetter: f => {
          this.addFormFieldMethod(this.resetters, f)
        },
        removeResetter: f => {
          this.removeFormFieldMethod(this.resetters, f)
        },
        addValidator: f => {
          this.addFormFieldMethod(this.validators, f)
        },
        removeValidator: f => {
          this.removeFormFieldMethod(this.validators, f)
        },
        addEvaluator: f => {
          this.addFormFieldMethod(this.evaluators, f)
        },
        removeEvaluator: f => {
          this.removeFormFieldMethod(this.evaluators, f)
        },
      })
    })
  }

  render() {
    const {
      formStyle,
      formFieldsStyle,
    } = this.props

    const renderedSubmitButton = this.renderSubmitButton()
    const renderedFormFields = this.renderFormFields()

    return (
      <Form
        css={formStyle}
        onSubmit={this.handleFormSubmission}>
        <FormFields css={formFieldsStyle}>
          {renderedFormFields}
        </FormFields>
        {renderedSubmitButton}
      </Form>
    )
  }
}

