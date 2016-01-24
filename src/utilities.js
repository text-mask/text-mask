import {operationTypes, maskingCharacters, placeholderCharacter} from './constants.js'

export function convertPatternToPlaceholder(pattern = '') {
  return pattern.replace(/1/g, '_')
}

export function countUnderscores(string = '') {
  return string.match(/_/g).length
}

export function removeCharactersStartingAtIndex(string = '', index = 0, numberOfCharacters = 1) {
  return string.substring(0, index) + string.substring(index + numberOfCharacters)
}

export function getOperationType(currentValue = '', previousValue = '') {
  return (currentValue.length === previousValue.length) ? operationTypes.replacement :
    (currentValue.length > previousValue.length) ? operationTypes.addition :
      (currentValue.length < previousValue.length) ? operationTypes.deletion :
        null
}

export function getDelimiters(pattern ='') {
  return pattern.split('').reduce((accumulator, character) => {
    if (maskingCharacters.indexOf(character) === -1 && accumulator.indexOf(character) === -1) {
      accumulator.push(character)
    }

    return accumulator
  }, [])
}

export function constructConformedString(editableAreasWithContent) {
  return editableAreasWithContent.reduce((accumulator, editableAreaWithContent) => {
    const {content = '', length, delimiter} = editableAreaWithContent
    const contentAndEditableAreaLengthDelta = length - content.length
    const padding = Array.from({length: contentAndEditableAreaLengthDelta}, () => '_').join('')

    accumulator += content + padding + (delimiter || '')

    return accumulator
  }, '')
}
