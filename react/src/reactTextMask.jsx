import React, {PropTypes} from 'react'
import {
  processComponentChanges,
  safeSetSelection,
  getComponentInitialState
} from '../../core/src/componentHelpers.js'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.string.isRequired,
    guide: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },

  getInitialState() {
    const {value: inputValue, mask, guide, placeholderCharacter: placeholderChar} = this.props

    return getComponentInitialState({inputValue, mask, guide, placeholderChar})
  },

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.mask !== this.props.mask ||
      nextProps.guide !== this.props.guide ||
      nextProps.placeholderCharacter !== this.props.placeholderCharacter
    ) {
      const {mask, value: inputValue, guide, placeholderCharacter: placeholderChar} = nextProps

      this.setState(getComponentInitialState({mask, inputValue, guide, placeholderChar}))
    }
  },

  componentDidUpdate() {
    safeSetSelection(this.refs.inputElement, this.state.adjustedCaretPosition)
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
        ref='inputElement'
      />
    )
  },

  onChange(event) {
    const {target: {value: userInput}} = event
    const {
      props: {mask, guide, placeholderCharacter: placeholderChar},
      state: {componentPlaceholder: placeholder, conformedInput: previousConformedInput}
    } = this
    const {conformedInput, adjustedCaretPosition} = processComponentChanges({
      userInput,
      placeholder,
      previousConformedInput,
      mask,
      guide,
      placeholderChar,
      currentCaretPosition: this.refs.inputElement.selectionStart
    })

    this.setState({conformedInput, adjustedCaretPosition})

    event.target.value = conformedInput

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  },
})

export default MaskedInput

export {default as conformToMask} from '../../core/src/conformToMask.js'
export {convertMaskToPlaceholder} from '../../core/src/utilities.js'
