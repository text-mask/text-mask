import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

export default {
  render(h) {
    return h('input', {
      ref: 'input',
      domProps: {
        value: this.value
      },
      attrs: this.$attrs,
      on: Object.assign({...this.$listeners}, {
        input: (event) => this.updateValue(event.target.value),
      })
    })
  },

  name: 'masked-input',

  inheritAttrs: false,

  props: {
    value: {
      type: String,
      default: ''
    },
    mask: {
      type: [Array, Function, Boolean, Object],
      required: true
    },
    guide: Boolean,
    placeholderChar: String,
    keepCharPositions: Boolean,
    pipe: Function,
    showMask: Boolean,
  },

  mounted() {
    this.initMask()
    this.$watch(vm => {
      return [
        vm.guide,
        vm.placeholderChar,
        vm.keepCharPositions,
        vm.pipe,
        vm.showMask
      ].join()
    }, () => this.bind())
  },

  methods: {
    createTextMaskInputElement,

    setTextMaskInputElement() {
      this.textMaskInputElement = this.createTextMaskInputElement({
        inputElement: this.$refs.input,
        ...this.$options.propsData
      })
    },

    initMask() {
      this.setTextMaskInputElement()
      this.textMaskInputElement.update(this.value)
    },

    bind() {
      this.setTextMaskInputElement()
      this.updateValue(this.value)
    },

    updateValue(value) {
      this.textMaskInputElement.update(value)
      this.$emit('input', this.$refs.input.value)
    },
  },

  watch: {
    // other 'watch'ers defined in mounted hook

    mask(newMask, oldMask) {
      // NB: this gets called repeatedly if 'mask' is defined in the template instead of in data
      // Check if the mask has changed (Vue cannot detect whether an array has changed)
      if (JSON.stringify(oldMask) !== JSON.stringify(newMask)) {
        this.bind()
      }
    }
  }
}

export {default as conformToMask} from '../../core/src/conformToMask.js'
