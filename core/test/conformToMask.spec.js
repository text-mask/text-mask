import conformToMask from '../src/conformToMask.js'
import dynamicTests from 'mocha-dynamic-tests'
import chai from 'chai'

const expect = chai.expect

describe('conformToMask', () => {
  describe('simple transformations', () => {
    describe('given mask 11/11/1111', () => {
      const mask = '11/11/1111'

      it('transforms 1__/__/____ to 1_/__/____', () => {
        expect(conformToMask(
          '1__/__/____',
          mask
        ).output).to.equal('1_/__/____')
      })

      it('transforms 11_/__/____ to 11/__/____', () => {
        expect(conformToMask(
          '11_/__/____',
          mask
        ).output).to.equal('11/__/____')
      })

      it('transforms 1111 to 11/11/____', () => {
        expect(conformToMask('1111', mask).output).to.equal('11/11/____')
      })

      it('transforms 23892389 to 23/89/2389', () => {
        expect(conformToMask('23892389', mask).output).to.equal('23/89/2389')
      })

      it('transforms 2389238 to 23/89/238_', () => {
        expect(conformToMask('2389238', mask).output).to.equal('23/89/238_')
      })

      it('does its thing', () => {
        expect(conformToMask('2', '11/11').output).to.equal('2_/__')
      })
    })

    describe('given mask (111) 111-1111', () => {
      const mask = '(111) 111-1111'

      it('transforms 777 to (777) ___-___', () => {
        expect(conformToMask('777', mask).output).to.equal('(777) ___-____')
      })

      it('transforms 7771 to (777) 1__-___', () => {
        expect(conformToMask('7771', mask).output).to.equal('(777) 1__-____')
      })
    })
  })

  describe('transformations for sparse inputs', () => {
    describe('given mask 11/11/1111', () => {
      const mask = '11/11/1111'

      it('transforms 1_/__/___1_ to 1_/__/___1', () => {
        expect(conformToMask('1_/__/___1_', mask).output).to.equal('1_/__/___1')
      })

      it('transforms 1_/1__/___1 to 1_/1_/___1', () => {
        expect(conformToMask('1_/1__/___1', mask).output).to.equal('1_/1_/____')
      })
    })
  })

  dynamicTests([{
    userInput: '(123 ___-____',
    mask: '(111) 111-1111',
    expected: '(12_) ___-____',
    skip: true
  }], (test) => ({
    description: `for userInput ${test.userInput} and mask ${test.mask}, outputs ${test.expected}`,

    body: () => {
      expect(conformToMask(test.userInput, test.mask).output).to.equal(test.expected)
    }
  }))
})
