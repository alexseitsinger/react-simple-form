import * as actionTypes from "./actionTypes"

export const setFormSubmitted = bool => ({
  type: actionTypes.SUBMITTED,
  bool,
})

export const onFormCompleted = () => dispatch => {}

export const setInputEmpty = bool => ({
  type: actionTypes.EMPTY,
  bool,
})

export const setInputValue = string => ({
  type: actionTypes.VALUE,
  string,
})

export const setValueValid = bool => ({
  type: actionTypes.VALUE_VALID,
  bool,
})

