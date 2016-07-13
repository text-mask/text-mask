import _ from 'lodash/fp'

// export default _.filter((t) => false, [{
// export default _.filter((t) => t, [{
export default _.filter((t) => t.only, [{
  line: getLineNumber(),

  input: {
    previousConformedValue: '(650) 394-2911',
    rawValue: '(650) 394-211',
    mask: '(111) 111-1111',
    currentCaretPosition: 11,
  },

  output: {
    // (650) 394-211_
    conformedValue: '(650) 394-2_11',
    adjustedCaretPosition: 11,
  },

  only: true
}, {
  line: getLineNumber(),

  input: {
    previousConformedValue: '(650) 394-2_11',
    rawValue: '(650) 94-2_11',
    mask: '(111) 111-1111',
    currentCaretPosition: 6,
  },

  output: {
    conformedValue: '(650) _94-2_11',
    adjustedCaretPosition: 6,
  },

  // only: true
}, {
  line: getLineNumber(),

  input: {
    previousConformedValue: '(650) 394-2_11',
    rawValue: '(650) 3942_11',
    mask: '(111) 111-1111',
    currentCaretPosition: 9,
  },

  output: {
    conformedValue: '(650) 394-2_11',
    adjustedCaretPosition: 9,
  },

  // only: true
}, {
  line: getLineNumber(),

  input: {
    previousConformedValue: '(650) ___-3___',
    rawValue: '(650) 4___-3___',
    mask: '(111) 111-1111',
    currentCaretPosition: 7,
  },

  output: {
    conformedValue: '(650) 4__-3___',
    adjustedCaretPosition: 7,
  },

  // only: true
}, {
  line: getLineNumber(),

  input: {
    previousConformedValue: '(650) ___-3___',
    rawValue: '(650) __-_-3___',
    mask: '(111) 111-1111',
    currentCaretPosition: 9,
  },

  output: {
    conformedValue: '(650) ___-3___',
    adjustedCaretPosition: 8,
  },

  // only: true
}])


/*
0 1 2 3 4 5 6 7 8 9 10 11 12 13
( 6 5 0 )   3 9 4 - 2  9  1  1

(650) 394-2911
(650) 394-2911
 */
