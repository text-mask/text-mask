import conformToPattern from '../../stringPattern/src/conformToPattern.js'
import chai from 'chai'

const expect = chai.expect

describe('conformToPattern', () => {
  describe('simple transformations', () => {
    describe('given pattern 11/11/1111', () => {
      const pattern = '11/11/1111'

      it('transforms 1__/__/____ to 1_/__/____', () => {
        expect(conformToPattern(
          '1__/__/____',
          pattern
        )).to.equal('1_/__/____')
      })

      it('transforms 11_/__/____ to 11/__/____', () => {
        expect(conformToPattern(
          '11_/__/____',
          pattern
        )).to.equal('11/__/____')
      })

      it('transforms 1111 to 11/11/____', () => {
        expect(conformToPattern('1111', pattern)).to.equal('11/11/____')
      })

      it('transforms 23892389 to 23/89/2389', () => {
        expect(conformToPattern('23892389', pattern)).to.equal('23/89/2389')
      })

      it('transforms 2389238 to 23/89/238_', () => {
        expect(conformToPattern('2389238', pattern)).to.equal('23/89/238_')
      })
    })

    describe('given pattern (111) 111-1111', () => {
      const pattern = '(111) 111-1111'

      it('transforms 777 to (777) ___-___', () => {
        expect(conformToPattern('777', pattern)).to.equal('(777) ___-____')
      })

      it('transforms 7771 to (777) 1__-___', () => {
        expect(conformToPattern('7771', pattern)).to.equal('(777) 1__-____')
      })
    })
  })

  describe('transformations for sparse inputs', () => {
    describe('given pattern 11/11/1111', () => {
      const pattern = '11/11/1111'

      it('transforms 1_/__/___1_ to 1_/__/___1', () => {
        expect(conformToPattern('1_/__/___1_', pattern)).to.equal('1_/__/___1')
      })

      it('transforms 1_/1__/___1 to 1_/1_/___1', () => {
        expect(conformToPattern('1_/1__/___1', pattern)).to.equal('1_/1_/____')
      })
    })
  })

  describe('simple transformations', () => {
    it('does its thing', () => {
      expect(conformToPattern('2', '11/11')).to.equal('2_/__')
    })
  })
})
