import createInputElementTextMask from '../../core/src/createInputElementTextMask.js'

export function maskInput({
    inputElement,
    mask,
    guide,
    validator,
    placeholderCharacter: placeholderChar
}) {
  const control = createInputElementTextMask({
    inputElement,
    mask,
    guide,
    validator,
    placeholderChar
  })
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
