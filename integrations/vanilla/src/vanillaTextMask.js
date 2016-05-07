import {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition,
  safeSetSelection
} from '../../../core/src/index.js'

export function maskInput({element, mask}) {
  const state = {
    conformedInput: '',
    placeholder: element.placeholder || convertMaskToPlaceholder(mask)
  }

  element.placeholder = state.placeholder
  element.value = state.conformedInput
  safeSetSelection(element, 0)

  element.oninput = updateInput

  function updateInput() {
    const userInput = element.value
    const {placeholder, conformedInput: previousConformedInput} = state
    const conformToMaskResults = conformToMask(userInput, mask)
    const {output: conformedInput} = conformToMaskResults

    const adjustedCaretPosition = adjustCaretPosition({
      previousInput: previousConformedInput,
      conformToMaskResults,
      currentCaretPosition: element.selectionStart
    })

    const finalConformedInput = (
      conformedInput === placeholder &&
      adjustedCaretPosition === 0
    ) ? '' : conformedInput

    state.conformedInput = finalConformedInput

    element.value = finalConformedInput
    safeSetSelection(element, adjustedCaretPosition)
  }
}

export default maskInput

export {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../../core/src/index.js'
