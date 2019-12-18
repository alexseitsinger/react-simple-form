import React from "react"
import PropTypes from "prop-types"
import { isFunction, uniqueId } from "underscore"

import { SimpleInputError } from "src"
import { Container, Input } from "./elements"
import { Context } from "src/simple-form"

const inputPropsShape = PropTypes.shape({
  accept: PropTypes.oneOf([
    "audio/*",
    "video/*",
    "image/*",
  ]),
  alt: PropTypes.string,
  autocomplete: PropTypes.oneOf([
    "on",
    "off",
  ]),
  autofocus: PropTypes.oneOf(["autofocus"]),
  checked: PropTypes.oneOf(["checked"]),
  dirname: PropTypes.string,
  disabled: PropTypes.oneOf(["disabled"]),
  form: PropTypes.string,
  formaction: PropTypes.string,
  formenctype: PropTypes.oneOf([
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain",
  ]),
  formmethod: PropTypes.oneOf([
    "get",
    "post",
  ]),
  formnovalidate: PropTypes.oneOf([
    "formnovalidate",
  ]),
  formtarget: PropTypes.oneOf([
    "_blank",
    "_self",
    "_parent",
    "_top",
  ]),
  height: PropTypes.number,
  list: PropTypes.string,
  max: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  maxlength: PropTypes.number,
  min: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  multiple: PropTypes.oneOf([
    "multiple",
  ]),
  name: PropTypes.string,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  readonly: PropTypes.oneOf([
    "readonly",
  ]),
  required: PropTypes.oneOf([
    "required",
  ]),
  size: PropTypes.number,
  src: PropTypes.string,
  step: PropTypes.number,
  type: PropTypes.oneOf([
    "button",
    "checkbox",
    "color",
    "date",
    "datetime-local",
    "email",
    "file",
    "hidden",
    "image",
    "month",
    "number",
    "password",
    "radio",
    "range",
    "reset",
    "search",
    "submit",
    "tel",
    "text",
    "time",
    "url",
    "week",
  ]),
  value: PropTypes.string,
  width: PropTypes.number,
})


