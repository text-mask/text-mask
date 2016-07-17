const assistedMmddyyyyPipe = (isVerify()) ?
  require('../dist/assistedMmddyyyyPipe.js').default :
  require('../src/assistedMmddyyyyPipe.js').default

describe('assistedMmddyyyyPipe', () => {
  it('completes the month if the 1st digit is bigger than 1 and returns `indexesOfPipedChars`', () => {
    expect(assistedMmddyyyyPipe('1')).to.deep.equal({value: '1', indexesOfPipedChars: []})
    expect(assistedMmddyyyyPipe('2')).to.deep.equal({value: '02', indexesOfPipedChars: [0]})
  })

  it('returns false if month 1st digit is 1 and 2nd digit is bigger than 2', () => {
    expect(assistedMmddyyyyPipe('14')).to.equal(false)
  })

  it('returns false if month 1st digit is 0 and 2nd digit is also 0', () => {
    expect(assistedMmddyyyyPipe('00')).to.equal(false)
  })

  it('completes the day if the 1st digit is bigger than 3 and returns `indexesOfPipedChars`', () => {
    expect(assistedMmddyyyyPipe('12/3')).to.deep.equal({value: '12/3', indexesOfPipedChars: []})
    expect(assistedMmddyyyyPipe('12/4')).to.deep.equal({value: '12/04', indexesOfPipedChars: [3]})
  })

  it('returns false if day 1st digit is 3 and 2nd digit is bigger than 1', () => {
    expect(assistedMmddyyyyPipe('12/32')).to.equal(false)
  })

  it('returns false if day 1st digit is 0 and 2nd digit is also 0', () => {
    expect(assistedMmddyyyyPipe('12/00')).to.equal(false)
  })

  it('completes the year to `200` if the 1st digit is 0', () => {
    expect(assistedMmddyyyyPipe('12/31/0')).to.deep.equal({value: '12/31/200', indexesOfPipedChars: [6, 7]})
  })
})
