import adjustCaretPosition from './adjustCaretPosition.js'
import conformToMask from './conformToMask.js'
import {convertMaskToPlaceholder, isString, isNumber} from './utilities.js'
import {placeholderChar as defaultPlaceholderChar} from './constants'

export default function createTextMaskInputElement({
  inputElement,
  mask: providedMask,
  guide,
  pipe,
  placeholderChar = defaultPlaceholderChar,
  onAccept,
  onReject,
  keepCharPositions = false
}) {
  // Anything that we will need to keep between `update` calls, we will store in this `state` object.
  const state = {previousConformedValue: ''}

  // The `placeholder` is an essential piece of how Text Mask works. For a mask like `(111)`, the placeholder would be
  // `(___)` if the `placeholderChar` is set to `_`.
  let placeholder

  // We don't know what the mask would be yet. If it is a string, we take it as is, but if it's a function, we will
  // have to call that function to get the mask string.
  let mask

  // If the provided mask is a string, we can call `convertMaskToPlaceholder` here once and we'll always have the
  // correct `placeholder`.
  if (isString(providedMask)) {
    placeholder = convertMaskToPlaceholder(providedMask, placeholderChar)
  }

  // If the `inputElement`, doesn't have a placeholder. Text Mask will set a default placeholder on it.
  if (inputElement.placeholder === '') {
    inputElement.setAttribute('placeholder', placeholder)
  }

  return {
    state,

    // `update` is called by framework components whenever they want to update the `value` of the input element.
    // The caller can send a `rawValue` to be conformed and set on the input element. However, the default use-case
    // is for this to be read from the `inputElement` directly.
    update(rawValue = inputElement.value) {
      // If `rawValue` equals `state.previousConformedValue`, we don't need to change anything. So, we return.
      // This check is here to handle controlled framework components that repeat the `update` call on every render.
      if (rawValue === state.previousConformedValue) { return }

      // We check the provided `rawValue` before moving further.
      // If it's something we can't work with `getSafeRawValue` will throw.
      const safeRawValue = getSafeRawValue(rawValue)

      // If the `providedMask` is a function. We need to call it at every `update` to get the `mask` string.
      // Then we also need to get the `placeholder`
      if (typeof providedMask === 'function') {
        mask = providedMask(safeRawValue)

        placeholder = convertMaskToPlaceholder(mask, placeholderChar)

      // If the `providedMask` is not a function, we just use it as-is.
      } else {
        mask = providedMask
      }

      // `selectionStart` indicates to us where the caret position is after the user has typed into the input
      const {selectionStart: currentCaretPosition} = inputElement

      // We need to know what the `previousConformedValue` is from the previous `update` call
      const {previousConformedValue} = state

      // The following object will be passed to `conformToMask` to determine how the `rawValue` will be conformed
      const conformToMaskConfig = {
        previousConformedValue,
        guide,
        placeholderChar,
        pipe,
        placeholder,
        currentCaretPosition,
        keepCharPositions
      }

      // `conformToMask` returns the information below: we need the `conformedValue` and we need to know whether
      // some characters were rejected. We'll use `someCharsRejected` to know whether we should call the `onReject`
      // callback
      const {conformedValue, meta: {someCharsRejected}} = conformToMask(safeRawValue, mask, conformToMaskConfig)

      // The following few lines are to support the `pipe` feature.
      const piped = typeof pipe === 'function'

      let pipeResults

      // If `pipe` is a function, we call it.
      if (piped) {
        pipeResults = pipe(conformedValue, conformToMaskConfig)

        // `pipeResults` should be an object. But as a convenience, we allow the pipe author to just return `false` to
        // indicate rejection. If the `pipe` returns `false`, the block below turns it into an object that the rest
        // of the code can work with.
        if (pipeResults === false) {
          pipeResults = {value: previousConformedValue, rejected: true}
        }
      }

      // Before we proceed, we need to know which conformed value to use, the one returned by the pipe or the one
      // returned by `conformToMask`.
      const finalConformedValue = (piped) ? pipeResults.value : conformedValue

      const inputValueShouldBeEmpty = finalConformedValue === placeholder && adjustedCaretPosition === 0
      const inputElementValue = (inputValueShouldBeEmpty) ? '' : finalConformedValue

      // After setting the `finalConformedValue` as the value of the `inputElement`, we will need to know where to set
      // the caret position. `adjustCaretPosition` will tell us.
      const adjustedCaretPosition = (inputValueShouldBeEmpty) ? 0 : adjustCaretPosition({
        previousConformedValue,
        conformedValue: finalConformedValue,
        placeholder,
        rawValue: safeRawValue,
        currentCaretPosition,
        placeholderChar,
        indexesOfAddedChars: pipeResults.indexesOfAddedChars
      })

      inputElement.value = inputElementValue
      state.previousConformedValue = inputElementValue
      safeSetSelection(inputElement, adjustedCaretPosition)

      if (typeof onAccept === 'function' && inputElementValue !== previousConformedValue) {
        onAccept()
      }

      const isDeletion = safeRawValue.length < previousConformedValue.length

      if (
        typeof onReject === 'function' &&
        (someCharsRejected || pipeResults.rejected) &&
        isDeletion === false &&
        currentCaretPosition <= mask.length
      ) {
        onReject({
          conformedValue: finalConformedValue,
          pipeRejection: pipeResults.rejected,
          maskRejection: someCharsRejected
        })
      }
    }
  }
}

function safeSetSelection(element, selectionPosition) {
  if (document.activeElement === element) {
    element.setSelectionRange(selectionPosition, selectionPosition, 'none')
  }
}

function getSafeRawValue(inputValue) {
  if (isString(inputValue)) {
    return inputValue
  } else if (isNumber(inputValue)) {
    return String(inputValue)
  } else if (inputValue === undefined || inputValue === null) {
    return ''
  } else {
    throw new Error(
      "The 'value' provided to Text Mask needs to be a string or a number. The value " +
      `received was:\n\n ${JSON.stringify(inputValue)}`
    )
  }
}
