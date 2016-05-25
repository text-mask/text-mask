import {convertMaskToPlaceholder} from '../../core/src/utilities.js'
import safeSetSelection from '../../core/src/safeSetSelection.js'
import processComponentChanges from '../../core/src/processComponentChanges.js'

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
