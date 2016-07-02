export default function adjustCaretPosition({
  previousConformedInput = '',
  conformToMaskResults = {},
  currentCaretPosition = 0,
}) {
  if (currentCaretPosition === 0) { return 0 }

  const {output: conformedInput = '', meta = {}} = conformToMaskResults
  const {input: rawInput = '', placeholderChar, placeholder} = meta
  const normalizedConformedInput = conformedInput.toLowerCase()
  const normalizedRawInput = rawInput.toLowerCase()
  const leftHalfChars = normalizedRawInput.substr(0, currentCaretPosition).split('')
  const intersection = leftHalfChars.filter((char) => normalizedConformedInput.indexOf(char) !== -1)
  const targetChar = intersection[intersection.length - 1]
  const requiredNumberOfMatches = intersection.filter((char) => char === targetChar).length
  const editLength = rawInput.length - previousConformedInput.length
  const isAddition = editLength > 0
  const possiblyHasRejectedChar = isAddition && (
    previousConformedInput === conformedInput ||
    conformedInput === placeholder
  )

  // This is true when user has entered more than one character per iteration. This happens
  // when user pastes or makes a selection and edits
  const isMultiCharEdit = Math.abs(previousConformedInput.length - rawInput.length) > 1

  // This is the first character the user entered that needs to be conformed to mask
  const isFirstChar = rawInput.length === 1

  // A partial multi-character edit happens when the user makes a partial selection in their
  // input and edits that selection. That is going from `(123) 432-4348` to `() 432-4348` by
  // selecting the first 3 digits and pressing backspace.
  //
  // Such cases can also happen when the user presses the backspace while holding down the ALT
  // key.
  const isPartialMultiCharEdit = isMultiCharEdit && !isAddition && !isFirstChar

  if (isPartialMultiCharEdit) {
    return currentCaretPosition
  }

  let startingSearchIndex = 0

  if (possiblyHasRejectedChar) {
    startingSearchIndex = currentCaretPosition - editLength - 1
  } else {
    let numberOfMatches = 0
    for (let i = 0; i < conformedInput.length; i++) {
      const conformedInputChar = normalizedConformedInput[i]

      if (conformedInputChar === targetChar) {
        numberOfMatches++
      }

      startingSearchIndex = i

      if (numberOfMatches === requiredNumberOfMatches) {
        break
      }
    }
  }

  if (isAddition || isFirstChar) {
    for (let i = startingSearchIndex + 1; i <= placeholder.length; i++) {
      if (
        // If we're adding, we can position the caret at the next placeholder character.
      placeholder[i] === placeholderChar ||

      // This is the end of the target. We cannot move any further. Let's put the caret there.
      i === placeholder.length
      ) {
        // Limiting `i` to the length of the `conformedInput` is a brute force fix for caret
        // positioning in `!guide` mode. There are a few edge cases which are
        // solved by this. To see what happens without it, uncomment the line below and run
        // the test suite

        // return i
        return (i > conformedInput.length) ? conformedInput.length : i
      }
    }
  } else {
    for (let i = startingSearchIndex + 1; i >= 0; i--) {
      // If we're deleting, we stop the caret right before the placeholder character.
      // For example, for mask `(111) 11`, current conformed input `(456) 86`. If user
      // modifies input to `(456 86`. That is, they deleted the `)`, we place the caret
      // right after the first `6`
      if (
        placeholder[i - 1] === placeholderChar ||

        // This is the beginning of the target. We cannot move any further.
        // Let's put the caret there.
        i === 0
      ) {
        return i
      }
    }
  }
}
