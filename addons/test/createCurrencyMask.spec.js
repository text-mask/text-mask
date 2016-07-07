const createCurrencyMask = (isVerify()) ?
  require('../dist/createCurrencyMask.js').default :
  require('../src/createCurrencyMask.js').default

describe('createCurrencyMask', () => {
  it('can returns a configured currency mask', () => {
    let currencyMask = createCurrencyMask()

    expect(currencyMask).to.be.a('function')
  })

  it('takes a prefix', () => {
    let currencyMask = createCurrencyMask({prefix: '$'})

    expect(currencyMask('12')).to.equal('$11')
  })

  it('takes a suffix', () => {
    let currencyMask = createCurrencyMask({suffix: ' $', prefix: ''})

    expect(currencyMask('12')).to.equal('11 $')
  })

  describe('currencyMask', () => {
    let currencyMask = null

    beforeEach(() => {
      currencyMask = createCurrencyMask()
    })

    it('returns a mask that has the same number of digits as the given number', () => {
      expect(currencyMask('20382')).to.equal('$11,111')
    })

    it('uses the dollar symbol as the default prefix', () => {
      expect(currencyMask('1')).to.equal('$1')
    })

    it('adds no suffix by default', () => {
      expect(currencyMask('1')).to.equal('$1')
    })

    it('returns a mask that appends the currency symbol', () => {
      expect(currencyMask('1')).to.equal('$1')
    })

    it('adds adds a comma after a thousand', () => {
      expect(currencyMask('1000')).to.equal('$1,111')
    })

    it('adds as many commas as needed', () => {
      expect(currencyMask('23984209342084')).to.equal('$11,111,111,111,111')
    })

    it('accepts any string and strips out any non-digit characters', () => {
      expect(currencyMask('h4x0r sp43k')).to.equal('$1,111')
    })
  })
})