export class SimpleInput extends React.Component {
  static propTypes = {
    isFormSubmitted: PropTypes.bool,
    setFormSubmitted: PropTypes.func,
    errorMessage: PropTypes.string.isRequired,
    setErrorMessage: PropTypes.func.isRequired,
    errorPosition: PropTypes.string,
    errorStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    inputPlaceholder: PropTypes.string,
    inputValue: PropTypes.string.isRequired,
    setInputValue: PropTypes.func.isRequired,
    isInputEmpty: PropTypes.bool.isRequired,
    setInputEmpty: PropTypes.func.isRequired,
    inputType: PropTypes.string,
    inputName: PropTypes.string,
    containerStyle: PropTypes.object,
    setValueValid: PropTypes.func,
    isValueValid: PropTypes.bool,
    onValidate: PropTypes.func,
    onSanitize: PropTypes.func,
    onDidSanitize: PropTypes.func,
    isCurrentInputFocused: PropTypes.bool,
    setCurrentInputFocused: PropTypes.func,
    isCurrentInputBlurred: PropTypes.bool,
    setCurrentInputBlurred: PropTypes.func,
    setNextInputFocused: PropTypes.func,
    setLastInputFocused: PropTypes.func,
    renderInput: PropTypes.func,
    renderError: PropTypes.func,
    addValidator: PropTypes.func,
    removeValidator: PropTypes.func,
    addResetter: PropTypes.func,
    removeResetter: PropTypes.func,
    addEvaluator: PropTypes.func,
    removeEvaluator: PropTypes.func,
    onNormalize: PropTypes.func,
    addChecker: PropTypes.func,
    removeChecker: PropTypes.func,
    onCheck: PropTypes.func,
    resetValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    onChange: PropTypes.func,
    onEvaluate: PropTypes.func,
    minLength: PropTypes.number,
    minLengthErrorMessage: PropTypes.string,
    maxLength: PropTypes.number,
    maxLengthErrorMessage: PropTypes.string,
    isDisabled: PropTypes.bool,
    onDidMount: PropTypes.func,
    inputEmptyErrorMessage: PropTypes.string,
    inputProps: inputPropsShape,
    isOptional: PropTypes.bool,
    isResetSkipped: PropTypes.bool,
    isAutoSubmitted: PropTypes.bool,
    handleFormSubmission: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isAutoSubmitted: false,
    isResetSkipped: false,
    isOptional: false,
    inputProps: {},
    isFormSubmitted: false,
    setFormSubmitted: () => {},
    setCurrentInputFocused: () => {},
    isCurrentInputFocused: false,
    isCurrentInputBlurred: false,
    setCurrentInputBlurred: () => {},
    setNextInputFocused: () => {},
    setLastInputFocused: () => {},
    inputEmptyErrorMessage: null,
    onDidMount: null,
    isDisabled: false,
    minLength: 8,
    minLengthErrorMessage: null,
    maxLength: 24,
    maxLengthErrorMessage: null,
    resetValue: "",
    onEvaluate: null,
    onChange: null,
    inputPlaceholder: "",
    inputType: "text",
    inputStyle: {},
    inputName: uniqueId(),
    errorStyle: {},
    errorPosition: "centerLeft",
    containerStyle: {},
    onValidate: null,
    isValueValid: true,
    setValueValid: () => {},
    onSanitize: null,
    onDidSanitize: null,
    renderInput: null,
    renderError: null,
    addValidator: null,
    removeValidator: null,
    addResetter: null,
    removeResetter: null,
    addEvaluator: null,
    removeEvaluator: null,
    onNormalize: null,
    addChecker: null,
    removeChecker: null,
    onCheck: null,
  }

  componentDidMount() {
    const {
      addValidator,
      addResetter,
      addEvaluator,
      addChecker,
      onDidMount,
    } = this.props

    // Whenever this component gets mounted, we want to save a reference to
    // certain methods on the SImpleForm instance, so it can process the fields
    // when the form gets submitted.
    addValidator(this.doesSanitizedValueValidate)
    addResetter(this.resetInputValue)
    addEvaluator(this.evaluate)
    addChecker(this.checkValueForEmptiness)

    // Our Picture input field needs to resetInputValue the input field outside
    // the normal flow. Since its a superset of this class, we need to pass the
    // instance method when this gets mounted so it can use it when its ready.
    if (isFunction(onDidMount)) {
      onDidMount(this)
    }

    // Each time the props change from our redux store, this component is
    // remounted. Therefore, in order to maintain focus on the correct element
    // between input value changes, we need to autoamtically toggle DOM focus
    // based on the dynamic currentInputFocused prop that gets passed from our
    // SimpleForm parent component to this one.
    this.setDOMFocus()
  }

  componentDidUpdate(prevProps) {
    // Everytime our redux store changes props, this componnet gets re-mounted
    // and updated. When this happens, we may have formFieldErrors displayed. In
    // order to remove these errors after a change occurs, we need to set
    // isFormSubmitted back to false.
    const { inputValue } = this.props

    if (prevProps.inputValue !== inputValue) {
      this.handleSetFormSubmitted(false)
    }
  }

  componentWillUnmount() {
    const {
      removeValidator,
      removeResetter,
      removeEvaluator,
      removeChecker,
    } = this.props

    // Once this component gets unmounted, we want to remove the references to
    // the old, stale instance methods on the parent SimpleForm to prevent
    // memory leaks.
    removeValidator(this.doesSanitizedValueValidate)
    removeResetter(this.resetInputValue)
    removeEvaluator(this.evaluate)
    removeChecker(this.checkValueForEmptiness)
  }

  inputRef = React.createRef()

