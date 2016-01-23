import countUserCharacters from '../src/countUserCharacters.js'
import chai from 'chai'

const expect = chai.expect

describe('countUserCharacters', () => {
  it('takes two parameters: a string value and a string pattern to compare against', () => {
    const newValue = '11/__/____'
    const pattern = '11/11/1111'
    const count = countUserCharacters(newValue, pattern)

    expect(count).to.equal(2)
  })

  it('counts 3 for value = `11/_1/____` and pattern = `11/11/1111`', () => {
    expect(countUserCharacters('11/_1/____', '11/11/1111')).to.equal(3)
  })
})
