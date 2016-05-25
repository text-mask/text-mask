import adjustCaretPosition from './adjustCaretPosition.js'
import conformToMask from './conformToMask.js'

export default function processComponentChanges({
  userInput = '',
  placeholder = '',
  previousConformedInput = '',
  mask = '',
  guide = '',
  currentCaretPosition = 0
}) {
  const conformToMaskConfig = (guide === false) ? {guide, previousConformedInput} : {}
  const conformToMaskResults = conformToMask(userInput, mask, conformToMaskConfig)
  const {output: conformToMaskOutput} = conformToMaskResults
  const adjustedCaretPosition = adjustCaretPosition({
    previousConformedInput,
    conformToMaskResults,
    currentCaretPosition
  })
  const valueShouldBeEmpty = conformToMaskOutput === placeholder && adjustedCaretPosition === 0
  const conformedInput = (valueShouldBeEmpty) ? '' : conformToMaskOutput

  return {conformedInput, adjustedCaretPosition}
}
