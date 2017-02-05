import createTextMaskInputElement from '../../core/src/createTextMaskInputElement.js'

export default {

  // Input event callback will be stored in this variable
  // because we'll need it for unbind method
  callback: null,

  bind (el, binding, vnode) {
    // Check for empty value is good for list rendering (some inputs has no masks)
    if (!binding.value) {
      return
    }

    binding.value.inputElement = el

    const textMaskInputElement = createTextMaskInputElement(binding.value)

    // We need to update v-model when an input event occurs
    binding.def.callback = event => {
      textMaskInputElement.update(event.target.value)

      // If v-model has been set, emit the input event to update the model
      if (vnode.data.directives.find(d => d.rawName === 'v-model')) {
        vnode.data.on.input.fn(event);
      }
      // Fix for input-components when v-model is binded to parent element
      else if (vnode.context.$vnode.data.directives.find(d => d.rawName === 'v-model')) {
        vnode.context.$vnode.on.input.fn(event);
      }
    }

    el.addEventListener('input', binding.def.callback)
  },

  unbind (el, binding) {
    el.removeEventListener('input', binding.def.callback)
  }

}

export {default as conformToMask} from '../../core/src/conformToMask.js'
