import {
  processComponentChanges,
  getComponentInitialState,
  safeSetSelection
} from '../../core/src/componentHelpers.js'

export function maskInput({
  element,
  mask,
  guide,
  validator,
  placeholderCharacter: placeholderChar
}) {
  const {value: inputValue} = element
  const state = getComponentInitialState({inputValue, mask, guide, placeholderChar})

  element.placeholder = (element.placeholder !== '') ?
    element.placeholder :
    state.componentPlaceholder

  element.value = state.conformedInput

  element.addEventListener('input', updateInput)

  function updateInput() {
    const {value: userInput, selectionStart: currentCaretPosition} = element
    const {componentPlaceholder, conformedInput: previousConformedInput} = state
    const {adjustedCaretPosition, conformedInput} = processComponentChanges({
      userInput,
      componentPlaceholder,
      previousConformedInput,
      validator,
      mask,
      guide,
      placeholderChar,
      currentCaretPosition
    })

    state.conformedInput = conformedInput
    element.value = conformedInput
    safeSetSelection(element, adjustedCaretPosition)
  }

  return {
    state,

    update: updateInput,

    destroy() {
      element.removeEventListener('input', updateInput)
    }
  }
}

export default maskInput
