import {
  convertMaskToPlaceholder,
  safeSetSelection,
  processComponentChanges
} from '../../core/src/index.js'

export function maskInput({element, mask, guide}) {
  const state = {
    conformedInput: '',
    adjustedCaretPosition: 0,
    placeholder: convertMaskToPlaceholder(mask)
  }

  element.placeholder = (element.placeholder !== undefined) ?
    element.placeholder :
    state.placeholder
  element.value = state.conformedInput
  safeSetSelection(element, 0)

  element.oninput = updateInput

  function updateInput() {
    const userInput = element.value
    const {placeholder, conformedInput: previousConformedInput} = state
    const {
      adjustedCaretPosition,
      conformedInput
    } = processComponentChanges({
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

export {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../core/src/index.js'
