## SimpleForm

A simple form for simple inputs.

## Installation

```
yarn add @alexseitsinger/react-simple-form
```

## Example

```javascript
function App(props){
  return (
    <SimpleForm
      isFormSubmitted={props.isFormSubmitted}
      setFormSubmitted={props.setFormSubmitted}
      onFormSubmitted={props.onFormSubmitted}
      onFormCompleted={props.onFormCompleted}>
      <SimpleInput 
        resetValue={""}
        inputType={"text"}
        inputName={"name"}
        inputPlaceholder={"Name..."}
        minLength={8}
        maxLength={24}
        onSanitize={value => {
          // Do some cleaning...
          return value
        }}
        onDidSanitize={(oldValue, newValue) => {
          // Do something each time there's a cleaning...
        }}
        isInputEmpty={props.isNameFieldEmpty}
        setInputEmpty={props.setNameFieldEmpty}
        inputValue={props.nameFieldValue}
        setInputValue={props.setNameFieldValue}
        isValueValid={props.isNameFieldValueValid}
        setValueValid={props.setNameFieldValueValid}
        errorMessage={props.nameFieldErrorMessage}
        setErrorMessage={props.setNameFieldErrorMessage}
        errorStyle={{
          //...
        }}
        errorPosition={"centerLeft"}
      />
    </SimpleForm>
  )
}
```
