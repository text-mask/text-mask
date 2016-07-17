const defaultIndexesOfPipedChars = []

export default function adjustCaretPosition({
  previousConformedValue = '',
  currentCaretPosition = 0,
  conformedValue,
  rawValue,
  placeholderChar,
  placeholder,
  indexesOfPipedChars = defaultIndexesOfPipedChars
}) {
  if (currentCaretPosition === 0) { return 0 }

  // Store lengths for faster performance?
  const rawValueLength = rawValue.length
  const previousConformedValueLength = previousConformedValue.length
  const placeholderLength = placeholder.length
  const conformedValueLength = conformedValue.length

  // This tells us how long the edit is. If user modified input from `(2__)` to `(243__)`,
  // we know the user in this instance pasted two characters
  const editLength = rawValueLength - previousConformedValueLength

  // If the edit length is positive, that means the user is adding characters, not deleting.
  const isAddition = editLength > 0

  // This is the first character the user entered that needs to be conformed to mask
  const isFirstChar = rawValueLength === 1

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

  // For a mask like (111), if the `previousConformedValue` is (1__) and user attempts to enter
  // `f` so the `rawValue` becomes (1f__), the new `conformedValue` would be (1__), which is the
  // same as the original `previousConformedValue`. We handle this case differently for caret
  // positioning.
  const possiblyHasRejectedChar = isAddition && (
    previousConformedValue === conformedValue ||
    conformedValue === placeholder
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
    const normalizedConformedValue = conformedValue.toLowerCase()
    const normalizedRawValue = rawValue.toLowerCase()

    // Then we take all characters that come before where the caret currently is.
    const leftHalfChars = normalizedRawValue.substr(0, currentCaretPosition).split('')

    // Now we find all the characters in the left half that exist in the conformed input
    const intersection = leftHalfChars.filter((char) => normalizedConformedValue.indexOf(char) !== -1)

    // The last character in the intersection is the character we want to look for in the conformed
    // value and the one we want to adjust the caret close to
    const targetChar = intersection[intersection.length - 1]

    // If the `conformedValue` got piped, we need to know which characters were piped in so that when we look for
    // our `targetChar`, we don't select a piped char by mistake
    const pipedChars = indexesOfPipedChars.map((index) => normalizedConformedValue[index])

    // We need to know how many times the `targetChar` occurs in the piped characters.
    const countTargetCharInPipedChars = pipedChars.filter((char) => char === targetChar).length

    // And we need to know how many times it occurs in the intersection
    const countTargetCharInIntersection = intersection.filter((char) => char === targetChar).length

    // The number of times we need to see occurrences of the `targetChar` before we know it is the one we're looking
    // for is:
    const requiredNumberOfMatches = countTargetCharInIntersection + countTargetCharInPipedChars

    // Now we start looking for the location of the `targetChar`.
    // We keep looping forward and store the index in every iteration. Once we have encountered
    // enough occurrences of the target character, we break out of the loop
    let numberOfEncounteredMatches = 0
    for (let i = 0; i < conformedValueLength; i++) {
      const conformedValueChar = normalizedConformedValue[i]

      startingSearchIndex = i + 1

      if (conformedValueChar === targetChar) {
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
    // We want to remember the last placeholder character encountered so that if the mask
    // contains more characters after the last placeholder character, we don't forward the caret
    // that far to the right. Instead, we stop it at the last encountered placeholder character.
    let lastPlaceholderChar = startingSearchIndex

    for (let i = startingSearchIndex; i <= placeholderLength; i++) {
      if (placeholder[i] === placeholderChar) {
        lastPlaceholderChar = i
      }

      if (
        // If we're adding, we can position the caret at the next placeholder character.
      placeholder[i] === placeholderChar ||

      // This is the end of the placeholder. We cannot move any further. Let's put the caret there.
      i === placeholderLength
      ) {
        return lastPlaceholderChar
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
