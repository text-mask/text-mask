import Vue from 'vue'
import App from './App.vue'
import textMask from './text-mask'

// Use text mask directive
Vue.directive('text-mask', textMask)

new Vue({
  el: 'body',
  components: { App }
})
