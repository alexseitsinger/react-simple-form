import * as actionTypes from "./actionTypes"

const initialState = {
  isFormSubmitted: false,
  isInputEmpty: true,
  isValueValid: true,
  inputValue: "",
  errorMessage: "",
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
    case actionTypes.ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: action.string,
      }
    }
    case actionTypes.SUBMITTED: {
      return {
        ...state,
        isFormSubmitted: action.bool,
      }
    }
    case actionTypes.EMPTY: {
      return {
        ...state,
        isInputEmpty: action.bool,
      }
    }
    case actionTypes.VALUE: {
      return {
        ...state,
        inputValue: action.string,
      }
    }
    case actionTypes.VALUE_VALID: {
      return {
        ...state,
        isValueValid: action.bool,
      }
    }
  }
}

