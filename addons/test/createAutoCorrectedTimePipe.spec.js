const createautoCorrectedTimePipe = (isVerify()) ?
  require('../dist/createAutoCorrectedTimePipe.js').default :
  require('../src/createAutoCorrectedTimePipe.js').default

describe('createAutoCorrectedTimePipe', () => {
  let autoCorrectedTimePipe

  it('accepts the time format as the first parameter and returns a date pipe function', () => {
    autoCorrectedTimePipe = createautoCorrectedTimePipe('hh mm ss')
  })

  it('completes the hours if the 1st digit is bigger than 2 and returns `indexesOfPipedChars`', () => {
    expect(autoCorrectedTimePipe('1')).to.deep.equal({value: '1', indexesOfPipedChars: []})
    expect(autoCorrectedTimePipe('2')).to.deep.equal({value: '2', indexesOfPipedChars: []})
    expect(autoCorrectedTimePipe('3')).to.deep.equal({value: '03', indexesOfPipedChars: [0]})
  })

  it('returns false if hours 1st digit is 2 and 2nd digit is bigger than 4', () => {
    expect(autoCorrectedTimePipe('25')).to.equal(false)
  })

  it('completes the minutes if the 1st digit is bigger than 5 and returns `indexesOfPipedChars`', () => {
    expect(autoCorrectedTimePipe('24:5')).to.deep.equal({value: '24:5', indexesOfPipedChars: []})
    expect(autoCorrectedTimePipe('24:6')).to.deep.equal({value: '24:06', indexesOfPipedChars: [3]})
  })

  it('returns false if minutes 1st digit is 6 and 2nd digit is 0', () => {
    expect(autoCorrectedTimePipe('24:60')).to.equal(false)
  })

  it('completes the seconds if the 1st digit is bigger than 5 and returns `indexesOfPipedChars`', () => {
    expect(autoCorrectedTimePipe('24:59:5')).to.deep.equal({value: '24:59:5', indexesOfPipedChars: []})
    expect(autoCorrectedTimePipe('24:59:6')).to.deep.equal({value: '24:59:06', indexesOfPipedChars: [6]})
  })

  it('returns false if seconds 1st digit is 6 and 2nd digit is 0', () => {
    expect(autoCorrectedTimePipe('24:59:60')).to.equal(false)
  })

  it('returns unmodified partial entry if it could develop to correct date', () => {
    expect(autoCorrectedTimePipe('0 :  :  ')).to.deep.equal({value: '0 :  :  ', indexesOfPipedChars: []})
  })
})
