require('ts-node').register({project: './angular2/'}) // Allows us to load a TypeScript file

import 'reflect-metadata'
import packageJson from '../package.json'

const MaskedInput = (isVerify()) ?
  require(`../${packageJson.main}`).default :
  require('../src/angular2TextMask.ts').default

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
