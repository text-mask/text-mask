/*global angular*/

(function() {
  'use strict'

  angular
    .module('app', [
      'text-mask'
    ])
    .component('demo', {
      controller: 'DemoController as $ctrl',
      templateUrl: 'demo.html'
    })
    .controller('DemoController', DemoController)

  DemoController.$inject = []

  /* @ngInject */
  function DemoController() {
    var vm = this

    vm.myModel = ''
    vm.modelWithValue = '5554441234'

    vm.textMaskConfig = {
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    }
  }
})()
