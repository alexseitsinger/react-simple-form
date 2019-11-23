import React from "react"
import { SimpleInput } from "@alexseitsinger/react-simple-input"

import setup from "@tests/setup"
import { SimpleForm } from "@src"

describe("SimpleForm", () => {

  it("should set submission state to true when submission starts", () => {
    const { wrapper } = setup()
    expect(wrapper.find(SimpleForm).props().isFormSubmitted).toBe(false)
    wrapper.find("form").first().simulate("submit")
    expect(wrapper.find(SimpleForm).props().isFormSubmitted).toBe(true)
  })

  it("should set submission state to false at the end of a successful submission", () => {

  })

  it("should have a checker for each field rendered", () => {

  })

  it("should have a resetter for each field rendered", () => {

  })

  it("should have a validator for each field rendered", () => {

  })

  it("should have an evaluator for each field rendered", () => {

  })

  it("should check for empty fields when the form is submitted", () => {
    const { wrapper } = setup()

    const form = wrapper.find(SimpleForm)
    const instance = form.instance()
    const areCompleted = jest.spyOn(instance, "areFormFieldsCompleted")

    instance.handleFormSubmission()

    expect(areCompleted).toHaveBeenCalled()
  })

  it("should validate each field when the form is completed", () => {
    const { wrapper } = setup()

    const form = wrapper.find(SimpleForm)
    const instance = form.instance()
    const areCompleted = jest.spyOn(instance, "areFormFieldsCompleted")
    const areValidated = jest.spyOn(instance, "areFormFieldsValidated")

    const inp = wrapper.find(SimpleInput)
    inp.props().setInputValue("NAME_HERE")
    inp.props().setInputEmpty(false)
    inp.props().setValueValid(true)
    wrapper.update()

    instance.handleFormSubmission()
    expect(areCompleted).toHaveBeenCalled()
    expect(areValidated).toHaveBeenCalled()
  })

  it("should prepare a data object from the field names and values", () => {
    const { wrapper } = setup()

    const form = wrapper.find(SimpleForm)
    const instance = form.instance()

    const inp = wrapper.find(SimpleInput)
    inp.props().setInputValue("NAME_HERE")
    inp.props().setInputEmpty(false)
    inp.props().setValueValid(true)
    wrapper.update()

    const ret = instance.evaluateFormFields()
    expect(ret).toStrictEqual({name: "NAME_HERE"})
  })

  it("should be incomplete when a checker returns true", () => {

  })

  it("should be invalid when a validator returns false", () => {

  })

  it("should run resetters after successful submission", () => {
    const { wrapper } = setup()

    const form = wrapper.find(SimpleForm)
    const instance = form.instance()
    const fn = jest.spyOn(instance, "resetFormFields")

    const inp = wrapper.find(SimpleInput)
    inp.props().setInputValue("NAME_HERE")
    inp.props().setInputEmpty(false)
    inp.props().setValueValid(true)
    wrapper.update()

    instance.handleFormSubmission()

    expect(fn).toHaveBeenCalled()
  })

  it("should invoke onPrepare with the data object after successful submission", () => {
    const fn = jest.fn()
    const { wrapper } = setup({
      onPrepare: fn,
    })

    const inp = wrapper.find(SimpleInput)
    inp.props().setInputValue("NAME_HERE")
    inp.props().setInputEmpty(false)
    inp.props().setValueValid(true)

    wrapper.find(SimpleForm).instance().handleFormSubmission()

    expect(fn).toHaveBeenCalled()
  })

  it("should invoke onFormFinished after successful submission", () => {
    const fn = jest.fn()
    const { wrapper } = setup({
      onFormFinished: fn,
    })

    const inp = wrapper.find(SimpleInput)
    inp.props().setInputValue("NAME_HERE")
    inp.props().setInputEmpty(false)
    inp.props().setValueValid(true)

    wrapper.find(SimpleForm).instance().handleFormSubmission()

    expect(fn).toHaveBeenCalled()
  })

  it("should render a submit button using a provided method", () => {
    const fn = jest.fn()
    const { wrapper } = setup({
      renderSubmitButtonBody: fn,
    })

    expect(wrapper.find("button")).toHaveLength(1)
    expect(fn).toHaveBeenCalled()
  })

  it("should reset focus to the first field at submission end", () => {
    const { wrapper } = setup()

    const form = wrapper.find(SimpleForm)
    const instance = form.instance()
    const fn = jest.spyOn(instance, "setFocusedKey")

    const inp = wrapper.find(SimpleInput)
    inp.props().setInputValue("NAME_HERE")
    inp.props().setInputEmpty(false)
    inp.props().setValueValid(true)

    wrapper.find(SimpleForm).instance().handleFormSubmission()

    expect(fn).toHaveBeenCalled()
  })

  it("should pass extra props to each form field", () => {
    const { wrapper } = setup()
    const field = wrapper.find(SimpleInput)
    expect(field).toHaveLength(1)
    const props = field.props()
    expect(props.addChecker).toBeDefined()
    expect(props.addEvaluator).toBeDefined()
    expect(props.addResetter).toBeDefined()
    expect(props.addValidator).toBeDefined()
    expect(props.isCurrentInputFocused).toBe(true)
    expect(props.isFormSubmitted).toBe(false)
    expect(props.removeChecker).toBeDefined()
    expect(props.removeEvaluator).toBeDefined()
    expect(props.removeResetter).toBeDefined()
    expect(props.removeValidator).toBeDefined()
    expect(props.setCurrentInputBlurred).toBeDefined()
    expect(props.setCurrentInputFocused).toBeDefined()
    expect(props.setFormFocused).toBeDefined()
    expect(props.setLastInputFocused).toBeDefined()
    expect(props.setNextInputFocused).toBeDefined()
  })

})
