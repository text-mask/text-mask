import React, {PropTypes, Component} from 'react'
import {TextInput} from 'react-native'
import {getConformedInputState, processMaskAndPlaceholder} from '../../core/src/createTextMaskInputElement'
import {placeholderChar as defaultPlaceholderChar} from '../../core/constants.js'

class MaskedInput extends Component {
  constructor(props, context) {
    super(props, context)

    const {value} = conformedInputState({
      ...props,
      currentCaretPosition: props.value.length,
      value: props.value,
      previousConformedValue: ''
    })

    this.state = {value}
    this.nextSelection = {
      start: value.length,
      end: value.length
    }
    this.previousValue = value

    this.onSelectionChange = this.onSelectionChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }

  render() {
    const props = {...this.props}

    delete props.mask
    delete props.guide
    delete props.pipe
    delete props.placeholderChar
    delete props.onAccept
    delete props.onReject
    delete props.keepCharPositions
    delete props.value

    return (
      <TextInput
        {...props}
        ref={(ref) => (this._inputRef = ref)}
        defaultValue={this.state.value}
        onSelectionChange={this.onSelectionChange}
        onChange={this.onChange}
        onChangeText={this.onChangeText}
      />
    )
  }

  onSelectionChange(event) {
    // We do all the work here because we don't have the new cursor selection in the onChange event
    // This is different than how the web works where the new cursor position is sync
    const {nativeEvent: {selection}} = event

    if (typeof this.props.onSelectionChange === 'function') {
      this.props.onSelectionChange(event)
    }
    // When we set the new selection this callback is called but to the wrong selection
    // We want to skip it
    if (this.skipNext) {
      this.skipNext = false
      return
    }

    // If someone highlights we need to set it and update our new selection
    if (this.changeValue === undefined) {
      this.nextSelection = selection
      this._inputRef._inputRef.setNativeProps({
        selection
      })
      return
    }

    const {value, adjustedCaretPosition} = conformedInputState({
      ...this.props,
      currentCaretPosition: selection.start,
      value: this.changeValue,
      previousConformedValue: this.previousValue
    })

    this.nextSelection = {
      start: adjustedCaretPosition,
      end: adjustedCaretPosition,
    }

    this._inputRef._inputRef.setNativeProps({
      text: value,
      selection: this.nextSelection
    })

    this.previousValue = value
    this.skipNext = true
    this.changeValue = undefined
  }

  onChange(event) {
    // This will drive new value being set and selection set in onSelectionChange
    this.changeValue = event.nativeEvent.text

    const {value} = conformedInputState({
      ...this.props,
      currentCaretPosition: this.nextSelection.start,
      value: this.changeValue,
      previousConformedValue: this.previousValue
    })

    event.nativeEvent.text = value

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }

    if (typeof this.props.onChangeText === 'function') {
      this.props.onChangeText(value)
    }
  }
}

function conformedInputState ({
  mask,
  guide,
  pipe,
  placeholderChar,
  onAccept,
  onReject,
  keepCharPositions,
  currentCaretPosition,
  value,
  previousConformedValue
}) {

  return getConformedInputState({
      guide,
      onAccept,
      obReject,
      keepCharPositions,
      currentCaretPosition,
      rawValue: value,
      previousConformedValue,
      ...processMaskAndPlaceholder({
        mask,
        pipe
        placeholderChar,
      })
  })
}


MaskedInput.defaultProps = {
  placeholderChar: defaultPlaceholderChar
}

MaskedInput.propTypes = {
  mask: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.shape({
      mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
      pipe: PropTypes.func
    })
  ]).isRequired,
  guide: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pipe: PropTypes.func,
  placeholderChar: PropTypes.string,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  keepCharPositions: PropTypes.bool
}

export default MaskedInput
