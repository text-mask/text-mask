require('babel-core/register')({plugins: ['babel-plugin-rewire']})

import packageJson from '../package.json'
import {convertMaskToPlaceholder} from '../src/utilities'
import conformToMask from '../src/conformToMask.js'
import {placeholderChar} from '../src/constants.js'

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

  it('works with dynamic masks', () => {
    const mask = () => '1111'

    expect(() => createTextMaskInputElement({inputElement, mask})).to.not.throw()
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
      it('does not conform given parameter if it is the same as the previousConformedValue', () => {
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
      const textMaskControl = createTextMaskInputElement({inputElement, mask, placeholderChar})

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

    it('calls the dynamic mask function before every update', () => {
      const maskSpy = sinon.spy(() => '1111')
      const textMaskControl = createTextMaskInputElement({inputElement, mask: maskSpy})

      inputElement.value = '2'
      textMaskControl.update()
      expect(inputElement.value).to.equal('2___')

      inputElement.value = '24'
      textMaskControl.update()
      expect(inputElement.value).to.equal('24__')

      expect(maskSpy.callCount).to.equal(2)
    })

    describe('`onAccept` callback', () => {
      it('is called when the updated value is different than the previous value', () => {
        const mask = '(111) 111-1111'
        const onAccept = sinon.spy()
        const textMaskControl = createTextMaskInputElement({inputElement, mask, onAccept})

        inputElement.value = '2'

        textMaskControl.update()

        expect(onAccept.callCount).to.equal(1)
      })

      it('is not called when the updated value is the same as the previous value', () => {
        const mask = '(111) 111-1111'
        const onAccept = sinon.spy()
        const textMaskControl = createTextMaskInputElement({inputElement, mask, onAccept})

        inputElement.value = '2'
        textMaskControl.update() // after this, value is (2__) ___-____

        inputElement.value = '(2B_) ___-____' // the 'B' will be rejected
        textMaskControl.update() // after this, value is (2__) ___-____

        expect(onAccept.callCount).to.equal(1)
      })
    })

    describe('`onReject` callback', () => {
      it('is called when the updated value is the same as the old value', () => {
        const mask = '(111) 111-1111'
        const onReject = sinon.spy()
        const textMaskControl = createTextMaskInputElement({inputElement, mask, onReject})

        inputElement.value = '2'
        textMaskControl.update() // after this, value is (2__) ___-____

        inputElement.value = '(2B_) ___-____' // the 'B' will be rejected
        textMaskControl.update() // after this, value is (2__) ___-____

        expect(onReject.callCount).to.equal(1)
      })

      it('is not called when the updated value is different than the previous value', () => {
        const mask = '(111) 111-1111'
        const onReject = sinon.spy()
        const textMaskControl = createTextMaskInputElement({inputElement, mask, onReject})

        inputElement.value = '2'
        textMaskControl.update()

        expect(onReject.callCount).to.equal(0)
      })

      it('is not called when the operation is deletion, even if the current and previous ' +
        'values are not different', () => {
        const mask = '(111) 111-1111'
        const onReject = sinon.spy()
        const textMaskControl = createTextMaskInputElement({inputElement, mask, onReject})

        inputElement.value = '2'
        textMaskControl.update() // after this, value is (2__) ___-____

        inputElement.value = '(2_) ___-____'
        textMaskControl.update() // after this, value is (2__) ___-____

        expect(onReject.callCount).to.equal(0)
      })

      it('is not called when a character is rejected because it exceeds the mask length', () => {
        const mask = '(111) 111-1111'
        const onReject = sinon.spy()
        const textMaskControl = createTextMaskInputElement({inputElement, mask, onReject})

        inputElement.value = '2'
        textMaskControl.update() // after this, value is (2__) ___-____

        inputElement.value = '(233) 543-6543'
        textMaskControl.update() // after this, value is (233) 543-6543

        inputElement.value = '(233) 543-65435'
        inputElement.selectionStart = '(233) 543-65435'.length
        textMaskControl.update() // after this, value is (233) 543-6543

        expect(onReject.callCount).to.equal(0)
      })
    })
  })
})
