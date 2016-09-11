import Vue from 'vue'
import App from './App.vue'
import textMask from '../src/vueTextMask'

// Use text mask directive
Vue.directive('text-mask', textMask)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {App}
})
