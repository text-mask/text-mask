import React, {PropTypes} from 'react'
import {
  convertMaskToPlaceholder,
  safeSetSelection,
  processComponentChanges
} from '../../core/src/index.js'

const getComponentInitialState = (mask, inputValue) => {
  return {
    conformedInput: inputValue,
    adjustedCaretPosition: 0,
    componentPlaceholder: convertMaskToPlaceholder(mask)
  }
}

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.string.isRequired,
    guide: PropTypes.bool,
    value: PropTypes.string
  },

  getInitialState() {
    return getComponentInitialState(this.props.mask, this.props.value)
  },

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.mask !== this.props.mask ||
      nextProps.guide !== this.props.guide
    ) {
      this.setState(getComponentInitialState(nextProps.mask, nextProps.value))
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
      props: {mask, guide},
      state: {componentPlaceholder: placeholder, conformedInput: previousConformedInput}
    } = this
    const {
      conformedInput,
      adjustedCaretPosition
    } = processComponentChanges({
      userInput,
      placeholder,
      previousConformedInput,
      mask,
      guide,
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

export {
  conformToMask,
  convertMaskToPlaceholder,
  adjustCaretPosition
} from '../../core/src/index.js'
