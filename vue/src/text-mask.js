/**
 * npm i --save-dev vanilla-text-mask
 */
import maskInput from 'vanilla-text-mask'

/*
 * Vue Directive - Text Masking with Vanilla Text Mask
 * https://github.com/text-mask/text-mask/tree/master/vanilla
 *
 * This directive binds input masking via Text Mask. Once the element is
 * destroyed it will be unbinded. Pass an options object, same as you would
 * normally for this plugin, as a parameter on the element being bound.
 */

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
  bind (){
    let options = this.params.maskOptions
    options.inputElement = this.el
    this.masker = maskInput(options)
  },
  /**
   * via Vue API
   *
   * Destroy the event listener attached to the input via text mask. This will
   * protect the application tidy from memory leaks.
   */
  unbind (){
    this.masker.destroy()
  }
}
