// Masks
const usPhone = '(111) 111-1111'

const testParameters = [{
  input: {
    userInput: '4658713',
    mask: usPhone,
    currentCaretPosition: 7
  },

  output: {
    conformedText: '(465) 871-3__',
    caretPosition: 11
  }
}]
