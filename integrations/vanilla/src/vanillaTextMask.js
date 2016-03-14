import {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../../core/src/index.js'

export function maskInput({element, mask}) {
  const state = {
    previousValue: '',
    conformToMaskResults: {},
    currentCaretPosition: null
  }

  updateInput()
  element.oninput = updateInput

  function updateInput() {
    state.previousValue = state.conformToMaskResults.output || state.previousValue
    state.conformToMaskResults = conformToMask(element.value, mask)
    state.currentCaretPosition = element.selectionStart

    const placeholder = element.placeholder || convertMaskToPlaceholder(mask)
    const value = (state.conformToMaskResults.output !== placeholder) ?
      state.conformToMaskResults.output :
      ''

    element.value = value
    element.placeholder = placeholder

    if (element === document.activeElement) {
      const caretPosition = adjustCaretPosition({
        previousInput: state.previousValue,
        conformToMaskResults: state.conformToMaskResults,
        currentCaretPosition: state.currentCaretPosition
      })

      element.setSelectionRange(caretPosition, caretPosition, 'none')
    }
  }
}

export default maskInput

export {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../../core/src/index.js'
