require('babel-core/register')({plugins: ['babel-plugin-rewire']})

import packageJson from '../package.json'
import conformToMask from '../src/conformToMask'
import {placeholderChar} from '../src/constants'

const createTextMaskInputElement = (isVerify()) ?
  require(`../${packageJson.main}`).createTextMaskInputElement :
  require('../src/createTextMaskInputElement.js').default

describe('createTextMaskInputElement', () => {
  let inputElement

  beforeEach(() => {
    inputElement = document.createElement('input')
  })

  it('takes an inputElement and other Text Mask parameters and returns an object which ' +
     'allows updating and controlling the masking of the input element', () => {
    const maskedInputElementControl = createTextMaskInputElement({
      inputElement,
      mask: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    })

    expect(maskedInputElementControl.update).to.be.a('function')
  })

  it('works with mask functions', () => {
    const mask = () => [/\d/, /\d/, /\d/, /\d/]

    expect(() => createTextMaskInputElement({inputElement, mask})).to.not.throw()
  })

  describe('`update` method', () => {
    it('conforms whatever value is in the input element to a mask', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      inputElement.value = '2'
      textMaskControl.update()
      expect(inputElement.value).to.equal('(2__) ___-____')
    })

    it('works after multiple calls', () => {
      const mask = ['+', '1', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      inputElement.value = '2'
      textMaskControl.update()
      expect(inputElement.value).to.equal('+1 (2__) ___-____')

      inputElement.value = '+1 (23__) ___-____'
      inputElement.selectionStart = 6
      textMaskControl.update()
      expect(inputElement.value).to.equal('+1 (23_) ___-____')

      inputElement.value = '+1 (2_) ___-____'
      inputElement.selectionStart = 5
      textMaskControl.update()
      expect(inputElement.value).to.equal('+1 (2__) ___-____')

      inputElement.value = '+1 (__) ___-____'
      inputElement.selectionStart = 4
      textMaskControl.update()
      expect(inputElement.value).to.equal('')
    })

    it('accepts a string to conform and overrides whatever value is in the input element', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      inputElement.value = '2'
      textMaskControl.update('123')
      expect(inputElement.value).to.equal('(123) ___-____')
    })

    if (!isVerify()) {
      it('does not conform given parameter if it is the same as the previousConformedValue', () => {
        const conformToMaskSpy = sinon.spy(conformToMask)
        const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        const textMaskControl = createTextMaskInputElement({inputElement, mask})

        createTextMaskInputElement.__Rewire__('conformToMask', conformToMaskSpy)

        inputElement.value = '2'
        textMaskControl.update()

        expect(inputElement.value).to.equal('(2__) ___-____')
        expect(conformToMaskSpy.callCount).to.equal(1)

        textMaskControl.update('(2__) ___-____')
        expect(conformToMaskSpy.callCount).to.equal(1)

        createTextMaskInputElement.__ResetDependency__('conformToMask')
      })
    }

    it('works with a string', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      textMaskControl.update('2')

      expect(inputElement.value).to.equal('(2__) ___-____')
    })

    it('works with a number by coercing it into a string', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      textMaskControl.update(2)

      expect(inputElement.value).to.equal('(2__) ___-____')
    })

    it('works with `undefined` and `null` by treating them as empty strings', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      textMaskControl.update(undefined)
      expect(inputElement.value).to.equal('')

      textMaskControl.update(null)
      expect(inputElement.value).to.equal('')
    })

    it('throws if given a value that it cannot work with', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      expect(() => textMaskControl.update({})).to.throw()
      expect(() => textMaskControl.update(() => 'howdy')).to.throw()
      expect(() => textMaskControl.update([])).to.throw()
    })

    it('adjusts the caret position', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      const textMaskControl = createTextMaskInputElement({inputElement, mask, placeholderChar})

      inputElement.focus()
      inputElement.value = '2'
      inputElement.selectionStart = 1

      textMaskControl.update()
      expect(inputElement.selectionStart).to.equal(2)
    })

    it('does not adjust the caret position if the input element is not focused', () => {
      const mask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      inputElement.value = '2'
      inputElement.selectionStart = 1

      textMaskControl.update()
      expect(inputElement.selectionStart).to.equal(0)
    })

    it('calls the mask function before every update', () => {
      const maskSpy = sinon.spy(() => [/\d/, /\d/, /\d/, /\d/])
      const textMaskControl = createTextMaskInputElement({inputElement, mask: maskSpy})

      inputElement.value = '2'
      textMaskControl.update()
      expect(inputElement.value).to.equal('2___')

      inputElement.value = '24'
      textMaskControl.update()
      expect(inputElement.value).to.equal('24__')

      expect(maskSpy.callCount).to.equal(2)
    })

    it('can be disabled with `false` mask', () => {
      const mask = false
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      inputElement.value = 'a'
      textMaskControl.update()
      expect(inputElement.value).to.equal('a')
    })

    it('can be disabled by returning `false` from mask function', () => {
      const mask = () => false
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      inputElement.value = 'a'
      textMaskControl.update()
      expect(inputElement.value).to.equal('a')
    })
  })
})
