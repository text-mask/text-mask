import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'

/*
 * Vue Directive - Text Masking with Vanilla Text Mask
 * https://github.com/text-mask/text-mask/tree/master/vanilla
 *
 * This directive binds input masking via Text Mask. Once the element is
 * destroyed it will be unbinded. Pass an options object, same as you would
 * normally for this plugin, as a parameter on the element being bound.
 */

let textMaskInputElement

// Use core function to init the mask
const setupTextMask = options => {
  textMaskInputElement = createTextMaskInputElement(options)
}

// Register the input handler to watch for updates
const inputHandler = ({target: {value}}) => {
  return textMaskInputElement.update(value)
}

export default {
  params: ['maskOptions'],
  /**
   * via Vue API
   *
   * Use the element (should be a text input) calling the directive as an
   * option for the text mask. Expect options as params, but if none are sent
   * just use the element as the only option. Send all options together in an
   * object.
   */
  bind() {
    // Get options as params
    let options = this.params.maskOptions || {}
    // Set the input as an option for text-mask
    options.inputElement = this.el
    setupTextMask(options)
    this.el.addEventListener('input', inputHandler)
  },
  /**
   * via Vue API
   *
   * Destroy the event listener attached to the input via text mask. This will
   * protect the application / tidy from memory leaks.
   */
  unbind() {
    this.el.removeEventListener('input', inputHandler)
  }
}
