// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Footaire from '@/components/Footaire';
import Headaire from '@/components/Headaire';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

const footaire = Vue.component('footaire', Footaire);
const headaire = Vue.component('headaire', Headaire);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App, footaire, headaire },
});
