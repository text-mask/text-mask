import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'

let textMaskInputElement = null

const inputHandler = ({target: {value}}) => {
  return textMaskInputElement.update(value)
}

export default {
  bind(el, binding, vnode) {
    let options = binding.value || {}
    options.inputElement = el
    textMaskInputElement = createTextMaskInputElement(options)
    el.addEventListener('input', inputHandler)
  },
  unbind() {
    el.removeEventListener('input', inputHandler)
  }
}
