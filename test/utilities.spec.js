import chai from 'chai'
import {
  getDelimiters,
  constructConformedString
} from '../src/utilities.js'

const expect = chai.expect

describe('utilities', () => {
  describe('getDelimiters', () => {
    it('returns an array', () => {
      expect(getDelimiters()).to.be.an('array')
    })

    it('returns [`/`] for pattern `11/11/1111`', () => {
      expect(getDelimiters('11/11/1111')).to.eql(['/'])
    })
  })

  describe('constructConformedString', () => {
    it('does its thing', () => {
      expect(constructConformedString([
        {length: 2, delimiter: '/', content: '11'},
        {length: 2, delimiter: '/', content: '11'},
        {length: 4, delimiter: undefined, content: undefined}
      ])).to.equal('11/11/____')
    })
  })
})
