import angular from 'angular'

/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "textMaskModule" }]*/
import textMaskModule from '../src/angular1TextMask'

let demoModule = angular.module('app', ['text-mask'])

import Demo from './demo.component'
demoModule.component('demo', Demo)

export default demoModule
