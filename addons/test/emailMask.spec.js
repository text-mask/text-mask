const emailMask = (isVerify()) ?
  require('../dist/emailMask.js').default :
  require('../src/emailMask.js').default

console.clear = () => null

const config = {placeholderChar: '_'}

describe.only('emailMask', () => {
  it('returns an email mask that matches the length of the user input', () => {
    expect(emailMask('m@m.c', config)).to.equal('*[]@[]*[].[]*')
    expect(emailMask('mm@mm.cc', config)).to.equal('**[]@[]**[].[]**')
  })

  it.only('returns a space for domain name if it is missing', () => {
    expect(emailMask('c', config)).to.equal('*[]@[] [].[]')
    expect(emailMask('m@.c', config)).to.equal('*[]@[] [].[]*')
  })

  it('removes the caret trap when user enters @ and allows a character after it', () => {
    expect(emailMask('c@@', config)).to.equal('*@[]*[].[]')
  })

  it('appends a dot when user starts entering domain', () => {
    expect(emailMask('m@m', config)).to.equal('*[]@[]*[].[]')
  })

  it('allows an email with no local part', () => {
    expect(emailMask('@m', config)).to.equal('[]@[]*[].[]')
  })

  it('removes the dot and space in the end ')
})
