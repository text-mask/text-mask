import {processCaretTraps} from '../src/utilities.js'

describe('processCaretTraps', () => {
  it('returns the mask without caret traps and the caret trap indexes', () => {
    expect(processCaretTraps('$1111.[]11')).to.deep.equal({
      maskWithoutCaretTraps: '$1111.11',
      indexes: [6]
    })

    expect(processCaretTraps('$1111[].[]11')).to.deep.equal({
      maskWithoutCaretTraps: '$1111.11',
      indexes: [5, 6]
    })
  })
})
