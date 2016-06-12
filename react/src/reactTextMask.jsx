import React, {PropTypes} from 'react'
import {
  processComponentChanges,
  safeSetSelection,
  getComponentInitialState,
  convertMaskToPlaceholder
} from '../../core/src/componentHelpers.js'

const TEXT_MASK_PROPS_NAMES = ['mask', 'guide', 'placeholderCharacter', 'validator']

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
    const {processComponentChanges, inputElement, props: currentProps} = this
    const {value, mask, placeholderCharacter: placeholderChar} = nextProps

    let textMaskPropsChanged = false

    for (let i = 0; i < TEXT_MASK_PROPS_NAMES.length; i++) {
      const propName = TEXT_MASK_PROPS_NAMES[i]

      if (nextProps[propName] !== currentProps[propName]) {
        textMaskPropsChanged = true
        break
      }
    }

    if (textMaskPropsChanged || nextProps.value !== inputElement.value) {
      const {conformedInput, adjustedCaretPosition} = processComponentChanges(value, nextProps)
      const componentPlaceholder = convertMaskToPlaceholder({mask, placeholderChar})

      this.setState({conformedInput, adjustedCaretPosition, componentPlaceholder})
    }
  },

  componentDidUpdate() {
    safeSetSelection(this.inputElement, this.state.adjustedCaretPosition)
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
    const {processComponentChanges, props, props: {onChange}} = this
    const {conformedInput, adjustedCaretPosition} = processComponentChanges(userInput, props)

    this.setState({conformedInput, adjustedCaretPosition})

    event.target.value = conformedInput

    if (typeof onChange === 'function') {
      onChange(event)
    }
  },

  processComponentChanges(userInput, props) {
    const {
      inputElement,
      state: {componentPlaceholder, conformedInput: previousConformedInput},
    } = this
    const {mask, validator, guide, placeholderCharacter: placeholderChar} = props
    const currentCaretPosition = inputElement.selectionStart
    const {conformedInput, adjustedCaretPosition} = processComponentChanges({
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
export {convertMaskToPlaceholder}
