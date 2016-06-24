import packageJson from '../package.json'
import {convertMaskToPlaceholder} from '../src/utilities'
import conformToMask from '../src/conformToMask.js'

const createInputElementTextMask = (isVerify()) ?
  require(`../${packageJson.main}`).createInputElementTextMask :
  require('../src/createInputElementTextMask.js').default

describe.only('createInputElementTextMask', () => {
  const sandbox = sinon.sandbox.create()

  let inputElement
  let maskedInputElementControl

  beforeEach(() => {
    inputElement = document.createElement('input')
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('takes an inputElement and other Text Mask parameters and returns an object which ' +
     'allows updating and controlling the masking of the input element', () => {
    const maskedInputElementControl = createInputElementTextMask({
      inputElement,
      mask: '(111) 111-1111'
    })

    expect(maskedInputElementControl.update).to.be.a('function')
  })

  it('sets a default placeholder if the input element does not have one', () => {
    const mask = '(111) 111-1111'

    createInputElementTextMask({
      inputElement,
      mask
    })

    expect(inputElement.placeholder).to.equal(convertMaskToPlaceholder({mask}))
  })

  it('leaves current placeholder as is if it exists', () => {
    const mask = '(111) 111-1111'

    inputElement.placeholder = 'hello'

    createInputElementTextMask({
      inputElement,
      mask
    })

    expect(inputElement.placeholder).to.equal('hello')
  })

  describe('`update` method', () => {
    it('conforms whatever value is in the input element to a mask', () => {
      const mask = '(111) 111-1111'

      const textMaskControl = createInputElementTextMask({
        inputElement,
        mask
      })

      inputElement.value = '2'

      expect(inputElement.value).to.equal('2')

      textMaskControl.update()

      expect(inputElement.value).to.equal('(2__) ___-____')
    })

    it('accepts a string to conform and overrides whatever value is in the input element', () => {
      const mask = '(111) 111-1111'

      const textMaskControl = createInputElementTextMask({
        inputElement,
        mask
      })

      inputElement.value = '2'

      expect(inputElement.value).to.equal('2')

      textMaskControl.update('123')

      expect(inputElement.value).to.equal('(123) ___-____')
    })

    it('does not conform given parameter if it is the same as the previousConformedInput', () => {
      const conformToMaskSpy = sinon.spy(conformToMask)

      createInputElementTextMask.__Rewire__('conformToMask', conformToMaskSpy)

      const mask = '(111) 111-1111'

      const textMaskControl = createInputElementTextMask({
        inputElement,
        mask
      })

      inputElement.value = '2'

      expect(inputElement.value).to.equal('2')

      textMaskControl.update()

      expect(inputElement.value).to.equal('(2__) ___-____')

      expect(conformToMaskSpy.callCount).to.equal(1)

      textMaskControl.update('(2__) ___-____')

      expect(conformToMaskSpy.callCount).to.equal(1)

      createInputElementTextMask.__ResetDependency__('conformToMask')
    })
  })
})
