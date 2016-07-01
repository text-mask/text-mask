const createCurrencyMask = (isVerify()) ?
  require('../dist/createCurrencyMask.js').default :
  require('../src/createCurrencyMask.js').default

describe('createCurrencyMask', () => {
  it('can returns a configured currency mask', () => {
    let currencyMask = createCurrencyMask()

    expect(currencyMask).to.be.a('function')
  })

  describe('currencyMask', () => {
    let currencyMask = null

    beforeEach(() => {
      currencyMask = createCurrencyMask()
    })

    it('returns a mask that appends the currency symbol', () => {
      expect(currencyMask('1')).to.equal('$1')
    })

    it.only('adds adds a comma after a thousand', () => {
      expect(currencyMask('1000')).to.equal('$1,111');
    })
  })
})
