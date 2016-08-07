import React, {PropTypes} from 'react'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'

export const MaskedInput = React.createClass({
  propTypes: {
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
  },

  componentDidMount() {
    const {props, props: {value}} = this

    this.textMaskInputElement = createTextMaskInputElement({inputElement: this.inputElement, ...props})

    this.textMaskInputElement.update(value)
  },

  componentDidUpdate() {
    this.textMaskInputElement.update(this.props.value)
  },

  render() {
    const props = {...this.props}

    delete props.mask
    delete props.guide
    delete props.pipe
    delete props.placeholderChar
    delete props.onAccept
    delete props.onReject
    delete props.keepCharPositions

    return (
      <input
        {...props}
        onChange={this.onChange}
        ref={(inputElement) => (this.inputElement = inputElement)}
      />
    )
  },

  onChange(event) {
    this.textMaskInputElement.update()

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  }
})

export default MaskedInput
