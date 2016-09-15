import Vue from 'vue'
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'

/*
 * Vue Directive - Text Masking with Vanilla Text Mask
 * https://github.com/text-mask/text-mask/tree/master/vanilla
 *
 * This directive binds input masking via Text Mask. Once the element is
 * destroyed it will be unbinded. Pass an options object, same as you would
 * normally, as a parameter on the element being bound.
 */

export default Vue.directive('text-mask', {
  params: ['maskOptions'],
  textMaskInputElement: null,
  // Register the input handler to watch for updates
  inputHandler({target: {value}}) {
    return this.textMaskInputElement.update(value)
  },
  /**
   * Use the element (should be a text input) calling the directive as an
   * option for the text mask. Expect options as params, but if none are sent
   * just use the element as the only option. Send all options together in an
   * object to createTextMaskInputElement (from Core). Add an event listener to
   * watch and update with changes.
   */
  bind() {
    let options = this.params.maskOptions || {}
    options.inputElement = this.el
    this.textMaskInputElement = createTextMaskInputElement(options)
    // We need to bind the context of this (the directive) to the inputHandler
    // so that it can access textMaskInputElement from the event listener.
    this.inputHandler = this.inputHandler.bind(this)
    this.el.addEventListener('input', this.inputHandler)
  },
  /**
   * via Vue API
   *
   * Destroy the event listener attached to the input via text mask. This will
   * protect the application / tidy from memory leaks.
   */
  unbind() {
    this.el.removeEventListener('input', this.inputHandler)
  }
})
