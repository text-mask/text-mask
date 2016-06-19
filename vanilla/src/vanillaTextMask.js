import {
  processComponentChanges,
  getComponentInitialState,
  safeSetSelection,
} from '../../core/src/componentHelpers.js'

export function maskInput(
  {
    inputElement,
    mask,
    guide,
    validator,
    placeholderCharacter: placeholderChar
  },
  registerEventListeners = true
) {
  const {value: inputValue} = inputElement
  const state = getComponentInitialState({inputValue, mask, guide, placeholderChar})
  const onInput = (value) => {
    if (value === state.conformedInput) { return }

    const {value: userInput, selectionStart: currentCaretPosition} = inputElement
    const {componentPlaceholder, conformedInput: previousConformedInput} = state
    const {adjustedCaretPosition, conformedInput} = processComponentChanges({
      userInput: value || userInput,
      componentPlaceholder,
      previousConformedInput,
      validator,
      mask,
      guide,
      placeholderChar,
      currentCaretPosition
    })

    state.conformedInput = conformedInput
    inputElement.value = conformedInput
    safeSetSelection(inputElement, adjustedCaretPosition)
  }

  inputElement.placeholder = (inputElement.placeholder !== '') ?
    inputElement.placeholder :
    state.componentPlaceholder

  inputElement.value = state.conformedInput

  if (registerEventListeners === true) {
    inputElement.addEventListener('input', onInput)
  }

  return {
    state,

    update: onInput,

    destroy() {
      inputElement.removeEventListener('input', onInput)
    }
  }
}

export default maskInput
