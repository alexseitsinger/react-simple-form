import React from "react"

import { SimpleForm, SimpleInput, SimpleInputError } from "src"
import setup from "./setup"

describe("SimpleInput", () => {
  it("should render the empty field error message when the field has an empty sanitized value", () => {
    const { wrapper } = setup()
    wrapper.find(SimpleForm).instance().handleFormSubmission()
    wrapper.update()
    expect(wrapper.find("div.SimpleInputError-Message")).toHaveLength(1)
    expect(wrapper.find("div.SimpleInputError-Message").text()).toEqual("This field is required")
  })

  it("should display an error message when appropriate", () => {
    const errorMessage = "This is an error message"
    const { wrapper, store } = setup({
      minLength: 0,
      maxLength: 5,
      errorMessage,
      onValidate: () => errorMessage,
    })

    wrapper.find("input").instance().value = "Alex"
    wrapper.find(SimpleInput).childAt(0).instance().updateInputValue()
    wrapper.find(SimpleInput).childAt(0).instance().handleSetValueValid(false)
    wrapper.find(SimpleForm).instance().handleFormSubmission()
    wrapper.update()
    expect(wrapper.find("div.SimpleInputError-Message").text()).toEqual(errorMessage)
  })

  it("should render the min length error message when the field has a short sanitized value", () => {
    const { wrapper } = setup({
      minLength: 5,
    })
    wrapper.find(SimpleInput).childAt(0).instance().handleSetInputValue("Text")
    wrapper.find(SimpleForm).instance().handleFormSubmission()
    wrapper.update()
    expect(wrapper.find("div.SimpleInputError-Message").text()).toEqual("Must be 5 characters or more")
  })

  it("should render the max length error message when the field has a long sanitized value", () => {
    const maxLengthErrorMessage = "Must be 4 characters or less"
    const { wrapper } = setup({
      minLength: 0,
      maxLength: 4,
      maxLengthErrorMessage,
    })
    wrapper.find(SimpleInput).childAt(0).instance().handleSetInputValue("Tests")
    wrapper.find(SimpleForm).instance().handleFormSubmission()
    wrapper.update()
    expect(wrapper.find("div.SimpleInputError-Message").text()).toEqual(maxLengthErrorMessage)
  })

  it("should set submission state to false when the field value changes", () => {
    const { wrapper } = setup()
    wrapper.find(SimpleForm).instance().handleFormSubmission()
    wrapper.update()
    expect(wrapper.find(SimpleForm).props().isFormSubmitted).toBe(true)
    wrapper.find(SimpleInput).childAt(0).instance().handleInputChange()
    wrapper.update()
    expect(wrapper.find(SimpleForm).props().isFormSubmitted).toBe(false)
  })

  it("should remove the error message when the field value changes", () => {
    const { wrapper } = setup()
    wrapper.find(SimpleForm).instance().handleFormSubmission()
    wrapper.update()
    expect(wrapper.find(SimpleInputError)).toHaveLength(1)
    wrapper.find(SimpleInput).childAt(0).instance().handleSetFormSubmitted(false)
    wrapper.update()
    expect(wrapper.find("div.SimpleInputError")).toHaveLength(0)
  })

  it("should use the sanitized value when the evaluator is invoked", () => {

  })

  it("should save the sanitized value to the redux store when the field is blurred", () => {

  })
})

