import packageJson from '../package.json'

const maskInput = (isVerify()) ?
  require(`../${packageJson.main}`).default :
  require('../src/vanillaTextMask.js').default

describe('inputMask', () => {
  it('does not throw when instantiated', () => {
    const inputElement = document.createElement('input')

    expect(() => maskInput({
      inputElement,
      mask: '111',
      guide: true,
    })).not.to.throw()
  })
})
