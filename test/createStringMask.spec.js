import createStringMask from '../src/createStringMask.js'
import chai from 'chai'

const expect = chai.expect

describe('createStringMask', () => {
  it('returns a stringMask', () => {
    const stringMask = createStringMask('11/11/1111')

    expect(stringMask.value).to.be.a('function')
  })

  describe('stringMask', () => {
    it('looks like a placeholder with underscores when first initialized', () => {
      const stringMask = createStringMask('11/11')

      expect(stringMask.value()).to.equal('__/__')
    })

    it('allows method chaining', () => {
      const stringMask = createStringMask('11/11')

      expect(() => stringMask.transformFrom('1__/__').value()).to.not.throw()
    })

    it('has a method called `transformFrom` that performs the transformation', () => {
      const stringMask = createStringMask('11/11')

      expect(stringMask.transformFrom('1__/__').value()).to.equal('__/__')
    })

    it('has a method called `value` that returns how the mask is outputted', () => {
      const stringMask = createStringMask('11/11')

      expect(stringMask.value()).to.equal('__/__')
    })
  })
})
