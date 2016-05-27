import _ from 'lodash/fp'
import {convertMaskToPlaceholder} from '../core/src/utilities.js'

export default _.filter((t) => t, [{
// export default _.filter((t) => false, [{
// export default _.filter((t) => t.only, [{
  input: {
    startingInputFieldValue: '(___)',
    userModifiedInputFieldValue: '(3___)',
    mask: '(111)',
    caretPositionAfterInputFieldValueChange: 2,
  },

  output: {
    conformedInputFieldValue: '(3__)',
    adjustedCaretPosition: 2,
    indexOfLastAddedCharacter: 1
  },

}, {
  input: {
    startingInputFieldValue: '___',
    userModifiedInputFieldValue: '1___',
    mask: '111',
    caretPositionAfterInputFieldValueChange: 1,
  },

  output: {
    conformedInputFieldValue: '1__',
    adjustedCaretPosition: 1,
    indexOfLastAddedCharacter: 0
  },
}, {
  input: {
    startingInputFieldValue: '(12_) _',
    userModifiedInputFieldValue: '(12f_) _',
    mask: '(111) 1',
    caretPositionAfterInputFieldValueChange: 4,
  },

  output: {
    conformedInputFieldValue: '(12_) _',
    adjustedCaretPosition: 3
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '(___) ___-____',
    userModifiedInputFieldValue: '(1___) ___-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 2,
  },

  output: {
    conformedInputFieldValue: '(1__) ___-____',
    adjustedCaretPosition: 2
  },

}, {
  input: {
    startingInputFieldValue: '(1__) ___-3___',
    userModifiedInputFieldValue: '(1__) ___-___',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 10,
  },

  output: {
    conformedInputFieldValue: '(1__) ___-____',
    adjustedCaretPosition: 9
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '(1__) ___-3___',
    userModifiedInputFieldValue: '(12__) ___-3___',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 3,
  },

  output: {
    conformedInputFieldValue: '(12_) ___-_3__',
    adjustedCaretPosition: 3,
    indexOfLastAddedCharacter: 11
  },

}, {
  input: {
    startingInputFieldValue: '(333) ___-____',
    userModifiedInputFieldValue: '(3333) ___-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 2,
  },

  output: {
    conformedInputFieldValue: '(333) 3__-____',
    adjustedCaretPosition: 2,
    indexOfLastAddedCharacter: 6
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '(123) 948-____',
    userModifiedInputFieldValue: '(123) 94-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 8,
  },

  output: {
    conformedInputFieldValue: '(123) 94_-____',
    adjustedCaretPosition: 8,
    indexOfFirstRemovedCharacter: 8
  },

}, {
  input: {
    startingInputFieldValue: '(__4) 444-____',
    userModifiedInputFieldValue: '(__4) 44-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 7,
  },

  output: {
    conformedInputFieldValue: '(__4) 44_-____',
    adjustedCaretPosition: 7,
    indexOfFirstRemovedCharacter: 8
  },

}, {
  // TODO: fix this test case. It currently results in 10!!!
  // perhaps pass caretPositionAfterInputFieldValueChange to getDiffIndex
  input: {
    startingInputFieldValue: '(__4) 44_-____',
    userModifiedInputFieldValue: '(__4) 444_-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 8,
  },

  output: {
    conformedInputFieldValue: '(__4) 444-____',
    adjustedCaretPosition: 8,
    indexOfLastAddedCharacter: 8
  },
}, {
  input: {
    startingInputFieldValue: '(__4) 444-____',
    userModifiedInputFieldValue: '(__4) 444-___',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 10,
  },

  output: {
    conformedInputFieldValue: '(__4) 444-____',
    adjustedCaretPosition: 10,
  },
}, {
  input: {
    startingInputFieldValue: '(__4) 444-____',
    userModifiedInputFieldValue: '(__4) 444____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 9,
  },

  output: {
    conformedInputFieldValue: '(__4) 444-____',
    adjustedCaretPosition: 9
  },

  // only: true,
}, {
  input: {
    startingInputFieldValue: '(__4) 444-____',
    userModifiedInputFieldValue: '(__4) 44-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 8,
  },

  output: {
    conformedInputFieldValue: '(__4) 44_-____',
    adjustedCaretPosition: 8,
    indexOfFirstRemovedCharacter: 8
  },
  // only: true,
}, {
  input: {
    startingInputFieldValue: '(505) ___-____',
    userModifiedInputFieldValue: '(505 ___-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 4,
  },

  output: {
    conformedInputFieldValue: '(505) ___-____',
    adjustedCaretPosition: 4,
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '(505) ___-____',
    userModifiedInputFieldValue: '(505) __-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 6,
  },

  output: {
    conformedInputFieldValue: '(505) ___-____',
    adjustedCaretPosition: 6
  }
}, {
  input: {
    startingInputFieldValue: '(333) 333-3___',
    userModifiedInputFieldValue: '(33) 333-3___',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 3,
  },

  output: {
    conformedInputFieldValue: '(333) 333-____',
    adjustedCaretPosition: 3,
    indexOfFirstRemovedCharacter: 10
  }
}, {
  input: {
    startingInputFieldValue: '(___) ___-____',
    userModifiedInputFieldValue: '5(___) ___-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 1,
  },

  output: {
    conformedInputFieldValue: '(5__) ___-____',
    adjustedCaretPosition: 2,
    indexOfLastAddedCharacter: 1
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '(000) ___-____',
    userModifiedInputFieldValue: '(00) ___-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 2,
  },

  output: {
    conformedInputFieldValue: '(00_) ___-____',
    adjustedCaretPosition: 2,
    indexOfFirstRemovedCharacter: 3
  }
}, {
  input: {
    startingInputFieldValue: '44/__',
    userModifiedInputFieldValue: '4/__',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 1,
  },

  output: {
    conformedInputFieldValue: '4_/__',
    adjustedCaretPosition: 1,
    indexOfFirstRemovedCharacter: 1
  }
}, {
  input: {
    mask: '(111) 1',
    startingInputFieldValue: '(124) 3',
    userModifiedInputFieldValue: '(124) ',
    caretPositionAfterInputFieldValueChange: 6,
  },

  output: {
    conformedInputFieldValue: '(124) _',
    adjustedCaretPosition: 4,
    indexOfFirstRemovedCharacter: 6
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '(449) _',
    userModifiedInputFieldValue: '(4495) _',
    mask: '(111) 1',
    caretPositionAfterInputFieldValueChange: 5,
  },

  output: {
    conformedInputFieldValue: '(449) 5',
    adjustedCaretPosition: 7,
    indexOfLastAddedCharacter: 6
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '(___) ___-____',
    userModifiedInputFieldValue: '(__4_) ___-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 4,
  },

  output: {
    conformedInputFieldValue: '(__4) ___-____',
    adjustedCaretPosition: 6,
    indexOfLastAddedCharacter: 3
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '1__',
    userModifiedInputFieldValue: '11__',
    mask: '111',
    caretPositionAfterInputFieldValueChange: 2,
  },

  output: {
    conformedInputFieldValue: '11_',
    adjustedCaretPosition: 2,
    indexOfLastAddedCharacter: 1
  }

  //only: true
}, {
  input: {
    startingInputFieldValue: '11_',
    userModifiedInputFieldValue: '111_',
    mask: '111',
    caretPositionAfterInputFieldValueChange: 3,
  },

  output: {
    conformedInputFieldValue: '111',
    adjustedCaretPosition: 3,
    indexOfLastAddedCharacter: 2
  }
}, {
  input: {
    startingInputFieldValue: '(___)',
    userModifiedInputFieldValue: '(3___)',
    mask: '(111)',
    caretPositionAfterInputFieldValueChange: 2
  },

  output: {
    conformedInputFieldValue: '(3__)',
    adjustedCaretPosition: 2,
    indexOfLastAddedCharacter: 1
  },

  //only: true
}, {
  input: {
    startingInputFieldValue: '___',
    userModifiedInputFieldValue: '1___',
    mask: '111',
    caretPositionAfterInputFieldValueChange: 1,
  },

  output: {
    conformedInputFieldValue: '1__',
    adjustedCaretPosition: 1,
    indexOfLastAddedCharacter: 0
  }
}, {
  input: {
    startingInputFieldValue: '1__',
    userModifiedInputFieldValue: '11__',
    mask: '111',
    caretPositionAfterInputFieldValueChange: 2,
  },

  output: {
    conformedInputFieldValue: '11_',
    adjustedCaretPosition: 2,
    indexOfLastAddedCharacter: 1,
  }

  //only: true
}, {
  input: {
    startingInputFieldValue: '(12_) 7',
    userModifiedInputFieldValue: '(132_) 7',
    mask: '(111) 1',
    caretPositionAfterInputFieldValueChange: 3,
  },

  output: {
    conformedInputFieldValue: '(132) _',
    adjustedCaretPosition: 3,
    indexOfLastAddedCharacter: 6,
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '(___) ___/____',
    userModifiedInputFieldValue: '5(___) ___/____',
    mask: '(111) 111/1111',
    caretPositionAfterInputFieldValueChange: 1,
  },

  output: {
    conformedInputFieldValue: '(5__) ___/____',
    adjustedCaretPosition: 2,
    indexOfLastAddedCharacter: 1,
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '3333',
    userModifiedInputFieldValue: '2938',
    mask: '1111',
    caretPositionAfterInputFieldValueChange: 4,
  },

  output: {
    conformedInputFieldValue: '2938',
    adjustedCaretPosition: 4,
    indexOfLastAddedCharacter: 3,
  }

  //only: true
}, {
  input: {
    startingInputFieldValue: '(132) 7',
    userModifiedInputFieldValue: '(12) 7',
    mask: '(111) 1',
    caretPositionAfterInputFieldValueChange: 2,
  },

  output: {
    conformedInputFieldValue: '(127) _',
    adjustedCaretPosition: 2,
    indexOfFirstRemovedCharacter: 2
  },
}, {
  input: {
    startingInputFieldValue: '__/__/____',
    userModifiedInputFieldValue: '1__/__/____',
    mask: '11/11/1111',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '1_/__/____',
    adjustedCaretPosition: 1,
    indexOfLastAddedCharacter: 0
  },
}, {
  input: {
    startingInputFieldValue: '1_/__/____',
    userModifiedInputFieldValue: '11_/__/____',
    mask: '11/11/1111',
    caretPositionAfterInputFieldValueChange: 2
  },

  output: {
    conformedInputFieldValue: '11/__/____',
    adjustedCaretPosition: 3,
    indexOfLastAddedCharacter: 1
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '1111',
    mask: '11/11/1111',
    caretPositionAfterInputFieldValueChange: 4
  },

  output: {
    conformedInputFieldValue: '11/11/____',
    adjustedCaretPosition: 6,
  },

}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '23840957',
    mask: '11/11/1111',
    caretPositionAfterInputFieldValueChange: 8
  },

  output: {
    conformedInputFieldValue: '23/84/0957',
    adjustedCaretPosition: 10,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '2384095',
    mask: '11/11/1111',
    caretPositionAfterInputFieldValueChange: 7
  },

  output: {
    conformedInputFieldValue: '23/84/095_',
    adjustedCaretPosition: 9,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '2',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '2_/__',
    adjustedCaretPosition: 1,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '777',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 3
  },

  output: {
    conformedInputFieldValue: '(777) ___-____',
    adjustedCaretPosition: 6,
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '7771',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 4
  },

  output: {
    conformedInputFieldValue: '(777) 1__-____',
    adjustedCaretPosition: 7,
  },
}, {
  input: {
    startingInputFieldValue: '1_/__/____',
    userModifiedInputFieldValue: '1_/__/___1_',
    mask: '11/11/1111',
    caretPositionAfterInputFieldValueChange: 10
  },

  output: {
    conformedInputFieldValue: '1_/__/___1',
    adjustedCaretPosition: 10,
    indexOfLastAddedCharacter: 9
  },

  //only: true
}, {
  input: {
    startingInputFieldValue: '1_/1_/____',
    userModifiedInputFieldValue: '1_/1__/___1',
    mask: '11/11/1111',
    caretPositionAfterInputFieldValueChange: 11
  },

  output: {
    conformedInputFieldValue: '1_/1_/____',
    adjustedCaretPosition: 10,
  },

  //only: true
}, {
  input: {
    startingInputFieldValue: '(1__) ___-____',
    userModifiedInputFieldValue: '(d1__) ___-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 2
  },

  output: {
    conformedInputFieldValue: '(1__) ___-____',
    adjustedCaretPosition: 1,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '12/32',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 5
  },

  output: {
    conformedInputFieldValue: '12/32',
    adjustedCaretPosition: 5,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '__/32',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 5
  },

  output: {
    conformedInputFieldValue: '__/32',
    adjustedCaretPosition: 5,
  },

  skips: [
    'adjustCaretPosition' // won't fix
  ]
}, {
  input: {
    startingInputFieldValue: '__/__/____',
    userModifiedInputFieldValue: '1__/__/____',
    mask: '11/11/1111',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '1_/__/____',
    adjustedCaretPosition: 1,
    indexOfLastAddedCharacter: 0
  },
}, {
  input: {
    startingInputFieldValue: '22/2_',
    userModifiedInputFieldValue: '2/2_',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '22/__',
    adjustedCaretPosition: 1,
    indexOfFirstRemovedCharacter: 3
  },
}, {
  input: {
    startingInputFieldValue: '(222) 2__-____',
    userModifiedInputFieldValue: '(22) 2__-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '(222) ___-____',
    adjustedCaretPosition: 1,
    indexOfFirstRemovedCharacter: 6
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '__/2_',
    userModifiedInputFieldValue: '_2_/2_',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 2
  },

  output: {
    conformedInputFieldValue: '_2/_2',
    adjustedCaretPosition: 3,
    indexOfLastAddedCharacter: 4
  },
}, {
  input: {
    startingInputFieldValue: '__/2_',
    userModifiedInputFieldValue: '_/2_',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 0
  },

  output: {
    conformedInputFieldValue: '_2/__',
    adjustedCaretPosition: 0,
    indexOfFirstRemovedCharacter: 1
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '1',
    mask: '(',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '(',
    adjustedCaretPosition: 0,
  },

  skips: [
    // React component sets the conformed string to empty string, "" when result matches placeholder by design
    'integrations:react',
    'adjustCaretPosition'
  ]
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '2',
    mask: '1',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '2',
    adjustedCaretPosition: 1,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '__/22',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 5
  },

  output: {
    conformedInputFieldValue: '__/22',
    adjustedCaretPosition: 5,
  },

  skips: [
    'adjustCaretPosition' // won't fix
  ]
}, {
  input: {
    startingInputFieldValue: '__/22',
    userModifiedInputFieldValue: '2__/22',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '2_/_2',
    adjustedCaretPosition: 1,
    indexOfLastAddedCharacter: 3
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '22',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 2
  },

  output: {
    conformedInputFieldValue: '22/__',
    adjustedCaretPosition: 3,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '222',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 3
  },

  output: {
    conformedInputFieldValue: '22/2_',
    adjustedCaretPosition: 4,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '777777',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 6
  },

  output: {
    conformedInputFieldValue: '77/77',
    adjustedCaretPosition: 5,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '222/1',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 5
  },

  output: {
    conformedInputFieldValue: '22/21',
    adjustedCaretPosition: 5,
  },
}, {
  input: {
    startingInputFieldValue: '__/__',
    userModifiedInputFieldValue: '__5/__',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 3
  },

  output: {
    conformedInputFieldValue: '__/5_',
    adjustedCaretPosition: 4,
    indexOfLastAddedCharacter: 3
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '8_/4_5/222_1',
    mask: '11/11/1111',
    caretPositionAfterInputFieldValueChange: 12
  },

  output: {
    conformedInputFieldValue: '8_/4_/5222',
    adjustedCaretPosition: 10,
  },

  skips: [
    'adjustCaretPosition' // won't fix
  ]
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '8293847/4_2/222_1',
    mask: '11/11/1111',
    caretPositionAfterInputFieldValueChange: 17
  },

  output: {
    conformedInputFieldValue: '82/93/8474',
    adjustedCaretPosition: 10,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '0/22',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 4
  },

  output: {
    conformedInputFieldValue: '02/2_',
    adjustedCaretPosition: 4,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '/22',
    mask: '11/11',
    caretPositionAfterInputFieldValueChange: 3
  },

  output: {
    conformedInputFieldValue: '22/__',
    adjustedCaretPosition: 3,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '22/3/995',
    mask: '11/11/1111',
    caretPositionAfterInputFieldValueChange: 8
  },

  output: {
    conformedInputFieldValue: '22/39/95__',
    adjustedCaretPosition: 8,
  },
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '2d',
    mask: '11',
    caretPositionAfterInputFieldValueChange: 2
  },

  output: {
    conformedInputFieldValue: '2_',
    adjustedCaretPosition: 1,
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '(123) 3',
    mask: '(111) 1',
    caretPositionAfterInputFieldValueChange: 7
  },

  output: {
    conformedInputFieldValue: '(123) 3',
    adjustedCaretPosition: 7,
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '(123) 3',
    mask: 'A1A A1A',
    caretPositionAfterInputFieldValueChange: 7
  },

  output: {
    conformedInputFieldValue: '___ ___',
    adjustedCaretPosition: 0,
  },

  // only: true
}, {
  input: {
    startingInputFieldValue: '',
    userModifiedInputFieldValue: 'M',
    mask: 'A1A A1A',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: 'M__ ___',
    adjustedCaretPosition: 1,
  },
}, {
  input: {
    startingInputFieldValue: 'M__ ___',
    userModifiedInputFieldValue: 'M2__ ___',
    mask: 'A1A A1A',
    caretPositionAfterInputFieldValueChange: 2
  },

  output: {
    conformedInputFieldValue: 'M2_ ___',
    adjustedCaretPosition: 2,
  },
}, {
  input: {
    startingInputFieldValue: 'M__ ___',
    userModifiedInputFieldValue: 'M2j_ ___',
    mask: 'A1A A1A',
    caretPositionAfterInputFieldValueChange: 3
  },

  output: {
    conformedInputFieldValue: 'M2j ___',
    adjustedCaretPosition: 4,
  },
}, {
  input: {
    startingInputFieldValue: 'M2j ___',
    userModifiedInputFieldValue: 'M2j __2_',
    mask: 'A1A A1A',
    caretPositionAfterInputFieldValueChange: 7
  },

  output: {
    conformedInputFieldValue: 'M2j ___',
    adjustedCaretPosition: 6,
  },
}, {
  input: {
    startingInputFieldValue: 'M2j ___',
    userModifiedInputFieldValue: 'M2j __R_',
    mask: 'A1A A1A',
    caretPositionAfterInputFieldValueChange: 7
  },

  output: {
    conformedInputFieldValue: 'M2j __R',
    adjustedCaretPosition: 7,
  },
}, {
  input: {
    startingInputFieldValue: 'M__ ___',
    userModifiedInputFieldValue: 'M2j_ ___',
    mask: 'U1U U1U',
    caretPositionAfterInputFieldValueChange: 3
  },

  output: {
    conformedInputFieldValue: 'M2J ___',
    adjustedCaretPosition: 4,
  },
}, {
  input: {
    mask: '(111)',
    startingInputFieldValue: '(1__)',
    userModifiedInputFieldValue: '(21__)',
    caretPositionAfterInputFieldValueChange: 2
  },

  output: {
    conformedInputFieldValue: '(21_)',
    adjustedCaretPosition: 2,
  },

  // only: true
}, {
  input: {
    mask: '(111) 111',
    startingInputFieldValue: '(323) ___',
    userModifiedInputFieldValue: '(3243) ___',
    caretPositionAfterInputFieldValueChange: 4
  },

  output: {
    conformedInputFieldValue: '(324) 3__',
    adjustedCaretPosition: 6,
  },

  // only: true
}, {
  input: {
    mask: '(111)',
    startingInputFieldValue: '(1__)',
    userModifiedInputFieldValue: '(21__)',
    caretPositionAfterInputFieldValueChange: 2
  },

  output: {
    conformedInputFieldValue: '(21_)',
    adjustedCaretPosition: 2,
  },

  // only: true
}, {
  input: {
    mask: '(111)',
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '1',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '(1__)',
    adjustedCaretPosition: 2,
  },

  // only: true
}, {
  input: {
    mask: '(111) 111-1111',
    startingInputFieldValue: '(290) 382-3039',
    userModifiedInputFieldValue: '(290) 38-3039',
    caretPositionAfterInputFieldValueChange: 8
  },

  output: {
    conformedInputFieldValue: '(290) 383-039_',
    adjustedCaretPosition: 8
  },
}, {
  input: {
    mask: '(111) 111-1111',
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '(',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '(___) ___-____',
    adjustedCaretPosition: 1
  },

  // only: true
}, {
  input: {
    mask: '(111) 111-1111',
    startingInputFieldValue: '(395) 834-____',
    userModifiedInputFieldValue: '(395) 34-____',
    caretPositionAfterInputFieldValueChange: 6
  },

  output: {
    conformedInputFieldValue: '(395) 34_-____',
    adjustedCaretPosition: 4
  },

  // only: true
}, {
  input: {
    mask: '(111) 111-1111',
    startingInputFieldValue: '(1__) ___-____',
    userModifiedInputFieldValue: '(__) ___-____',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '(___) ___-____',
    adjustedCaretPosition: 0
  },

  // only: true
}, {
  input: {
    mask: 'U1U 1U1',
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '5',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '___ ___',
    adjustedCaretPosition: 0
  },

  // only: true
}, {
  input: {
    mask: '00 (111)',
    startingInputFieldValue: '00 (___)',
    userModifiedInputFieldValue: '00 (1___)',
    caretPositionAfterInputFieldValueChange: 5
  },

  output: {
    conformedInputFieldValue: '00 (1__)',
    adjustedCaretPosition: 5
  },

  // only: true
}, {
  input: {
    mask: '1111',
    startingInputFieldValue: '3333',
    userModifiedInputFieldValue: '2',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '2___',
    adjustedCaretPosition: 1
  },

  // only: true
}, {
  input: {
    mask: '//1111',
    startingInputFieldValue: '//3333',
    userModifiedInputFieldValue: '2',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '//2___',
    adjustedCaretPosition: 3
  },
}, {
  input: {
    mask: '1111',
    startingInputFieldValue: '3333',
    userModifiedInputFieldValue: '23',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '23__',
    adjustedCaretPosition: 1
  },

  // only: true
}])

