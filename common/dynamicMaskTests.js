import _ from 'lodash/fp'

// export default _.filter((t) => false, [{
// export default _.filter((t) => t, [{
export default _.filter((t) => t.only, [{
  input: {
    startingInputFieldValue: '$100',
    userModifiedInputFieldValue: '$1000',
    mask: '$1,111',
    caretPositionAfterInputFieldValueChange: 5,
    conformedInputFieldValue: '$1,000',
  },

  output: {
    adjustedCaretPosition: 6,
  },
}, {
  input: {
    startingInputFieldValue: '2 $',
    userModifiedInputFieldValue: '24 $',
    mask: '11 $',
    caretPositionAfterInputFieldValueChange: 2,
    conformedInputFieldValue: '24 $',
  },

  output: {
    adjustedCaretPosition: 2,
  },

  // only: true,
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: 'f',
    mask: '*@*.*',
    caretPositionAfterInputFieldValueChange: 1,
    conformedInputFieldValue: 'f@_._',
    maskWithCaretTraps: '*[]@*.*'
  },

  output: {
    adjustedCaretPosition: 1,
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: 'ff@ssd.com',
    userModifiedInputFieldValue: 'ff@sd.com',
    mask: '**@**.***',
    caretPositionAfterInputFieldValueChange: 3,
    conformedInputFieldValue: 'ff@sd.com',
    maskWithCaretTraps: '**@[]**.***'
  },

  output: {
    adjustedCaretPosition: 3,
  },

  // only: true
}])
