import createStringMask from '../src/createStringMask.js'
import chai from 'chai'

const expect = chai.expect

describe('stringMask simple transformations', () => {
  it('transforms 1__/__/____ to 1_/__/____', () => {
    const stringMask = createStringMask('11/11/1111')

    expect(stringMask.transformFrom('1__/__/____').value()).to.equal('1_/__/____')
  })
})
