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

  it('completes the minutes if the 1st digit is bigger than 6 and returns `indexesOfPipedChars`', () => {
    expect(autoCorrectedTimePipe('24:6')).to.deep.equal({value: '24:6', indexesOfPipedChars: []})
    expect(autoCorrectedTimePipe('24:7')).to.deep.equal({value: '24:07', indexesOfPipedChars: [3]})
  })

  it('returns false if minute 1st digit is 6 and 2nd digit is bigger than 0', () => {
    expect(autoCorrectedTimePipe('24:61')).to.equal(false)
  })

  it('returns unmodified partial entry if it could develop to correct date', () => {
    expect(autoCorrectedTimePipe('0 :  :  ')).to.deep.equal({value: '0 :  :  ', indexesOfPipedChars: []})
  })
})
