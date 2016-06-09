import React, {PropTypes} from 'react'
import {
  processComponentChanges as processComponentChangesHelper,
  safeSetSelection,
  getComponentInitialState
} from '../../core/src/reactComponentHelpers.js'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.string.isRequired,
    guide: PropTypes.bool,
    value: PropTypes.string
  },

  componentWillMount() {
    const {props: {mask, value, placeholderCharacter: placeholderChar}} = this

    this.textMaskState = getComponentInitialState({mask, placeholderChar, value})
  },

  componentDidUpdate() {
    safeSetSelection(this.inputElement, this.textMaskState.adjustedCaretPosition)
  },

  render() {
    const {
      props, onChange, processComponentChanges,
      textMaskState: {conformedInput, componentPlaceholder},
      props: {value = conformedInput, type = 'text', placeholder = componentPlaceholder},
    } = this

    const finalConformedInput = (value !== conformedInput) ?
      processComponentChanges(value, true).conformedInput :
      value

    this.textMaskState.conformedInput = finalConformedInput

    return (
      <input
        {...props}
        type={type}
        onChange={onChange}
        value={finalConformedInput}
        placeholder={placeholder}
        ref={inputElement => (this.inputElement = inputElement)}
      />
    )
  },

  onChange(event) {
    const {target: {value: userInput}} = event
    const {processComponentChanges, props: {onChange}} = this
    const {conformedInput, adjustedCaretPosition} = processComponentChanges(userInput)

    this.textMaskState.conformedInput = conformedInput
    this.textMaskState.adjustedCaretPosition = adjustedCaretPosition

    this.forceUpdate()

    // This ensures the user's onChange function receives the updated conformed string as value.
    event.target.value = conformedInput

    if (typeof onChange === 'function') {
      onChange(event)
    }
  },

  processComponentChanges(userInput, skipAdjustCaretPosition) {
    const {
      inputElement,
      props: {mask, guide, placeholderCharacter: placeholderChar, validator},
      textMaskState: {conformedInput: previousConformedInput, componentPlaceholder}
    } = this
    const currentCaretPosition = (skipAdjustCaretPosition === true) ?
      undefined :
      inputElement.selectionStart

    const {conformedInput, adjustedCaretPosition} = processComponentChangesHelper({
      userInput,
      componentPlaceholder,
      previousConformedInput,
      mask,
      validator,
      guide,
      placeholderChar,
      currentCaretPosition
    })

    return {conformedInput, adjustedCaretPosition}
  }
})

export default MaskedInput

export {default as conformToMask} from '../../core/src/conformToMask.js'
export {convertMaskToPlaceholder} from '../../core/src/utilities.js'
