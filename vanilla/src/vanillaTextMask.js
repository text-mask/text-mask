import {
  processComponentChanges,
  getComponentInitialState,
  safeSetSelection
} from '../../core/src/componentHelpers.js'

export function maskInput({element, mask, guide}) {
  const {value: inputValue} = element
  const state = getComponentInitialState({inputValue, mask, guide})

  element.placeholder = (element.placeholder !== undefined) ?
    element.placeholder :
    state.componentPlaceholder

  element.value = state.conformedInput
  safeSetSelection(element, 0)

  element.oninput = updateInput

  function updateInput() {
    const userInput = element.value
    const {componentPlaceholder: placeholder, conformedInput: previousConformedInput} = state
    const {adjustedCaretPosition, conformedInput} = processComponentChanges({
      userInput,
      placeholder,
      previousConformedInput,
      mask,
      guide,
      currentCaretPosition: element.selectionStart
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
