import {operationTypes} from './enums.js'

export function convertPatternToPlaceholder(pattern = '') {
  return pattern.replace(/1/g, '_')
}

export function countUnderscores(string = '') {
  return string.match(/_/g).length
}

export function getOperationType(currentValue = '', previousValue = '') {
  return (currentValue.length === previousValue.length) ? operationTypes.replacement :
    (currentValue.length > previousValue.length) ? operationTypes.addition :
      (currentValue.length < previousValue.length) ? operationTypes.deletion :
        null
}

export const maskingCharacters = ['1', 'A', '#']
