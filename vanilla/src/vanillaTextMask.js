import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'

export function maskInput(textMaskConfig) {
  const {inputElement} = textMaskConfig
  const control = createTextMaskInputElement(textMaskConfig)
  const inputHandler = ({target: {value}}) => control.update(value)

  inputElement.addEventListener('input', inputHandler)

  return {
    control,

    destroy() {
      inputElement.removeEventListener('input', inputHandler)
    }
  }
}

export default maskInput
