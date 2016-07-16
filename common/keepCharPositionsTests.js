import _ from 'lodash/fp'

// export default _.filter((t) => false, [{
export default _.filter((t) => t, [{
// export default _.filter((t) => t.only, [{
  line: getLineNumber(),

  input: {
    previousConformedValue: '(650) 394-2911',
    rawValue: '(650) 394-211',
    mask: '(111) 111-1111',
    currentCaretPosition: 11,
  },

  output: {
    // (650) 394-211_
    // (650) 394-21_1
    // (650) 394-2_11
    conformedValue: '(650) 394-2_11',
    adjustedCaretPosition: 11,
  },

  // only: true
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
    previousConformedValue: '(650) 394-2_11',
    rawValue: '(650) 3-2_11',
    mask: '(111) 111-1111',
    currentCaretPosition: 7,
  },

  output: {
    // (650) 32_-11__
    conformedValue: '(650) 3__-2_11',
    adjustedCaretPosition: 7,
  },

  // only: true
}, {
  line: getLineNumber(),

  input: {
    previousConformedValue: '(650) 394-2_11',
    rawValue: '(65-2_11',
    mask: '(111) 111-1111',
    currentCaretPosition: 3,
  },

  output: {
    // (652) _11-____
    // 6_____2_11
    conformedValue: '(65_) ___-2_11',
    adjustedCaretPosition: 3,
  },

  // only: true

  // ##########################
  // Addition operation
  // ##########################

}, {
  line: getLineNumber(),

  input: {
    previousConformedValue: '(650) ___-3___',
    rawValue: '(650) 4___-3___',
    mask: '(111) 111-1111',
    currentCaretPosition: 7,
  },

  output: {
    // (650) 4__-_3__
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
    // (650) ___-3___
    conformedValue: '(650) ___-3___',
    adjustedCaretPosition: 8,
  },

  // only: true
}, {
  line: getLineNumber(),

  input: {
    previousConformedValue: '(650) ___-3___',
    rawValue: '(650) __-23_-3___',
    mask: '(111) 111-1111',
    currentCaretPosition: 11,
  },

  output: {
    // (650) _2-3_3_
    conformedValue: '(650) __2-3___',
    adjustedCaretPosition: 11,
  },

  // only: true
}, {
  line: getLineNumber(),

  input: {
    previousConformedValue: '(902) 394-8__3',
    rawValue: '(902) 394-38__3',
    mask: '(111) 111-1111',
    currentCaretPosition: 11,
  },

  output: {
    // (902) 394-38__
    conformedValue: '(902) 394-8__3',
    adjustedCaretPosition: 11,
  },

  // only: true
}, {
  line: getLineNumber(),

  input: {
    previousConformedValue: '(830) 203-___3',
    rawValue: '(830) 203dkla8xxx-___3',
    mask: '(111) 111-1111',
    currentCaretPosition: 17,
  },

  output: {
    conformedValue: '(830) 203-8__3',
    adjustedCaretPosition: 11,
  },

  // only: true
}, {
  line: getLineNumber(),

  input: {
    previousConformedValue: '(830) 203-___3',
    rawValue: '(830) 2038-___3',
    mask: '(111) 111-1111',
    currentCaretPosition: 10,
  },

  output: {
    conformedValue: '(830) 203-8__3',
    adjustedCaretPosition: 11,
  },

  // only: true
}, {
  // ##########################
  // Blocker character
  // ##########################
  line: getLineNumber(),

  input: {
    previousConformedValue: '(830) 203-4__3',
    rawValue: '(830) 2038-4__3',
    mask: '(111) 111-1111',
    currentCaretPosition: 10,
  },

  output: {
    conformedValue: '(830) 203-4__3',
    adjustedCaretPosition: 11,
  },

  // only: true
}])
