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

  element.placeholder = (element.placeholder !== undefined) ?
    element.placeholder :
    state.componentPlaceholder

  element.value = state.conformedInput
  safeSetSelection(element, 0)

  element.oninput = updateInput

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

  return state // Returned to facilitate testing
}

export default maskInput

export {default as conformToMask} from '../../core/src/conformToMask.js'
export {convertMaskToPlaceholder} from '../../core/src/utilities.js'
