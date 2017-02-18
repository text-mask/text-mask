import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

export default {
  textMaskInputElement: null,

  inputHandler({target: {value}}) {
    return this.textMaskInputElement.update(value)
  },

  bind(el, binding) {
    let options = binding.value || {}
    options.inputElement = el
    binding.def.textMaskInputElement = createTextMaskInputElement(options)
    el.addEventListener('input', binding.def.inputHandler.bind(binding.def))
  },
  unbind() {
    el.removeEventListener('input', binding.def.inputHandler.bind(binding.def))
  }
}

export {default as conformToMask} from '../../core/src/conformToMask.js'
