import {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition,
  safeSetSelection
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
    const conformToMaskResults = conformToMask(
      userInput,
      mask,
      (guide === false) ? {guide, previousConformedInput} : {}
    )
    const {output: conformedInput} = conformToMaskResults

    const adjustedCaretPosition = adjustCaretPosition({
      previousConformedInput,
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

  return state // Returned to facilitate testing
}

export default maskInput

export {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../core/src/index.js'
