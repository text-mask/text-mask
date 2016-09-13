import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'

/*
 * Vue Directive - Text Masking with Vanilla Text Mask
 * https://github.com/text-mask/text-mask/tree/master/vanilla
 *
 * This directive binds input masking via Text Mask. Once the element is
 * destroyed it will be unbinded. Pass an options object, same as you would
 * normally, as a parameter on the element being bound.
 */

/**
 * Initialize variable to store directive's `this` so that we can use its
 * context in inputHandler called via event listener
 */
let instance

// Register the input handler to watch for updates
const inputHandler = ({target: {value}}) => {
  return instance.textMaskInputElement.update(value)
}

export default {
  textMaskInputElement: 0,
  params: ['maskOptions'],
  /**
   * Use the element (should be a text input) calling the directive as an
   * option for the text mask. Expect options as params, but if none are sent
   * just use the element as the only option. Send all options together in an
   * object to createTextMaskInputElement (from Core). Add an event listener to
   * watch and update with changes.
   */
  bind() {
    instance = this
    let options = instance.params.maskOptions || {}
    options.inputElement = instance.el
    instance.textMaskInputElement = createTextMaskInputElement(options)
    instance.el.addEventListener('input', inputHandler)
  },
  /**
   * via Vue API
   *
   * Destroy the event listener attached to the input via text mask. This will
   * protect the application / tidy from memory leaks.
   */
  unbind() {
    instance.el.removeEventListener('input', inputHandler)
  }
}
