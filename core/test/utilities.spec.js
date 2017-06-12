import {processCaretTraps} from '../src/utilities'

describe('processCaretTraps', () => {
  it('returns the mask without caret traps and the caret trap indexes', () => {
    const mask = ['$', /\d/, /\d/, /\d/, /\d/, '.', '[]', /\d/, /\d/]
    expect(processCaretTraps(mask)).to.deep.equal({
      maskWithoutCaretTraps: ['$', /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/],
      indexes: [6]
    })

    const mask2 = ['$', /\d/, /\d/, /\d/, /\d/, '[]', '.', '[]', /\d/, /\d/]
    expect(processCaretTraps(mask2)).to.deep.equal({
      maskWithoutCaretTraps: ['$', /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/],
      indexes: [5, 6]
    })
  })
})