//####################################################################################
//####################################################################################
//####################################################################################
//####################################################################################

export const noGuideMode = _.filter((t) => t, [{
// export const noGuideMode = _.filter((t) => false, [{
// export const noGuideMode = _.filter((t) => t.only, [{
  input: {
    mask: '(111)',
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '(',
    caretPositionAfterInputFieldValueChange: 1,
  },

  output: {
    conformedInputFieldValue: '(',
    adjustedCaretPosition: 1
  },

  // only: true
}, {
  input: {
    mask: '(111)',
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '2',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '(2',
    adjustedCaretPosition: 2
  },

  // only: true
}, {
  input: {
    mask: '(111)',
    startingInputFieldValue: '(2',
    userModifiedInputFieldValue: '(23',
    caretPositionAfterInputFieldValueChange: 3
  },

  output: {
    conformedInputFieldValue: '(23',
    adjustedCaretPosition: 3
  },

  // only: true
}, {
  input: {
    mask: '(111)',
    startingInputFieldValue: '(2',
    userModifiedInputFieldValue: '(32',
    caretPositionAfterInputFieldValueChange: 2
  },

  output: {
    conformedInputFieldValue: '(32',
    adjustedCaretPosition: 2
  },

  // only: true
}, {
  input: {
    mask: '(111) 1',
    startingInputFieldValue: '(234)',
    userModifiedInputFieldValue: '(234)5',
    caretPositionAfterInputFieldValueChange: 6
  },

  output: {
    conformedInputFieldValue: '(234) 5',
    adjustedCaretPosition: 7
  },

  // only: true
}, {
  input: {
    mask: '(111)',
    startingInputFieldValue: '(',
    userModifiedInputFieldValue: '(1',
    caretPositionAfterInputFieldValueChange: 2
  },

  output: {
    conformedInputFieldValue: '(1',
    adjustedCaretPosition: 2
  },

  // only: true
}, {
  input: {
    mask: '(111)',
    startingInputFieldValue: '(23',
    userModifiedInputFieldValue: '(423',
    caretPositionAfterInputFieldValueChange: 2
  },

  output: {
    conformedInputFieldValue: '(423)',
    adjustedCaretPosition: 2
  },

}, {
  input: {
    mask: '(111) 11',
    startingInputFieldValue: '(12',
    userModifiedInputFieldValue: '(123',
    caretPositionAfterInputFieldValueChange: 4
  },

  output: {
    conformedInputFieldValue: '(123) ',
    adjustedCaretPosition: 6
  },
}, {
  input: {
    mask: '(111) 11',
    startingInputFieldValue: '(123) ',
    userModifiedInputFieldValue: '(123)',
    caretPositionAfterInputFieldValueChange: 5
  },

  output: {
    conformedInputFieldValue: '(123',
    adjustedCaretPosition: 4
  },
}, {
  input: {
    mask: '(111) 11',
    startingInputFieldValue: '(987) 6_',
    userModifiedInputFieldValue: '(9875) 6_',
    caretPositionAfterInputFieldValueChange: 5
  },

  output: {
    conformedInputFieldValue: '(987) 56',
    adjustedCaretPosition: 7
  },

  // only: true
}, {
  input: {
    mask: '(111) 111-1111',
    startingInputFieldValue: '(987) 656-4938',
    userModifiedInputFieldValue: '(987) 6565-4938',
    caretPositionAfterInputFieldValueChange: 10
  },

  output: {
    conformedInputFieldValue: '(987) 656-5493',
    adjustedCaretPosition: 11
  },
}, {
  input: {
    mask: '(111) 111-1111',
    startingInputFieldValue: '(',
    userModifiedInputFieldValue: '',
    caretPositionAfterInputFieldValueChange: 0
  },

  output: {
    conformedInputFieldValue: '',
    adjustedCaretPosition: 0
  },
}, {
  input: {
    mask: '(111) 111-1111',
    startingInputFieldValue: '(1',
    userModifiedInputFieldValue: '(',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '',
    adjustedCaretPosition: 0
  },

  // only: true
}, {
  input: {
    mask: '__/__',
    startingInputFieldValue: '',
    userModifiedInputFieldValue: '_',
    caretPositionAfterInputFieldValueChange: 1
  },

  output: {
    conformedInputFieldValue: '',
    adjustedCaretPosition: 0
  },

  // only: true
}])

export function transformTestForComponent(test) {
  const {
    input: {mask},
    output: {conformedInputFieldValue, adjustedCaretPosition}
  } = test

  return {
    conformedInputFieldValue: (
      conformedInputFieldValue === convertMaskToPlaceholder(mask) &&
      adjustedCaretPosition === 0
    ) ? '' : conformedInputFieldValue
  }
}
