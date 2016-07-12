import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'

export function maskInput({
  inputElement,
  mask,
  guide,
  validator,
  placeholderChar,
  onAccept,
  onReject
}) {
  const control = createTextMaskInputElement({
    inputElement,
    mask,
    guide,
    validator,
    placeholderChar,
    onAccept,
    onReject
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
