import packageJson from '../package.json'

const VanillaTextMask = (isVerify()) ?
  require(`../${packageJson.main}`) :
  require('../src/vanillaTextMask.js')

const maskInput = VanillaTextMask.default
const conformToMask = VanillaTextMask.conformToMask

describe('inputMask', () => {
  it('does not throw when instantiated', () => {
    const inputElement = document.createElement('input')

    expect(() => maskInput({
      inputElement,
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      guide: true
    })).not.to.throw()
  })

  it('renders correctly with an initial value', () => {
    const inputElement = document.createElement('input')
    inputElement.value = '123'

    maskInput({
      inputElement,
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      guide: true
    })
    expect(inputElement.value).to.equal('(123) ___-____')
  })

  it('renders mask instead of empty string when showMask is true', () => {
    const inputElement = document.createElement('input')

    maskInput({
      showMask: true,
      inputElement,
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      guide: true
    })
    expect(inputElement.value).to.equal('(___) ___-____')
  })

  it('does not render mask instead of empty string when showMask is false', () => {
    const inputElement = document.createElement('input')

    maskInput({
      showMask: false,
      inputElement,
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      guide: true
    })
    expect(inputElement.value).to.equal('')
  })

  it('initializes textMaskInputElement property', () => {
    const inputElement = document.createElement('input')
    inputElement.value = '123'

    const maskedInput = maskInput({
      inputElement,
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      guide: true
    })
    expect(typeof maskedInput.textMaskInputElement).to.equal('object')
    expect(typeof maskedInput.textMaskInputElement.state).to.equal('object')
    expect(typeof maskedInput.textMaskInputElement.state.previousConformedValue).to.equal('string')
    expect(typeof maskedInput.textMaskInputElement.update).to.equal('function')
  })

  it('adds event listener for the input element', () => {
    const inputElement = document.createElement('input')

    // stub the `addEventListener` method
    inputElement.addEventListener = sinon.spy((eventName, handler) => {
      expect(eventName).to.equal('input')
      expect(typeof handler).to.equal('function')
    })

    maskInput({
      inputElement,
      mask: false,
      guide: true
    })

    expect(inputElement.addEventListener.callCount).to.equal(1)
  })

  it('input event triggers textMaskInputElement.update method', () => {
    const inputElement = document.createElement('input')
    inputElement.value = '123'

    const maskedInput = maskInput({
      inputElement,
      mask: false,
      guide: true
    })

    maskedInput.textMaskInputElement.update = sinon.spy(() => {})

    const event = document.createEvent('Event')
    event.initEvent('input', true, true)
    inputElement.dispatchEvent(event)

    expect(maskedInput.textMaskInputElement.update.callCount).to.equal(1)
  })

  it('does not allow masked characters', () => {
    const inputElement = document.createElement('input')

    const maskedInput = maskInput({
      inputElement,
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      guide: true
    })

    expect(inputElement.value).to.equal('')
    maskedInput.textMaskInputElement.update('abc')
    expect(inputElement.value).to.equal('')
  })

  it('can be disabled by setting the mask to false', () => {
    const inputElement = document.createElement('input')
    inputElement.value = '123abc'
    const maskedInput = maskInput({
      inputElement,
      mask: false
    })
    expect(inputElement.value).to.equal('123abc')

    maskedInput.textMaskInputElement.update('foo')
    expect(inputElement.value).to.equal('123abc')
  })

  it('can call textMaskInputElement.update to update the inputElement.value', () => {
    const inputElement = document.createElement('input')
    const maskedInput = maskInput({
      inputElement,
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      guide: true
    })
    expect(inputElement.value).to.equal('')

    inputElement.value = '12345'
    maskedInput.textMaskInputElement.update()
    expect(inputElement.value).to.equal('(123) 45_-____')
  })

  it('can pass value to textMaskInputElement.update method', () => {
    const inputElement = document.createElement('input')
    const maskedInput = maskInput({
      inputElement,
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      guide: true
    })
    inputElement.value = '123'
    expect(inputElement.value).to.equal('123')

    maskedInput.textMaskInputElement.update('1234')
    expect(inputElement.value).to.equal('(123) 4__-____')
  })

  it('can pass textMaskConfig to textMaskInputElement.update method', () => {
    const inputElement = document.createElement('input')
    inputElement.value = '123'

    const maskedInput = maskInput({
      inputElement,
      mask: false,
      guide: true
    })
    expect(inputElement.value).to.equal('123')

    maskedInput.textMaskInputElement.update('1234', {
      inputElement,
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })
    expect(inputElement.value).to.equal('(123) 4__-____')
  })

  it('destroy method removes event listener', () => {
    const inputElement = document.createElement('input')

    // stub the `removeEventListener` method
    inputElement.removeEventListener = sinon.spy((eventName, handler) => {
      expect(eventName).to.equal('input')
      expect(typeof handler).to.equal('function')
    })

    const maskedInput = maskInput({
      inputElement,
      mask: false,
      guide: true
    })

    maskedInput.destroy()

    expect(inputElement.removeEventListener.callCount).to.equal(1)
  })
})

describe('conformToMask', () => {
  it('is a function', () => {
    expect(typeof conformToMask).to.equal('function')
  })
})