  /**
   * Returns the current DOM element's value, based on the input type. This
   * value should not be used directly. Instead, access the current DOM value
   * through through the getSanitizedValue() method to avoid passing potentially
   * harmful values.
   */
  getOriginalValue = () => {
    const { current } = this.inputRef
    if (!current) {
      return
    }
    switch (current.type) {
      default: {
        return current.value
      }
      case "checkbox": {
        return Boolean(current.checked)
      }
      case "text":
      case "number":
      case "tel":
      case "email":
      case "password": {
        return current.value
      }
      case "file": {
        return current.files
      }
    }
  }

  usesBooleanValue = () => {
    const { current } = this.inputRef
    return (current.type === "checkbox")
  }

  /**
   * Converts the current DOM elements value into something acceptable for use
   * by stripping away whitespace, and illegal characters, etc. Will also call
   * another function onDidSanitize, with the values before and after to allow
   * for reporting of potential malicious/illegal attempts, etc.
   */
  getSanitizedValue = () => {
    const originalValue = this.getOriginalValue()
    var sanitizedValue = originalValue

    if (this.usesBooleanValue()) {
      return Boolean(sanitizedValue)
    }

    const { onSanitize, onDidSanitize } = this.props
    if (isFunction(onSanitize)) {
      sanitizedValue = onSanitize(originalValue)
    }

    if (originalValue !== sanitizedValue) {
      if (isFunction(onDidSanitize)) {
        onDidSanitize(originalValue, sanitizedValue)
      }
    }

    return sanitizedValue
  }

  /**
   * Used to format the current inputValue to match the correct format for form
   * submission.
   *
   * Used by evaluate()
   */
  getNormalizedValue = () => {
    const {
      onNormalize,
    } = this.props

    var normalizedValue = this.getSanitizedValue()

    if (this.usesBooleanValue()) {
      return normalizedValue
    }

    // Since the value that gets displayed in the browser is the inputValue
    // prop, we should normalize this value instead of the DOM element's value.
    if (isFunction(onNormalize)) {
      normalizedValue = onNormalize(normalizedValue)
    }
    return normalizedValue
  }

  /**
   * Returns true/false if the current DOM element has a value after
   * sanitization.
   */
  hasSanitizedValue = () => {
    if (this.usesBooleanValue()){
      return true
    }
    const value = this.getSanitizedValue()
    return (value.length > 0)
  }

  /**
   * Returns true/false if the current sanitized value meets the minimum length
   * requirements.
   */
  doesSanitizedValueMeetMinLength = () => {
    const { minLength } = this.props
    if (!minLength) {
      return true
    }
    const value = this.getSanitizedValue()
    return (value.length >= minLength)
  }

  /**
   * Returns true/false if the current sanitized value meets the maximum length
   * requirements.
   */
  doesSanitizedValueMeetMaxLength = () => {
    const { maxLength } = this.props
    if (!maxLength) {
      return true
    }
    const value = this.getSanitizedValue()
    return (value.length <= maxLength)
  }

  /**
   * Determines if the current sanitized value passes all the requirements for
   * length, and content, etc. If it does not pass any check, it will display
   * an error and set the validity to false.
   */
  doesSanitizedValueValidate = () => {
    const {
      inputType,
      onValidate,
      minLength,
      minLengthErrorMessage,
      maxLength,
      maxLengthErrorMessage,
    } = this.props

    const value = this.getSanitizedValue()

    if (inputType !== ("checkbox" || "file")) {
      if (this.doesSanitizedValueMeetMinLength(value) === false) {
        const message = minLengthErrorMessage
          ? minLengthErrorMessage
          : `Must be ${minLength} characters or more`

        this.handleSetErrorMessage(message)
        this.handleSetValueValid(false)
        return false
      }

      if (this.doesSanitizedValueMeetMaxLength(value) === false) {
        const message = maxLengthErrorMessage
          ? maxLengthErrorMessage
          : `Must be ${maxLength} characters or less`
        this.handleSetErrorMessage(message)
        this.handleSetValueValid(false)
        return false
      }
    }

    if (isFunction(onValidate)) {
      const message = onValidate(value)
      if (message) {
        this.handleSetErrorMessage(message)
        this.handleSetValueValid(false)
        return false
      }
    }

    this.handleSetValueValid(true)
    return true
  }

