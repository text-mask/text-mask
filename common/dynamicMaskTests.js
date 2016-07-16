import _ from 'lodash/fp'

// export default _.filter((t) => false, [{
export default _.filter((t) => t, [{
// export default _.filter((t) => t.only, [{
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
  input: {
    previousConformedValue: '$200.34',
    rawValue: '$2003.34',
    mask: '$1,111.11',
    currentCaretPosition: 6,
    conformedValue: '$2,003.34',
  },

  output: {
    adjustedCaretPosition: 6,
  },

  // TODO: for now, this works as expected. In the future, I'll want to make it possible to
  // prevent the caret from moving over the dot.
  skips: ['adjustCaretPosition']
}])
