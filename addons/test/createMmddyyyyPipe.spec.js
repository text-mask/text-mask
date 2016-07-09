const createMmddyyyyPipe = (isVerify()) ?
  require('../dist/createMmddyyyyPipe.js').default :
  require('../src/createMmddyyyyPipe.js').default

describe.only('createMmddyyyyPipe', () => {
  describe('Basic functionality', () => {
    let mmddyyyyPipe

    beforeEach(() => {
      mmddyyyyPipe = createMmddyyyyPipe()
    })

    it('completes the month if the first character is bigger than 1', () => {
      expect(mmddyyyyPipe('1')).to.equal('1')
      expect(mmddyyyyPipe('2')).to.equal('02')
    })
  })



  // let configuredMmddyyyyPipe = null
  //
  // it('needs to be configured with max and min dates', () => {
  //   configuredMmddyyyyPipe = createMmddyyyyPipe({
  //     maximumDate: '08/31/2016', minimumYear: '01/01/1900'
  //   })
  // })
  //
  // it('takes conformed user input', () => {
  //   expect(() => {
  //     configuredMmddyyyyPipe('12093')
  //   }).to.not.throw()
  // })
  //
  // it('returns a boolean', () => {
  //   expect(configuredMmddyyyyPipe('12093')).to.be.a('boolean')
  // })
  //
  // it('validates that the string is a valid date of format mm/dd/yyyy', () => {
  //   expect(configuredMmddyyyyPipe('11/11/2001')).to.equal(true)
  //   expect(configuredMmddyyyyPipe('11/99/2001')).to.equal(false)
  // })
  //
  // it('does not support sparse filling', () => {
  //   expect(configuredMmddyyyyPipe('02/_2/2001')).to.equal(false)
  // })
  //
  // it('accepts config for max date and min date', () => {
  //   expect(createMmddyyyyPipe({maximumDate: '12/31/2000'})('02/01/2200')).to.equal(false)
  //   expect(createMmddyyyyPipe({maximumDate: '12/31/2200'})('02/01/2200')).to.equal(true)
  //
  //   expect(createMmddyyyyPipe({minimumDate: '12/31/2199'})('02/01/2198')).to.equal(false)
  // })
  //
  // it('does not allow a month that starts > 1', () => {
  //   expect(configuredMmddyyyyPipe('2')).to.equal(false)
  //   expect(configuredMmddyyyyPipe('1')).to.equal(true)
  // })
  //
  // it('does not allow a month that is < 1', () => {
  //   expect(configuredMmddyyyyPipe('0')).to.equal(true)
  //   expect(configuredMmddyyyyPipe('00')).to.equal(false)
  //   expect(configuredMmddyyyyPipe('01')).to.equal(true)
  // })
  //
  // it('does not allow a day that is bigger than 31', () => {
  //   expect(configuredMmddyyyyPipe('01/32')).to.equal(false)
  //   expect(configuredMmddyyyyPipe('01/31')).to.equal(true)
  // })
  //
  // it('does not allow a day that is smaller than 1', () => {
  //   expect(configuredMmddyyyyPipe('01/0')).to.equal(true)
  //   expect(configuredMmddyyyyPipe('01/00')).to.equal(false)
  // })
  //
  // it('knows tha maximum possible number of days in each month', () => {
  //   expect(configuredMmddyyyyPipe('02/3')).to.equal(false)
  //   expect(configuredMmddyyyyPipe('02/30')).to.equal(false)
  //   expect(configuredMmddyyyyPipe('02/29')).to.equal(true)
  // })
  //
  // it('validates every digit of the year against given max and min', () => {
  //   const maxMinYears = {maximumDate: '12/31/2016', minimumDate: '01/01/1990'}
  //
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/3')).to.equal(false)
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/2')).to.equal(true)
  //
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/21')).to.equal(false)
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/20')).to.equal(true)
  //
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/1')).to.equal(true)
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/18')).to.equal(false)
  //
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/201')).to.equal(true)
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/202')).to.equal(false)
  //
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/199')).to.equal(true)
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/198')).to.equal(false)
  //
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/2016')).to.equal(true)
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/2017')).to.equal(false)
  //
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/1990')).to.equal(true)
  //   expect(createMmddyyyyPipe(maxMinYears)('02/24/1989')).to.equal(false)
  // })
  //
  // it('only accepts leap year if given month is February and day is 29', () => {
  //   expect(configuredMmddyyyyPipe('02/29/2016')).to.equal(true)
  //   expect(configuredMmddyyyyPipe('02/29/2015')).to.equal(false)
  // })
  //
  // it('confirms that the date is bigger than the minimum date and smaller than the ' +
  //   'maximum date when user enters the last character', () => {
  //   const maxMinYears = {minimumDate: '02/01/1990'}
  //
  //   expect(createMmddyyyyPipe(maxMinYears)('01/24/199')).to.equal(true)
  //   expect(createMmddyyyyPipe(maxMinYears)('01/24/1990')).to.equal(false)
  // })
})
