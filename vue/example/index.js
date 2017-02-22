import Vue from 'vue'
import App from './App'
import vueTextMask from '../src/vueTextMask'

Vue.directive('text-mask', vueTextMask)

/* eslint-disable no-new */
new Vue({
  el: '#app',

  components: {
    App
  }
  
})
