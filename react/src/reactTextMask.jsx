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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },

  resetState() {
    const {props: {mask, placeholderCharacter: placeholderChar}} = this
    this.textMaskState = getComponentInitialState({mask, placeholderChar})
    this.setState({conformedInput: ''})
  },

  getInitialState() {
    const {props: {mask, placeholderCharacter: placeholderChar}} = this
    this.textMaskState = getComponentInitialState({mask, placeholderChar})

    return {conformedInput: ''}
  },

  componentDidUpdate() {
    safeSetSelection(this.inputElement, this.textMaskState.adjustedCaretPosition)
  },

  render() {
    const {
      props, onChange, processComponentChanges,
      textMaskState: {componentPlaceholder},
      state: {conformedInput},
      props: {value = conformedInput, type = 'text', placeholder = componentPlaceholder},
    } = this

    const finalConformedInput = (value !== conformedInput) ?
      processComponentChanges(value, true).conformedInput :
      value

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
    const {inputElement, textMaskState, processComponentChanges, props: {onChange}} = this
    const {conformedInput, adjustedCaretPosition} = processComponentChanges(userInput)

    this.setState({conformedInput})

    textMaskState.adjustedCaretPosition = adjustedCaretPosition

    // This ensures the user's onChange function receives the updated conformed string as value.
    inputElement.value = conformedInput

    if (typeof onChange === 'function') {
      onChange(event)
    }
  },

  processComponentChanges(userInput, skipAdjustCaretPosition) {
    const {
      inputElement,
      props: {mask, guide, placeholderCharacter: placeholderChar, validator},
      state: {conformedInput: previousConformedInput},
      textMaskState: {componentPlaceholder}
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
