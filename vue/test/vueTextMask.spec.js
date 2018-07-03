import packageJson from '../package.json'
import Vue from 'vue/dist/vue.js'

const VueTextMask = (isVerify()) ?
  require(`../${packageJson.main}`) :
  require('../src/vueTextMask.js')

const maskedInput = VueTextMask.default
const conformToMask = VueTextMask.conformToMask

const emailMask = (isVerify()) ?
  require('../../addons/dist/emailMask.js').default :
  require('../../addons/src/emailMask.js').default

function mountComponent(Component, propsData) {
  const Ctor = Vue.extend(Component)
  return new Ctor({propsData}).$mount()
}

const eventTest = Vue.extend({
  template: `<div>
    <masked-input
      ref="maskedInput"
      type="text"
      name="test"
      :mask="[/\d/,/\d/,/\d/]"
      @focus="callback('focus')"
      @blur="callback('blur')"
      @keypress="callback('keypress')">
    </masked-input>
  </div>`,
  components: {maskedInput},
  methods: {
    callback(e) { },
  },
})

describe('inputMask', () => {
  it('renders', () => {
    const vm = mountComponent(maskedInput, {
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })
    expect(vm.$el.value).to.equal('')
  })

  it('renders correctly with an initial value', () => {
    const vm = mountComponent(maskedInput, {
      value: '123',
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })
    expect(vm.$el.value).to.equal('(123) ___-____')
  })

  it('renders mask instead of empty string when showMask is true', () => {
    const vm = mountComponent(maskedInput, {
      showMask: true,
      value: '',
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })
    expect(vm.$el.value).to.equal('(___) ___-____')
  })

  it('does not render mask instead of empty string when showMask is false', () => {
    const vm = mountComponent(maskedInput, {
      showMask: false,
      value: '',
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })
    expect(vm.$el.value).to.equal('')
  })

  it('createTextMaskInputElement is a function', () => {
    const Ctor = Vue.extend(maskedInput)
    const vm = new Ctor({
      propsData: {
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      }
    })
    expect(typeof vm.createTextMaskInputElement).to.equal('function')
  })

  it('calls createTextMaskInputElement() on render with the correct config', () => {
    const mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    const placeholderChar = '*'
    const pipe = () => { return 1 }

    const Ctor = Vue.extend(maskedInput)
    const _vm = new Ctor({
      propsData: {
        value: '123',
        mask,
        guide: true,
        placeholderChar,
        keepCharPositions: true,
        pipe
      }
    })

    // stub the createTextMaskInputElement method
    let textMaskConfig
    _vm.createTextMaskInputElement = sinon.spy((_textMaskConfig) => {
      textMaskConfig = _textMaskConfig
      return {
        update() {}
      }
    })

    const vm = _vm.$mount()
    expect(_vm.createTextMaskInputElement.callCount).to.equal(1)
    expect(textMaskConfig.inputElement).to.deep.equal(vm.$refs.input)
    expect(textMaskConfig.mask).to.deep.equal(mask)
    expect(textMaskConfig.guide).to.equal(true)
    expect(textMaskConfig.placeholderChar).to.equal(placeholderChar)
    expect(textMaskConfig.keepCharPositions).to.equal(true)
    expect(textMaskConfig.pipe).to.deep.equal(pipe)
  })

  it('initializes textMaskInputElement property', () => {
    const vm = mountComponent(maskedInput, {
      value: '1234',
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })
    expect(typeof vm.textMaskInputElement).to.equal('object')
    expect(typeof vm.textMaskInputElement.state).to.equal('object')
    expect(typeof vm.textMaskInputElement.state.previousConformedValue).to.equal('string')
    expect(typeof vm.textMaskInputElement.update).to.equal('function')
  })

  it('input event triggers textMaskInputElement.update method', () => {
    let value
    const event = document.createEvent('Event')
    event.initEvent('input', true, true)

    const vm = mountComponent(maskedInput, {
      value: '1234',
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })

    vm.textMaskInputElement.update = sinon.spy((_value) => { value = _value })

    vm.$el.dispatchEvent(event)

    expect(vm.textMaskInputElement.update.callCount).to.equal(1)
    expect(value).to.equal('(123) 4__-____')
  })

  it('does not render masked characters', () => {
    const vm = mountComponent(maskedInput, {
      value: 'abc',
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })
    expect(vm.$el.value).to.equal('')
  })

  it('does not allow masked characters', () => {
    const vm = mountComponent(maskedInput, {
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })
    expect(vm.$el.value).to.equal('')
    vm.textMaskInputElement.update('abc')
    expect(vm.$el.value).to.equal('')
  })

  it('can be disabled by setting the mask to false', () => {
    const vm = mountComponent(maskedInput, {
      value: '123abc',
      mask: false
    })
    expect(vm.$el.value).to.equal('123abc')
  })

  it('can call textMaskInputElement.update to update the inputElement.value', () => {
    const vm = mountComponent(maskedInput, {
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })
    expect(vm.$el.value).to.equal('')

    vm.$el.value = '12345'
    vm.textMaskInputElement.update()
    expect(vm.$el.value).to.equal('(123) 45_-____')
  })

  it('can pass value to textMaskInputElement.update method', () => {
    const vm = mountComponent(maskedInput, {
      value: '123',
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })
    expect(vm.$el.value).to.equal('(123) ___-____')

    vm.textMaskInputElement.update('1234')
    expect(vm.$el.value).to.equal('(123) 4__-____')
  })

  it('can pass textMaskConfig to textMaskInputElement.update method', () => {
    const vm = mountComponent(maskedInput, {
      value: '123',
      mask: false
    })
    expect(vm.$el.value).to.equal('123')

    vm.textMaskInputElement.update('1234', {
      inputElement: vm.$el,
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })
    expect(vm.$el.value).to.equal('(123) 4__-____')
  })

  it('accepts function as mask property', () => {
    const vm = mountComponent(maskedInput, {
      value: '1234',
      mask: (value) => {
        expect(value).to.equal('1234')
        return ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      }
    })
    expect(vm.$el.value).to.equal('(123) 4__-____')
  })

  it('accepts object as mask property', () => {
    const vm = mountComponent(maskedInput, {
      value: 'abc',
      mask: emailMask
    })
    expect(vm.$el.value).to.equal('abc@ .')
  })

  it('accepts pipe function', () => {
    const vm = mountComponent(maskedInput, {
      value: '1234',
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      pipe: (value) => {
        expect(value).to.equal('(123) 4__-____')
        return 'abc'
      }
    })
    expect(vm.$el.value).to.equal('abc')
  })

  it('emits focus and blur events for parent components', () => {
    const vm = mountComponent(eventTest)

    vm.callback = sinon.spy()

    vm.$refs.maskedInput.$el.focus()
    vm.$refs.maskedInput.$el.blur()
    expect(vm.callback.callCount).to.equal(2)
    expect(vm.callback.getCall(0).args[0]).to.equal('focus')
    expect(vm.callback.getCall(1).args[0]).to.equal('blur')
  })

  it('does not emit "input" event after component mount', () => {
    let isEmitted = false
    const Ctor = Vue.extend(maskedInput)
    const vm = new Ctor({
      propsData: {
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      }
    })
    vm.$on('input', data => { isEmitted = true })
    vm.$mount()

    expect(isEmitted).to.equal(false)
  })

  it('emits keypress event for parent components', () => {
    const vm = mountComponent(eventTest)

    vm.callback = sinon.spy()

    const e = new window.KeyboardEvent('keypress', {
      key: 'e',
      bubbles: true,
      cancelable: true
    })
    vm.$refs.maskedInput.$el.dispatchEvent(e)

    expect(vm.callback.callCount).to.equal(1)
    expect(vm.callback.getCall(0).args[0]).to.equal('keypress')
  })
})

describe('conformToMask', () => {
  it('is a function', () => {
    expect(typeof conformToMask).to.equal('function')
  })
})