  changeInputValue = () => {
    const { resetValue, inputValue, isAutoSubmitted, handleFormSubmission } = this.props

    if (this.hasSanitizedValue() === true) {
      if (this.usesBooleanValue()) {
        const oldValue = Boolean(inputValue)
        const newValue = !oldValue
        this.handleSetInputValue(newValue)
        this.handleSetValueValid(true)
      }
      else {
        const sanitizedValue = this.getSanitizedValue()
        this.handleSetInputValue(sanitizedValue)
        const isValid = this.doesSanitizedValueValidate()
        this.handleSetValueValid(isValid)
      }

      this.handleSetInputEmpty(false)

      if (isAutoSubmitted === true) {
        handleFormSubmission()
      }
    }
    else {
      this.handleSetInputEmpty(true)
      this.handleSetValueValid(false)
      this.handleSetInputValue(resetValue)
    }
  }

  /**
   * Invoked when the DOM element loses focus. When this occurs, set some redux
   * state, and the force the DOM element to blur after its re-mounted and
   * updated.
   */
  handleInputBlur = event => {
    this.changeInputValue()
  }

  /**
   * When we tab or shift-tab between input elements, the focus may move to an
   * unexpected element. Therefore, to ensure the correct element gets focused,
   * toggle the focusedKey on the parent SimpleForm, by invokeing the correct
   * method provided from it.
   */
  handleInputKeyUp = event => {
    const tabKeyCode = 9
    const isShift = Boolean(event.shiftKey)
    const keyCode = event.which

    if (keyCode === tabKeyCode) {
      this.handleSetFormSubmitted(false)
    }
  }

  handleInputChange = event => {
    const {
      onChange,
    } = this.props

    // Everytime our DOM element's value changes, we want to set the
    // isFormSubmitted state to false, to ensure errors disappear, so the input
    // field is visible, and asy to type into.
    this.handleSetFormSubmitted(false)

    // If we're using a checkbox filed, changes shouldnt involve any intensive
    // processing, so just do the update here instead of waiting for a blur
    // event.
    if (this.usesBooleanValue()) {
      this.changeInputValue()
    }

    // If we get an onChange handler, its probably for a file input field that
    // has a preview image loaded. Therefore, in order to pass the correct value
    // to the input and the redux store, return the methods we use do do this.
    if (isFunction(onChange)) {
      onChange(
        this.getSanitizedValue(event.target),
        this.handleSetFormSubmitted,
        this.handleSetInputEmpty,
        this.handleSetInputValue,
        this.handleSetValueValid,
      )
    }
  }

  /**
   * Invoked when the DOM element gains focus. This only happens when the
   * currentInputFocused prop, passed from the parent SimpleForm component,
   * matches the save focusedInput key. SInce prop changes cause this component
   * to be re-mounted and updated, we need to force the DOM element to be
   * focused after.
   */
  handleInputFocus = event => {
    const value = this.getSanitizedValue(event.target)

    if (this.hasSanitizedValue(value) === true) {
      const isValid = this.doesSanitizedValueValidate()
      this.handleSetValueValid(isValid)
      this.handleSetInputEmpty(false)
    }
    else {
      this.handleSetValueValid(false)
      this.handleSetInputEmpty(true)
    }
  }

  /**
   * Save the current validity state to the redux store, to determine if the
   * formFieldError should be displayed. Once changes, the DOM focus may need to
   * be forced back onto this component.
   */
  handleSetValueValid = bool => {
    const {
      isValueValid,
      setValueValid,
    } = this.props

    if (isValueValid !== bool) {
      if (isFunction(setValueValid)) {
        setValueValid(bool)
      }
    }
  }

