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

  it('can be configured to add a thousands separator or not', () => {
    let currencyMaskWithoutThousandsSeparator = createCurrencyMask({includeThousandsSeparator: false})
    expect(currencyMaskWithoutThousandsSeparator('1000')).to.equal('$1111')

    let currencyMaskWithThousandsSeparator = createCurrencyMask()
    expect(currencyMaskWithThousandsSeparator('1000')).to.equal('$1,111')
  })

  it('can be configured with a custom character for the thousands separator', () => {
    let currencyMask = createCurrencyMask({thousandsSeparatorSymbol: '.'})

    expect(currencyMask('1000')).to.equal('$1.111')
  })

  it('can be configured to accept a fraction and returns the fraction separator with caret traps', () => {
    let currencyMask = createCurrencyMask({allowDecimal: true})

    expect(currencyMask('1000.')).to.equal('$1,111[].[]')
  })

  it('rejects fractions by default', () => {
    let currencyMask = createCurrencyMask()

    expect(currencyMask('1000.')).to.equal('$1,111')
  })

  it('can be configured with a custom character for the fraction separator', () => {
    let currencyMask = createCurrencyMask({
      allowDecimal: true,
      decimalSymbol: ',',
      thousandsSeparatorSymbol: '.'
    })

    expect(currencyMask('1000,')).to.equal('$1.111[],[]')
  })

  it('can limit the length of the fraction', () => {
    let currencyMask = createCurrencyMask({allowDecimal: true, decimalLimit: 2})

    expect(currencyMask('1000.3823')).to.equal('$1,111[].[]11')
  })

  it('can require a fraction', () => {
    let currencyMask = createCurrencyMask({requireFraction: true})

    expect(currencyMask('1000')).to.equal('$1,111[].[]11')
  })

  describe('currencyMask default behavior', () => {
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
