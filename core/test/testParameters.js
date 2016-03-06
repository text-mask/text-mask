export default [{
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
    adjustedCaretPosition: 2,
    indexOfLastAddedCharacter: null
  }
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
    adjustedCaretPosition: 9,
    indexOfLastAddedCharacter: 10
  }
}, {
  input: {
    startingInputFieldValue: '(1__) ___-3___',
    userModifiedInputFieldValue: '(12__) ___-3___',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 3,
  },

  output: {
    conformedInputFieldValue: '(12_) ___-3___',
    adjustedCaretPosition: 3,
    indexOfLastAddedCharacter: 2
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
    adjustedCaretPosition: 2
  }

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
    adjustedCaretPosition: 8
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
  },
}, {
  // TODO: fix this test case. It currently results in 10!!!
  input: {
    startingInputFieldValue: '(__4) 44_-____',
    userModifiedInputFieldValue: '(__4) 444_-____',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 8,
  },

  output: {
    conformedInputFieldValue: '(__4) 444-____',
    adjustedCaretPosition: 8,
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
    adjustedCaretPosition: 10
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
    adjustedCaretPosition: 8
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
    adjustedCaretPosition: 4
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
    adjustedCaretPosition: 3
  }
}, {
  input: {
    startingInputFieldValue: '(___) ___-____',
    userModifiedInputFieldValue: '5',
    mask: '(111) 111-1111',
    caretPositionAfterInputFieldValueChange: 1,
  },

  output: {
    conformedInputFieldValue: '(5__) ___-____',
    adjustedCaretPosition: 2
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
    adjustedCaretPosition: 2
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
    adjustedCaretPosition: 1
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
    adjustedCaretPosition: 4
  }
}, {
  input: {
    startingInputFieldValue: '(449) _',
    userModifiedInputFieldValue: '(4495) _',
    mask: '(111) 1',
    caretPositionAfterInputFieldValueChange: 5,
  },

  output: {
    conformedInputFieldValue: '(449) 5',
    adjustedCaretPosition: 7
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
    adjustedCaretPosition: 6
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
    adjustedCaretPosition: 2
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
    adjustedCaretPosition: 3
  }
}]
