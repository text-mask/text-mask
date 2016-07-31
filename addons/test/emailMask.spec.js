const emailMask = (isVerify()) ?
  require('../dist/emailMask.js').default :
  require('../src/emailMask.js').default

describe.only('emailMask', () => {
  it('masks the first character to `*[]@*.*', () => {
    expect(emailMask('c')).to.equal('*[]@*.*')
  })
})
