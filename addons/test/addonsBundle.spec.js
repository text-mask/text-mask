const addonsBundle = (isVerify()) ?
  require('../dist/textMaskAddons.js') :
  require('../src/index.js')

const createAutoCorrectedDatePipeFn = (isVerify()) ?
  require('../dist/textMaskAddons.js').createAutoCorrectedDatePipe :
  require('../src/index.js').createAutoCorrectedDatePipe

const createNumberMaskFn = (isVerify()) ?
  require('../dist/textMaskAddons.js').createNumberMask :
  require('../src/index.js').createNumberMask

const emailMaskObj = (isVerify()) ?
  require('../dist/textMaskAddons.js').emailMask :
  require('../src/index.js').emailMask

describe('bundle', () => {
  it('exposes all the addons', () => {
    expect(addonsBundle.createAutoCorrectedDatePipe).not.to.be.an('undefined')
    expect(addonsBundle.createAutoCorrectedDatePipe).to.equal(createAutoCorrectedDatePipeFn)
    expect(addonsBundle.createNumberMask).not.to.be.an('undefined')
    expect(addonsBundle.createNumberMask).to.equal(createNumberMaskFn)
    expect(addonsBundle.emailMask).not.to.be.an('undefined')
    expect(addonsBundle.emailMask).to.equal(emailMaskObj)
  })
})
