import adjustCaretPosition from './adjustCaretPosition'
import conformToMask from './conformToMask'

export default function processComponentChanges({
  userInput = '',
  placeholder = '',
  previousConformedInput = '',
  mask = '',
  guide = '',
  currentCaretPosition = 0
}) {
  const conformToMaskResults = conformToMask(
    userInput,
    mask,
    (guide === false) ? {guide, previousConformedInput} : {}
  )
  const {output: conformToMaskOutput} = conformToMaskResults
  const adjustedCaretPosition = adjustCaretPosition({
    previousConformedInput,
    conformToMaskResults,
    currentCaretPosition
  })
  const conformedInput = (
    conformToMaskOutput === placeholder &&
    adjustedCaretPosition === 0
  ) ? '' : conformToMaskOutput

  return {
    conformedInput,
    adjustedCaretPosition
  }
}