  /**
   * Save the current emptiness state to the redux store to determine if we
   * should display other things like formFieldErrors, or allow submissions.
   * Once changed, the DOM focus may need to be forced back onto this component.
   */
  handleSetInputEmpty = bool => {
    const {
      isInputEmpty,
      setInputEmpty,
    } = this.props

    if (isInputEmpty !== bool) {
      if (isFunction(setInputEmpty)) {
        setInputEmpty(bool)
      }
    }
  }

  /**
   * Save the value for the input to the redux store, so it can be displayed
   * in the current DOm element. Once the change occurs, we may need to force
   * DOM focus back to this component.
   */
  handleSetInputValue = value => {
    const {
      inputValue,
      setInputValue,
    } = this.props

    if (isFunction(setInputValue)) {
      if (this.usesBooleanValue() || (inputValue !== value)) {
        setInputValue(value)
      }
    }
  }

  /**
   * Toggle the redux store's isFormSubmitted state. This is used to determine
   * if other things happen, like displaying a formFieldError, etc. Once the
   * state is changed, we may need to force a DOM focus back onto this
   * component, since it gets remounted from the props change.
   */
  handleSetFormSubmitted = bool => {
    const {
      isFormSubmitted,
      setFormSubmitted,
    } = this.props

    if (isFormSubmitted !== bool) {
      setFormSubmitted(bool)
    }
  }

  /**
   * Toggle the error message that gets displayed by save the message to the
   * redux store. Once the form is submitted, the save error message will be
   * displayed within the input field.
   */
  handleSetErrorMessage = message => {
    const {
      errorMessage,
      setErrorMessage,
    } = this.props

    if (errorMessage !== message) {
      if (isFunction(setErrorMessage)) {
        setErrorMessage(message)
      }
    }
  }

  /**
   * Checks if the input value is empty.
   *
   * Used by SimpleForm when it is submitted.
   */
  checkValueForEmptiness = () => {
    const {
      onCheck,
    } = this.props

    if (this.usesBooleanValue()) {
      return false
    }

    if (isFunction(onCheck)) {
      return onCheck(this.getSanitizedValue())
    }

    // hasSanitizedValue() reutrns fale if the fied is empty. Since this is
    // checking for emptiness, we need to use the inverse value fo this check
    // for the result.
    const result = !this.hasSanitizedValue()

    this.handleSetInputEmpty(result)

    return result
  }

  /**
   * Returns an object withe field name and normalized value for use in form
   * submission data objects.
   *
   * Used by SimpleForm for each field.
   */
  evaluate = () => {
    const { current } = this.inputRef
    const {
      inputName,
      onEvaluate,
    } = this.props

    // Normalize the input value to match the format required for the form data
    // object.
    const normalizedValue = this.getNormalizedValue()

    // When our simple form trys to evaulate any file input fields, it doesnt
    // obtain any value, since the redux action causes a re-render, which
    // resetInputValues the file input field's value. Any attempt to set this
    // value using value or defaultValue props results in a DOM error.
    if (isFunction(onEvaluate)) {
      return onEvaluate(inputName, normalizedValue, current)
    }

    return {
      name: inputName,
      value: normalizedValue,
    }
  }

  /**
   * Set the redux inputValue back to its default.
   *
   * Used by SimpleForm after form submission is finished.
   */
  resetInputValue = () => {
    const { isResetSkipped, resetValue } = this.props
    if (isResetSkipped === true) {
      return
    }
    this.handleSetInputValue(resetValue)
  }

  /**
   * Invoked when the SimpleInputError is clicked. Since isFormSubmitted
   * determines if the errors are displayed, we toggle this to false to remove
   * them when the error is clicked.
   */
  handleClickError = event => {
    this.handleSetFormSubmitted(false)
  }

