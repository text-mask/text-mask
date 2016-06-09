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
    const {
      mask,
      value: inputValue,
      guide,
      placeholderCharacter: placeholderChar,
      validator
    } = nextProps

    const {
      value: previousConformedInput
    } = this.props

    const valueChanged = (nextProps.value !== undefined && this.props.value !== nextProps.value)
    const layoutPropsChange = (
      nextProps.mask !== this.props.mask ||
      nextProps.guide !== this.props.guide ||
      nextProps.placeholderCharacter !== this.props.placeholderCharacter ||
      nextProps.validator !== this.props.validator
    )

    // Controlled Input changes
    if (valueChanged || layoutPropsChange) {
      this.setState({
        conformedInput: conformToMask(inputValue, mask, {previousConformedInput, guide, placeholderChar, validator}).output
      })
      if (layoutPropsChange) this.adjustedCaretPosition = 0
      return
    }

    // Uncontrolled Input Changes
    if (layoutPropsChange) {
      this.setState(getComponentInitialState({mask, validator, inputValue, guide, placeholderChar}))
    }
  },

  componentDidUpdate() {
    safeSetSelection(this.inputElement, this.adjustedCaretPosition)
  },

  render() {
    const {props, state: {componentPlaceholder, conformedInput}, onChange} = this
    const {placeholder = componentPlaceholder, type = 'text'} = props

    return (
      <input
        {...props}
        type={type}
        onChange={onChange}
        value={conformedInput}
        placeholder={placeholder}
        ref={inputElement => (this.inputElement = inputElement)}
      />
    )
  },

  onChange(event) {
    const {target: {value: userInput}} = event
    const {
      props: {mask, guide, placeholderCharacter: placeholderChar, validator},
      state: {componentPlaceholder: placeholder, conformedInput: previousConformedInput}
    } = this
    const {conformedInput, adjustedCaretPosition} = processComponentChanges({
      userInput,
      placeholder,
      previousConformedInput,
      mask,
      validator,
      guide,
      placeholderChar,
      currentCaretPosition: this.inputElement.selectionStart
    })

    this.adjustedCaretPosition = adjustedCaretPosition
    this.setState({conformedInput})

    event.target.value = conformedInput

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  },
})

export default MaskedInput

export {default as conformToMask} from '../../core/src/conformToMask.js'
export {convertMaskToPlaceholder} from '../../core/src/utilities.js'
