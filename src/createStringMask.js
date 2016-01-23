import {
  convertPatternToPlaceholder,
  maskingCharacters
} from './utilities.js'

export default function createStringMask(pattern) {
  let value = convertPatternToPlaceholder(pattern)

  return {
    value() {
      return value
    },

    transformFrom(newValue) {
      return this
    }
  }
}
