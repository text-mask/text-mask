import conformToMask from '../src/conformToMask.js'
import chai from 'chai'

const expect = chai.expect

describe('conformToMask', () => {
  describe('simple transformations', () => {
    describe('given pattern 11/11/1111', () => {
      const pattern = '11/11/1111'

      it('transforms 1__/__/____ to 1_/__/____', () => {
        expect(conformToMask(
          '1__/__/____',
          pattern
        )).to.equal('1_/__/____')
      })

      it('transforms 11_/__/____ to 11/__/____', () => {
        expect(conformToMask(
          '11_/__/____',
          pattern
        )).to.equal('11/__/____')
      })

      it('transforms 1111 to 11/11/____', () => {
        expect(conformToMask('1111', pattern)).to.equal('11/11/____')
      })

      it('transforms 23892389 to 23/89/2389', () => {
        expect(conformToMask('23892389', pattern)).to.equal('23/89/2389')
      })

      it('transforms 2389238 to 23/89/238_', () => {
        expect(conformToMask('2389238', pattern)).to.equal('23/89/238_')
      })
    })

    describe('given pattern (111) 111-1111', () => {
      const pattern = '(111) 111-1111'

      it('transforms 777 to (777) ___-___', () => {
        expect(conformToMask('777', pattern)).to.equal('(777) ___-____')
      })

      it('transforms 7771 to (777) 1__-___', () => {
        expect(conformToMask('7771', pattern)).to.equal('(777) 1__-____')
      })
    })
  })

  describe('transformations for sparse inputs', () => {
    describe('given pattern 11/11/1111', () => {
      const pattern = '11/11/1111'

      it('transforms 1_/__/___1_ to 1_/__/___1', () => {
        expect(conformToMask('1_/__/___1_', pattern)).to.equal('1_/__/___1')
      })

      it('transforms 1_/1__/___1 to 1_/1_/___1', () => {
        expect(conformToMask('1_/1__/___1', pattern)).to.equal('1_/1_/___1')
      })
    })
  })
})
