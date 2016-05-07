import _ from 'lodash/fp'

export default _.filter((testParameter) => testParameter/*.input.mask === 'U1U U1U'*/, [{
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
  }
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
    startingInputFieldValue: '(12_) _',
    userModifiedInputFieldValue: '(12f_) _',
    mask: '(111) 1',
    caretPositionAfterInputFieldValueChange: 3,
  },

  output: {
    conformedInputFieldValue: '(12_) _',
    adjustedCaretPosition: 2
  },
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
  }
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
  }
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
  }
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

  //only: true
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
  }
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

  skip: true
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
  }
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
  }
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
  }
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
  }
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
  }

  //only: true
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
    startingInputFieldValue: '(124) 3',
    userModifiedInputFieldValue: '(124) ',
    mask: '(111) 1',
    caretPositionAfterInputFieldValueChange: 6,
  },

  output: {
    conformedInputFieldValue: '(124) _',
    adjustedCaretPosition: 4,
    indexOfFirstRemovedCharacter: 6
  },

  stuff: true
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
  }

  //only: true
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
  }

  //only: true
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
  // skip: true
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

  onlyConformToMask: true
}, {
  input: {
    startingInputFieldValue: '(123) ___-____',
    userModifiedInputFieldValue: '(123 ___-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 4
  },

  output: {
    conformedInputFieldValue: '(12_) ___-____',
    adjustedCaretPosition: 3,
    indexOfFirstRemovedCharacter: 3
  },

  skip: true
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

  //only: true
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

  skips: [
    // Doesn't support pasting yet
    'adjustCaretPosition'
  ]
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

  skips: [
    // TODO: known issue: doesn't support adjustCaretPosition for partially filled mask
    'adjustCaretPosition'
  ]
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

  //only: true
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

  skips: ['adjustCaretPosition']
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
}])
