import React, {PropTypes} from 'react'
import {
  processComponentChanges,
  safeSetSelection,
  getComponentInitialState
} from '../../core/src/componentHelpers.js'
import conformToMask from '../../core/src/conformToMask.js'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.string.isRequired,
    guide: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },

  getInitialState() {
    const {
      value: inputValue,
      mask,
      guide,
      placeholderCharacter: placeholderChar,
      validator
    } = this.props

    return getComponentInitialState({inputValue, mask, validator, guide, placeholderChar})
  },

  componentWillReceiveProps(nextProps) {
    this.previousConformedInput = this.props.value

    if (
      nextProps.mask !== this.props.mask ||
      nextProps.guide !== this.props.guide ||
      nextProps.placeholderCharacter !== this.props.placeholderCharacter
    ) {
      const {
        mask,
        value,
        guide,
        placeholderCharacter: placeholderChar,
        validator
      } = nextProps

      const {conformedInput} = this.state

      if (value === undefined) {
        const {conformedInput: nextConformedInput, adjustedCaretPosition} = getComponentInitialState({mask, validator, conformedInput, guide, placeholderChar})
        this.adjustedCaretPosition = adjustedCaretPosition
        this.setState({conformedInput: nextConformedInput})
      }
    }
  },

  componentDidUpdate() {
    safeSetSelection(this.inputElement, this.adjustedCaretPosition)
  },

  render() {
    const {props, state: {componentPlaceholder, conformedInput}, onChange, previousConformedInput} = this
    const {placeholder = componentPlaceholder, type = 'text', value, mask, guide, placeholderChar, validator} = props

    const conformedValue = value !== undefined ? (value === '' ? '' : conformToMask(value, mask, {previousConformedInput, guide, placeholderChar, validator}).output) : conformedInput

    return (
      <input
        {...props}
        type={type}
        onChange={onChange}
        value={conformedValue}
        placeholder={placeholder}
        ref={inputElement => (this.inputElement = inputElement)}
      />
    )
  },

  onChange(event) {
    const {target: {value: userInput}} = event
    const {
      props: {mask, guide, placeholderCharacter: placeholderChar, validator, value},
      state: {componentPlaceholder: placeholder, conformedInput: previousConformedInput}
    } = this

    const previousConformedInputNext = value !== undefined ? value : previousConformedInput
    const {conformedInput, adjustedCaretPosition} = processComponentChanges({
      userInput,
      placeholder,
      previousConformedInput: previousConformedInputNext,
      mask,
      validator,
      guide,
      placeholderChar,
      currentCaretPosition: this.inputElement.selectionStart
    })

    if (value === undefined) this.setState({conformedInput})
    this.adjustedCaretPosition = adjustedCaretPosition

    event.target.value = conformedInput

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  },
})

export default MaskedInput

export {default as conformToMask} from '../../core/src/conformToMask.js'
export {convertMaskToPlaceholder} from '../../core/src/utilities.js'
