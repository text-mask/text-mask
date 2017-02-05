import Vue from 'vue'
import vueTextMask from '../src/vueTextMask'

Vue.directive('text-mask', vueTextMask)

/* eslint-disable no-new */
new Vue({
  el: '#app',

  data: {
    phone: '',

    maskOptions: {
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    }
  }
})
