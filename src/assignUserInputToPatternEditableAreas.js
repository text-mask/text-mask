import {removeCharactersStartingAtIndex} from './utilities.js'

export default function assignUserInputToPatternEditableAreas(
  patternEditableAreas = [],
  userInput = ''
) {
  return patternEditableAreas.map((editableArea) => {
    let {content, length} = editableArea

    userInput.split('').forEach((character) => {
      if (content.length < length) {
        content += character
      }
    })

    userInput = removeCharactersStartingAtIndex(userInput, 0, content.length)

    return {
      ...editableArea,
      ...{content}
    }
  })

  //const editableAreasWithContent = []
  //let indexOfLastEditableArea = 0
  //
  //userInput.split('').forEach((character) => {
  //  patternEditableAreas.forEach((editableArea) => {
  //    const {content, length} = editableArea
  //
  //    if (content.length < length) {
  //      content += character
  //    }
  //  })
  //})
  //
  //return editableAreasWithContent
}
