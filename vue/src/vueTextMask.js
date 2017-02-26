import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

export default {
  textMaskInputElement: null,

  inputHandler({target: {value}}) {
    return this.textMaskInputElement.update(value)
  },

  bind() {
    let self = binding.def
    
    let options = binding.value || {}
    options.inputElement = el
    el.textMaskInputElement = createTextMaskInputElement(options)

    el.inputHandler = self.inputHandler.bind(el)
    el.addEventListener('input', el.inputHandler)
  },

  unbind() {
    el.removeEventListener('input', el.inputHandler)
  }
}

export {default as conformToMask} from '../../core/src/conformToMask.js'
