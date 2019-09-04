import React from "react"
import PropTypes from "prop-types"
import _ from "underscore"

import {
  Form,
  FormFields,
  SubmitButtonContainer,
  SubmitButton,
} from "./elements"


/**
 * A simple form that uses callback instead of default submit behavior.
 *
 * @param {object} props
 * @param {object} [props.formStyle]
 * The inline style to use on the form.
 * @param {object} [props.formFieldsStyle]
 * The inline style to use for the form fields container.
 * @param {function} props.onFormSubmitted
 * The function to invoke each time submit is called.
 * @param {function} props.onFormValid
 * The function to invoke when the form is submitted and each field has value.
 * @param {object} [props.submitButtonContainerStyle]
 * The inline style to use for the submit button container.
 * @param {object} [props.submitButtonStyle]
 * The inline style to use for the submit button.
 * @param {function} [props.submitButtonBody]
 * The react element to use for the submit button.
 * @param {function} props.children
 * The react elements to use for the form fields.
 * @param {function} [props.checkFormValid]
 * The function to invoke to determine if the form fields are valid.
 * @param {boolean} [props.checkFormCompleted]
 * Whether or not the form is deemded completed.
 *
 * @return {function} A react element with a submit button.
 */
export class SimpleForm extends React.PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    formStyle: PropTypes.object,
    formFieldsStyle: PropTypes.object,
    onFormSubmitted: PropTypes.func.isRequired,
    onFormValid: PropTypes.func.isRequired,
    onFormInvalid: PropTypes.func,
    submitButtonContainerStyle: PropTypes.object,
    submitButtonStyle: PropTypes.object,
    submitButtonBody: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    checkFormValid: PropTypes.func,
    checkFormCompleted: PropTypes.func,
  }

  static defaultProps = {
    formStyle: {},
    formFieldsStyle: {},
    submitButtonContainerStyle: {},
    submitButtonStyle: {},
    submitButtonBody: <div>Submit</div>,
    fieldTypes: ["input", "textarea"],
    onFormInvalid: (form, fields) => {},
    onFormSubmitted: (form, fields) => {},
  }

  getFormFields = (form) => {
    const { fieldTypes } = this.props

    var fields = []

    fieldTypes.forEach(fieldType => {
      fields = [
        ...fields,
        ...form.querySelectorAll(fieldType),
      ]
    })

    return fields
  }

  assertFormCompleted = (form, fields) => {
    const { checkFormCompleted } = this.props
    if (_.isFunction(checkFormCompleted)) {
      return checkFormCompleted(form, fields)
    }

    var result = true
    if (!(fields.length)) {
      result = false
    }
    fields.forEach(field => {
      if (result === false) {
        return
      }
      if (!(field.value.length)) {
        result = false
      }
    })

    return result
  }

  assertFormValid = (form, fields) => {
    const { children, checkFormValid } = this.props
    if (_.isFunction(checkFormValid)) {
      return checkFormValid(form, fields, children)
    }

    const results = React.Children.map(children, (child) => {
      const validator = child.props.validateValue
      if (_.isFunction(validator)) {
        return validator(form, fields, children)
      }
      return true
    })

    return results.every(bool => bool === true)
  }

  handleSubmit = event => {
    // Prevent the default form behavior.
    event.stopPropagation()
    event.preventDefault()

    const { onFormSubmitted, onFormValid, onFormInvalid } = this.props

    // get the dom node for the form
    const form = event.target

    // get the fields from the form
    // run a function before we try to complete the form.
    const fields = this.getFormFields(form)

    // Run a function each time submit is invoked.
    onFormSubmitted(form, fields)

      // Check that each inputs valid value is non-empty.
    if (this.assertFormCompleted(form, fields) === true) {
      if (this.assertFormValid(form, fields) === true) {
        onFormValid(form, fields)
      }
      else {
        onFormInvalid(form, fields)
      }
    }
  }

  render() {
    const {
      formStyle,
      formFieldsStyle,
      submitButtonContainerStyle,
      submitButtonStyle,
      submitButtonBody,
      children,
    } = this.props

    return (
      <Form style={formStyle} onSubmit={this.handleSubmit}>
        <FormFields style={formFieldsStyle}>
          {children}
        </FormFields>
        <SubmitButtonContainer style={submitButtonContainerStyle}>
          <SubmitButton type={"submit"} style={submitButtonStyle}>
            {submitButtonBody}
          </SubmitButton>
        </SubmitButtonContainer>
      </Form>
    )
  }
}

