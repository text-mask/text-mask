export default function adjustCaretPosition({
  previousConformedInput = '',
  conformToMaskResults = {},
  currentCaretPosition = 0,
}) {
  if (currentCaretPosition === 0) { return 0 }

  const {output: conformedInput = '', meta = {}} = conformToMaskResults
  const {input: rawInput = '', placeholderChar, placeholder} = meta

  // This tells us how long the edit is. If user modified input from `(2__)` to `(243__)`,
  // we know the user in this instance pasted two characters
  const editLength = rawInput.length - previousConformedInput.length

  // If the edit length is positive, that means the user is adding characters, not deleting.
  const isAddition = editLength > 0

  // This is the first character the user entered that needs to be conformed to mask
  const isFirstChar = rawInput.length === 1

  // A partial multi-character edit happens when the user makes a partial selection in their
  // input and edits that selection. That is going from `(123) 432-4348` to `() 432-4348` by
  // selecting the first 3 digits and pressing backspace.
  //
  // Such cases can also happen when the user presses the backspace while holding down the ALT
  // key.
  const isPartialMultiCharEdit = editLength > 1 && !isAddition && !isFirstChar

  // This algorithm doesn't support all cases of multi-character edits, so we just return
  // the current caret position.
  //
  // This works fine for most cases.
  if (isPartialMultiCharEdit) { return currentCaretPosition }

  // For a mask like (111), if the `previousConformedInput` is (1__) and user attempts to enter
  // `f` so the `rawInput` becomes (1f__), the new `conformedInput` would be (1__), which is the
  // same as the original `previousConformedInput`. We handle this case differently for caret
  // positioning.
  const possiblyHasRejectedChar = isAddition && (
    previousConformedInput === conformedInput ||
    conformedInput === placeholder
  )

  let startingSearchIndex = 0

  if (possiblyHasRejectedChar) {
    startingSearchIndex = currentCaretPosition - editLength
  } else {
    // At this point in the algorithm, we want to know where the caret is right before the raw input
    // has been conformed, and then see if we can find that same spot in the conformed input.
    //
    // We do that by seeing what character lies immediately before the caret, and then look for that
    // same character in the conformed input and place the caret there.

    // First, we need to normalize the inputs so that letter capitalization between raw input and
    // conformed input wouldn't matter.
    const normalizedConformedInput = conformedInput.toLowerCase()
    const normalizedRawInput = rawInput.toLowerCase()

    // Then we take all characters that come before where the caret currently is.
    const leftHalfChars = normalizedRawInput.substr(0, currentCaretPosition).split('')

    // Now we find all the characters in the left half that exist in the conformed input
    const intersection = leftHalfChars.filter(
      (char) => normalizedConformedInput.indexOf(char) !== -1
    )

    // The last character in the intersection is the character we want to look for in the conformed
    // input
    const targetChar = intersection[intersection.length - 1]

    // However, it may happen to exist more than once in the intersection. We need to know
    // how many times it occurs
    const requiredNumberOfMatches = intersection.filter((char) => char === targetChar).length

    // Now we start looking for the location of the character.
    // We keep looping forward and store the index in every iteration. Once we have encountered
    // enough occurrences of the target character, we break out of the loop
    let numberOfEncounteredMatches = 0
    for (let i = 0; i < conformedInput.length; i++) {
      const conformedInputChar = normalizedConformedInput[i]

      startingSearchIndex = i + 1

      if (conformedInputChar === targetChar) {
        numberOfEncounteredMatches++
      }

      if (numberOfEncounteredMatches >= requiredNumberOfMatches) {
        break
      }
    }
  }

  // At this point, if we simply return `startingSearchIndex` as the adjusted caret position,
  // most cases would be handled. However, we want to fast forward or rewind the caret to the
  // closest placeholder character if it happens to be in a non-editable spot. That's what the next
  // logic is for.

  // In case of addition, we fast forward.
  if (isAddition) {
    for (let i = startingSearchIndex; i <= placeholder.length; i++) {
      if (
        // If we're adding, we can position the caret at the next placeholder character.
      placeholder[i] === placeholderChar ||

      // This is the end of the placeholder. We cannot move any further. Let's put the caret there.
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
    // In case of deletion, we rewind.
    for (let i = startingSearchIndex; i >= 0; i--) {
      // If we're deleting, we stop the caret right before the placeholder character.
      // For example, for mask `(111) 11`, current conformed input `(456) 86`. If user
      // modifies input to `(456 86`. That is, they deleted the `)`, we place the caret
      // right after the first `6`
      if (
        placeholder[i - 1] === placeholderChar ||

        // This is the beginning of the placeholder. We cannot move any further.
        // Let's put the caret there.
        i === 0
      ) {
        return i
      }
    }
  }
}
