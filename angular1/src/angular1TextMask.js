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
      scope.$watch('textMask', () => {
        initTextMask()
        textMaskInputElement.update()
      }, true)

      function initTextMask() {
        textMaskInputElement = createTextMaskInputElement(
          Object.assign({inputElement}, scope.textMask)
        )
      }

      function formatter(fromModelValue) {
        // set the `inputElement.value` for cases where the `mask` is disabled
        var normalizedValue = fromModelValue == null ? '' : fromModelValue
        inputElement.value = normalizedValue

        textMaskInputElement.update(normalizedValue)
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