  /**
   * Set the actual DOM element to be focused if the current input focused key
   * matches this field. Tha key is generated by SimpleForm, and passsed to each
   * simple input field dynamically.
   */
  setDOMFocus = () => {
    const {
      isCurrentInputFocused,
    } = this.props

    const { current } = this.inputRef

    if (current) {
      if (isCurrentInputFocused === true) {
        current.focus()
      }
    }
  }

  /**
   * Similar to setDOMFOcus, but for blurring the DOM element.
   */
  setDOMBlur =() => {
    const { isCurrentInputFocused } = this.props
    const { current } = this.inputRef
    if (current) {
      if (isCurrentInputFocused === false) {
        current.blur()
      }
    }
  }

  /**
   * If we do anything to change the redux store from onClick, then any
   * onloadend handlers wont work, since the component gets re-mounted before
   * it completes. Therefore, avoid changing state until focus or blur DOM
   * events.
   */
  handleClick = () => {
    //this.handleSetFormSubmitted(false, true)
  }

  renderError = () => {
    const {
      isValueValid,
      isInputEmpty,
      inputEmptyErrorMessage,
      //isFormSubmitted,
      errorPosition,
      errorStyle,
      errorMessage,
      renderError,
      isFormSubmitted,
    } = this.props

    const hasError = (
      isInputEmpty === true || isValueValid === false
    )
    const isErrorVisible = (
      isFormSubmitted === true && hasError === true
    )

    var finalErrorMessage = errorMessage
    if (isInputEmpty === true) {
      finalErrorMessage = inputEmptyErrorMessage
        ? inputEmptyErrorMessage
        : "This field is required"
    }

    const renderedChild = (
      <SimpleInputError
        isVisible={isErrorVisible}
        position={errorPosition}
        onClick={this.handleClickError}
        message={finalErrorMessage}
        containerStyle={errorStyle}
      />
    )

    if (isFunction(renderError)) {
      return renderError(renderedChild)
    }

    return renderedChild
  }

  renderInput = () => {
    const {
      renderInput,
      inputName,
      inputType,
      inputStyle,
      inputValue,
      inputPlaceholder,
      isDisabled,
      inputProps,
      maxLength,
    } = this.props

    const key = `${inputType}_input_${inputName}`

    // React throws an error if we try to set defaultValue on file inputs, so
    // avoid settings it altogether. Also, since file inputs dont have a
    // placeholder, avoid setting that as well.
    var rendered
    const commonProps = {
      disabled: isDisabled,
      key: key,
      css: inputStyle,
      ref: this.inputRef,
      name: inputName,
      type: inputType,
      onChange: this.handleInputChange,
    }
    const nonCheckboxProps = {
      onFocus: this.handleInputFocus,
      onBlur: this.handleInputBlur,
    }
    if (inputType === "file") {
      rendered = (
        <Input
          {...commonProps}
          {...nonCheckboxProps}
          {...inputProps}
        />
      )
    }
    if (inputType === "checkbox") {
      rendered = (
        <Input
          checked={inputValue}
          {...commonProps}
          {...inputProps}
        />
      )
    }
    else {
      rendered = (
        <Input
          onKeyUp={this.handleInputKeyUp}
          placeholder={inputPlaceholder}
          maxLength={maxLength}
          autoComplete={"off"}
          defaultValue={inputValue}
          {...commonProps}
          {...nonCheckboxProps}
          {...inputProps}
        />
      )
    }

    if (isFunction(renderInput)) {
      return renderInput(rendered)
    }

    return rendered
  }

  render() {
    const {
      containerStyle,
    } = this.props

    const renderedError = this.renderError()
    const renderedInput = this.renderInput()

    return (
      <Container
        css={containerStyle}
        onClick={this.handleClick}>
        {renderedError}
        {renderedInput}
      </Container>
    )
  }
}

export function SimpleInputWrapper(props) {
  return (
    <Context.Consumer>
      {context => <SimpleInput {...context} {...props} />}
    </Context.Consumer>
  )
}

