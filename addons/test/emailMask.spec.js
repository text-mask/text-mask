const emailMask = (isVerify()) ?
  require('../dist/emailMask.js').default :
  require('../src/emailMask.js').default

describe.only('emailMask', () => {
  it('considers a non-valid string to be local part only', () => {
    expect(emailMask({valueToConform: 'f'})).to.equal('*[]@*[].*')
  })
  
  it('returns a mask that can accommodate the length of the local part', () => {
    expect(emailMask({valueToConform: 'ff'})).to.equal('**[]@*[].*')
    expect(emailMask({valueToConform: 'ffz@_._'})).to.equal('***[]@*[].*')
    expect(emailMask({valueToConform: 'ffz@f5._'})).to.equal('***[]@**[].*')
  })
  
  
})
