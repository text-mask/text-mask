import createComponent from '../../core/src/createComponent.js'

export function maskInput({
    inputElement,
    mask,
    guide,
    validator,
    placeholderCharacter: placeholderChar
}) {
  const control = createComponent({
    inputElement,
    mask,
    guide,
    validator,
    placeholderChar
  })

  inputElement.addEventListener('input', control.update)

  return {
    control,

    destroy() {
      inputElement.removeEventListener('input', control.update)
    }
  }
}

export default maskInput
