import packageJson from '../package.json'
import Vue from 'vue'

const maskedInput = (isVerify()) ?
  require(`../${packageJson.main}`).default :
  require('../src/vueTextMask.js').default

const emailMask = (isVerify()) ?
  require('../../addons/dist/emailMask.js').default :
  require('../../addons/src/emailMask.js').default

function mountComponent(Component, propsData) {
  const Ctor = Vue.extend(Component)
  return new Ctor({propsData}).$mount()
}

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
})
