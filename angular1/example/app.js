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

    this.myModel = ''
    this.modelWithValue = '5554441234'

    this.textMaskConfig = {
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    }
  }
})()
