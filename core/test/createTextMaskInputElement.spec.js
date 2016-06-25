require('babel-core/register')({plugins: ['babel-plugin-rewire']})

import packageJson from '../package.json'
import {convertMaskToPlaceholder} from '../src/utilities'
import conformToMask from '../src/conformToMask.js'

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
      mask: '(111) 111-1111'
    })

    expect(maskedInputElementControl.update).to.be.a('function')
  })

  it('sets a default placeholder if the input element does not have one', () => {
    const mask = '(111) 111-1111'

    createTextMaskInputElement({inputElement, mask})

    expect(inputElement.placeholder).to.equal(convertMaskToPlaceholder(mask))
  })

  it('leaves current placeholder as is if it exists', () => {
    const mask = '(111) 111-1111'

    inputElement.placeholder = 'hello'

    createTextMaskInputElement({inputElement, mask})

    expect(inputElement.placeholder).to.equal('hello')
  })

  describe('`update` method', () => {
    it('conforms whatever value is in the input element to a mask', () => {
      const mask = '(111) 111-1111'
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      inputElement.value = '2'
      textMaskControl.update()
      expect(inputElement.value).to.equal('(2__) ___-____')
    })

    it('accepts a string to conform and overrides whatever value is in the input element', () => {
      const mask = '(111) 111-1111'
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      inputElement.value = '2'
      textMaskControl.update('123')
      expect(inputElement.value).to.equal('(123) ___-____')
    })

    if (!isVerify()) {
      it('does not conform given parameter if it is the same as the previousConformedInput', () => {
        const conformToMaskSpy = sinon.spy(conformToMask)
        const mask = '(111) 111-1111'
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
      const mask = '(111) 111-1111'
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      textMaskControl.update('2')

      expect(inputElement.value).to.equal('(2__) ___-____')
    })

    it('works with a number by coercing it into a string', () => {
      const mask = '(111) 111-1111'
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      textMaskControl.update(2)

      expect(inputElement.value).to.equal('(2__) ___-____')
    })

    it('works with `undefined` and `null` by treating them as empty strings', () => {
      const mask = '(111) 111-1111'
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      textMaskControl.update(undefined)
      expect(inputElement.value).to.equal('')

      textMaskControl.update(null)
      expect(inputElement.value).to.equal('')
    })

    it('throws if given a value that it cannot work with', () => {
      const mask = '(111) 111-1111'
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      expect(() => textMaskControl.update({})).to.throw()
      expect(() => textMaskControl.update(() => 'howdy')).to.throw()
      expect(() => textMaskControl.update([])).to.throw()
    })

    it('adjusts the caret position', () => {
      const mask = '(111) 111-1111'
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      inputElement.focus()
      inputElement.value = '2'
      inputElement.selectionStart = 1

      textMaskControl.update()
      expect(inputElement.selectionStart).to.equal(2)
    })

    it('does not adjust the caret position if the input element is not focused', () => {
      const mask = '(111) 111-1111'
      const textMaskControl = createTextMaskInputElement({inputElement, mask})

      inputElement.value = '2'
      inputElement.selectionStart = 1

      textMaskControl.update()
      expect(inputElement.selectionStart).to.equal(0)
    })
  })
})
