/*global angular*/
import createTextMaskInputElement from '../../core/src/createTextMaskInputElement'

function textMask() {
  'ngInject'

  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      textMask: '='
    },
    link: function(scope, element, attrs, ngModel) {
      var inputElement

      if (element[0].tagName === 'INPUT') {
        // `textMask` directive is used directly on an input element
        inputElement = element[0]
      } else {
        // `textMask` directive is used on an abstracted input element
        inputElement = element[0].getElementsByTagName('INPUT')[0]
      }

      var textMaskInputElement = createTextMaskInputElement(
        Object.assign({inputElement}, scope.textMask)
      )

      element.on('blur keyup change input', function() {
        textMaskInputElement.update(inputElement.value)
        ngModel.$setViewValue(inputElement.value)
      })

      function formatter(fromModelValue) {
        textMaskInputElement.update(fromModelValue)
        return inputElement.value
      }

      ngModel.$formatters.unshift(formatter)
    }
  }
}

const textMaskModule = angular.module('text-mask', [])
textMaskModule.directive('textMask', textMask)

export default textMaskModule
export {default as conformToMask} from '../../core/src/conformToMask.js'
