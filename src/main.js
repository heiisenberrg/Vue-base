/* ============
 * Main File
 * ============
 *
 * Will initialize the application.
 */

import Vue from 'vue';

/* ============
 * Plugins
 * ============
 *
 * Import and bootstrap the plugins.
 */
import 'vue-tel-input/dist/vue-tel-input.css';

import './plugins/vuex';
import './plugins/axios';
import './plugins/date-picker';
import './plugins/event-bus';
import { i18n } from './plugins/vue-i18n';
import { router } from './plugins/vue-router';
import './plugins/vuex-router-sync';
import './plugins/bootstrap';
import './plugins/font-awesome';
import './plugins/register-service-worker';
import './plugins/bootstrap-vue';
import './plugins/ionicons';
import './plugins/validation';


/* ============
 * Styling
 * ============
 *
 * Import the application styling.
 * Stylus is used for this boilerplate.
 *
 * If you don't want to use Stylus, that's fine!
 * Replace the stylus directory with the CSS preprocessor you want.
 * Import the entry point here & install the webpack loader.
 *
 * It's that easy...
 *
 * http://stylus-lang.com/
 */

import './assets/stylus/app.scss';

/* ============
 * Main App
 * ============
 */
import App from './App.vue';
import filters from './filters';
import store from './store';
import directives from './directives';
import mixins from './mixins';
import baseComponents from './components/baseComponents';
import storage from './utils/storage';

// Bootrapping common directives to Vue
directives.forEach((directive) => {
  Vue.directive(directive.name, directive.process);
});

// Injecting Global mixins to Access globally
mixins.forEach((mixin) => {
  Vue.mixin(mixin);
});

// Regestering basecomponents globally
baseComponents.forEach((component) => {
  Vue.component(component.name, component);
});

// Regestering Pipe filters globally
filters.forEach((filter) => {
  Vue.filter(filter.name, filter.process);
});


Vue.config.productionTip = false;

// checking for valid accesstoken if present on app init
const token = storage.getItem(process.env.VUE_APP_ACCESS_TOKEN_KEY);
if (token) {
  store.dispatch('auth/check', token);
}

/* eslint-disable no-new */
new Vue({
  /**
   * Bind the Vue instance to the HTML.
   */
  el: '#app',

  /**
   * The localization plugin.
   */
  i18n,

  /**
   * The router.
   */
  router,

  /**
   * The Vuex store.
   */
  store,

  /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: h => h(App)
});
