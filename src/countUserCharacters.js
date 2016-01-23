import {
  maskingCharacters,
  convertPatternToPlaceholder,
  countUnderscores
} from './utilities.js'

export default function countUserCharacters(value, pattern) {
  const placeholder = convertPatternToPlaceholder(pattern)
  const underscoresInPlaceholder = countUnderscores(placeholder)
  const underscoresInValue = countUnderscores(value)

  return underscoresInPlaceholder - underscoresInValue
}
