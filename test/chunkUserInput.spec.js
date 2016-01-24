import chai from 'chai'
import chunkUserInput from '../src/chunkUserInput.js'
import {convertPatternToPlaceholder} from '../src/utilities.js'

const expect = chai.expect

describe('chunkUserInput', () => {
  it('returns an array of user input chunks', () => {
    expect(chunkUserInput()).to.be.an('array')
  })

  it('takes two strings, userInput and a pattern', () => {
    expect(() => chunkUserInput('12/32', '11/11')).to.not.throw()
  })

  it('breaks user input into chunks that match given pattern', () => {
    expect(chunkUserInput('11', '11/11')).to.deep.equal(['11'])
  })

  it('returns [`84`, `734`] for input `84/734` and pattern `11/111`', () => {
    expect(chunkUserInput('84/734', '11/111')).to.deep.equal(['84', '734'])
  })

  it('knows how to process `(787) 787-7878` given pattern `(111) 111-1111`', () => {
    expect(chunkUserInput('(787) 787-7878', '(111) 111-1111')).to.deep.equal([
      '787', '787', '7878'
    ])
  })

  it('knows how to process `(787)787-7878` given pattern `(111) 111-1111`', () => {
    expect(chunkUserInput('(787)787-7878', '(111) 111-1111')).to.deep.equal([
      '787', '787', '7878'
    ])
  })
})
