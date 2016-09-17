import React, {PropTypes, Component} from 'react'
import {TextInput} from 'react-native'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'
import createTextInputProxy from './createTextInputProxy.js'

class MaskedInput extends Component {
  constructor(props, context) {
    super(props, context)

    this.textInputProxy = createTextInputProxy()
    this.textMaskInputElement = createTextMaskInputElement({
      inputElement: this.textInputProxy,
      ...props
    })

    this.textMaskInputElement.update()

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
        defaultValue={this.textInputProxy.value}
        onSelectionChange={this.onSelectionChange}
        onChange={this.onChange}
      />
    )
  }

  onSelectionChange(event) {
    // We do all the work here because we don't have the new cursor selection in the onChange event
    // This is different than how the web works where the new cursor position is sync
    const {nativeEvent: {selection}} = event

    this.textInputProxy.selectionStart = selection.start

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


    this.textMaskInputElement.update() // Will mutate `this.textInputProxy`

    this.nextSelection = {
      start: this.textInputProxy.selectionStart,
      end: this.textInputProxy.selectionStart,
    }

    this._inputRef._inputRef.setNativeProps({
      text: this.textInputProxy.value,
      selection: {
        start: this.textInputProxy.selectionStart,
        end: this.textInputProxy.selectionStart
      }
    })

    this.skipNext = true
    this.changeValue = undefined
  }

  onChange(event) {
    // This will drive new value being set and selection set in onSelectionChange
    this.changeValue = event.nativeEvent.text

    this.textMaskInputElement.update()

    event.nativeEvent.text = this.textInputProxy.value

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }

    if (typeof this.props.onChangeText === 'function') {
      this.props.onChangeText(this.textInputProxy.value)
    }
  }
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
