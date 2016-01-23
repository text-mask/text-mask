import getLongestCommonSequences from '../src/getLongestCommonSequences.js'
import chai from 'chai'

const expect = chai.expect

describe.only('getLongestCommonSequences', () => {
  it('returns an array', () => {
    expect(getLongestCommonSequences()).to.be.an('array')
  })

  it('takes two strings as input', () => {
    expect(() => getLongestCommonSequences('one', 'two')).to.not.throw()
  })

  it('returns [`bilit`] when given string1 = `embeddability` and string2 = `mobility`', () => {
    expect(getLongestCommonSequences('embeddability', 'mobility')).to.equal(['bilit'])
  })

  it('returns [`__/__/____`] given string1 = `__/__/____` and string2 = `/__/__/____`', () => {
    expect(getLongestCommonSequences('__/__/____', '/__/__/____')).to.equal(['__/__/____'])
  })
})
