import _ from 'lodash/fp'

// export default _.filter((t) => false, [{
export default _.filter((t) => t, [{
// export default _.filter((t) => t.only, [{
  input: {
    previousConformedValue: '(650) 394-2911',
    rawValue: '(650) 394-211',
    mask: '(111) 111-1111',
    currentCaretPosition: 11,
  },

  output: {
    conformedValue: '(650) 394-2_11',
    adjustedCaretPosition: 11,
  },
}])
