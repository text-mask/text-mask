import 'reflect-metadata'
import packageJson from '../package.json'

const MaskedInput = (isVerify()) ?
  require(`../${packageJson.main}`).default :
  require('../dist/textMask.js').default

describe('MaskedInput', () => {
  let inputElement
  let ngModel

  beforeEach(() => {
    inputElement = document.createElement('input')
  })

  it('does not throw when instantiated', () => {
    expect(() => {
      const maskedInput = new MaskedInput({nativeElement: inputElement}, ngModel)

      maskedInput.ngOnInit({mask: '(111)'})

      return maskedInput
    }).not.to.throw()
  })
})
