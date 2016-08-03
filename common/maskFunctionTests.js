import _ from 'lodash/fp'

// export default _.filter((t) => false, [{
// export default _.filter((t) => t, [{
export default _.filter((t) => t.only, [{
  input: {
    previousConformedValue: '$100',
    rawValue: '$1000',
    mask: '$1,111',
    currentCaretPosition: 5,
    conformedValue: '$1,000',
  },

  output: {
    adjustedCaretPosition: 6,
  },
}, {
  input: {
    previousConformedValue: '2 $',
    rawValue: '24 $',
    mask: '11 $',
    currentCaretPosition: 2,
    conformedValue: '24 $',
  },

  output: {
    adjustedCaretPosition: 2,
  },

  // only: true,
}, {
  line: getLineNumber(),

  input: {
    // placeholder ___@____
    mask: '***@****',
    previousConformedValue: 'asdf@asdf',
    rawValue: 'asf@asdf',
    currentCaretPosition: 2,
    conformedValue: 'asf@asdf',
  },

  output: {
    adjustedCaretPosition: 2
  },

  // only: true
}, {
  line: getLineNumber(),

  input: {
    // placeholder ___@____
    mask: '***@ .***',
    previousConformedValue: 'asd@asdf.com',
    rawValue: 'asd@.com',
    currentCaretPosition: 4,
    conformedValue: 'asd@ .com',
  },

  output: {
    adjustedCaretPosition: 4
  },

  only: true,

  skips: ['adjustCaretPosition']
}])