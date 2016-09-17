import Vue from 'vue'
import App from './App.vue'
import VueTextMask from '../src/vueTextMask'

Vue.directive('text-mask', VueTextMask)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {App}
})
