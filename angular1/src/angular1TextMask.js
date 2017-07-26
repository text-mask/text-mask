/*global angular*/
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

function removeExcessNumbers(decimal, limit) {
  return typeof decimal === 'string' ? decimal.slice(0, limit) : ''
}

function prepareForMask(value, conf) {
  let result = ''
  if (value || value === 0) {
    const separatedValue = value.toString().split('.')
    if (conf.allowDecimal && separatedValue[1]) {
      result = separatedValue[0] + conf.decimalSymbol + removeExcessNumbers(separatedValue[1], conf.decimalLimit)
    } else {
      result = separatedValue[0]
    }
  }
  return result
}

function textMask() {
  'ngInject'

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      textMask: '=',
      intValue: '='
    },
    link: function(scope, element, attrs, ngModel) {
      var inputElement
      var textMaskInputElement

      if (element[0].tagName === 'INPUT') {
        // `textMask` directive is used directly on an input element
        inputElement = element[0]
      } else {
        // `textMask` directive is used on an abstracted input element
        inputElement = element[0].getElementsByTagName('INPUT')[0]
      }

      element.on('blur keyup change input', function() {
        textMaskInputElement.update(inputElement.value)
        ngModel.$setViewValue(inputElement.value)
      })

      // reset Text Mask when `scope.textMask` object changes
      scope.$watch('textMask', (newMask, oldMaks) => {
        initTextMask()
        let value
        if (newMask.maskedConfig) {
          value = prepareForMask(scope.intValue, newMask.maskedConfig);
        }
        textMaskInputElement.update(value)
      }, true)

      function initTextMask() {
        textMaskInputElement = createTextMaskInputElement(
          Object.assign({inputElement}, scope.textMask)
        )
      }

      function formatter(fromModelValue) {
        // set the `inputElement.value` for cases where the `mask` is disabled
        inputElement.value = fromModelValue

        textMaskInputElement.update(fromModelValue)
        return inputElement.value
      }

      initTextMask()
      ngModel.$formatters.unshift(formatter)
    }
  }
}

const textMaskModule = angular
  .module('text-mask', [])
  .directive('textMask', textMask)
  .name

export default textMaskModule
export {default as conformToMask} from '../../core/src/conformToMask.js'
