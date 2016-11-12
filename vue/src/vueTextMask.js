import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'

export default {
  textMaskInputElement: null,

  inputHandler({target: {value}}) {
    return this.textMaskInputElement.update(value)
  },

  bind() {
    let options = this.vm[this.expression] || {}
    options.inputElement = this.el
    this.textMaskInputElement = createTextMaskInputElement(options)

    this.inputHandler = this.inputHandler.bind(this)
    this.el.addEventListener('input', this.inputHandler)
  },

  unbind() {
    this.el.removeEventListener('input', this.inputHandler)
  }
}

export {default as conformToMask} from '../../core/src/conformToMask.js'
