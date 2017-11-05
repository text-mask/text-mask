import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

export default {
  render(h) {
    return h('input', {
      ref: 'input',
      domProps: {
        value: this.value
      },
      on: {
        input: (event) => this.updateValue(event.target.value),
        focus: (event) => this.emitEvent(event),
        blur: (event) => this.emitEvent(event),
        keypress: (event) => this.emitEvent(event)
      }
    })
  },

  name: 'masked-input',

  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },

    mask: {
      type: [Array, Function, Boolean, Object],
      required: true
    },

    guide: {
      type: Boolean,
      required: false
    },

    placeholderChar: {
      type: String,
      required: false
    },

    keepCharPositions: {
      type: Boolean,
      required: false
    },

    pipe: {
      type: Function,
      required: false
    },

    showMask: {
      type: Boolean,
      required: false
    }
  },

  mounted() {
    this.initMask()
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

    emitEvent(event) {
      this.$emit(event.type, event)
    }
  },

  watch: {
    mask(newMask) {
      // Check if the mask has changed (Vue cannot detect whether an array has changed)
      if (this.mask !== newMask) {
        this.bind()
      }
    },

    guide() {
      this.bind()
    },

    placeholderChar() {
      this.bind()
    },

    keepCharPositions() {
      this.bind()
    },

    pipe() {
      this.bind()
    },

    showMask() {
      this.bind()
    }
  }
}

export {default as conformToMask} from '../../core/src/conformToMask.js'
