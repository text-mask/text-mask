import {placeholderCharacter} from './constants.js'
import {convertPatternToPlaceholder} from './utilities.js'

export default function getPlaceholderEditableAreas(pattern = '') {
  const placeholder = convertPatternToPlaceholder(pattern)
  const editableAreas = []

  let lengthOfLastEncounteredArea = 0
  placeholder.split('').forEach((character) => {
    if (character === placeholderCharacter) {
      lengthOfLastEncounteredArea++
    } else {
      editableAreas.push({
        length: lengthOfLastEncounteredArea,
        delimiter: character,
        content: ''
      })
      lengthOfLastEncounteredArea = 0
    }
  })

  if (lengthOfLastEncounteredArea > 0) {
    editableAreas.push({
      length: lengthOfLastEncounteredArea,
      delimiter: '',
      content: ''
    })
  }

  return editableAreas
}
