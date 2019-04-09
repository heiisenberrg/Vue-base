import Vue from 'vue';
/**
 * Global events used to communicate between the entire app
 * such that our store and app will not get complicated.
 * A seperate light wieght empty vue instance is used.
 * https://alligator.io/vuejs/global-event-bus/
 * Emit
 * this.$eventBus.$emit('i-got-clicked', this.clickCount);
 * Listen
 * this.$eventBus.$on('i-got-clicked', clickHandler);
 * StopListen
 * this.$eventBus.$off('i-got-clicked', clickHandler);
 * Stop all
 * this.$eventBus.$off()
 */
const $eventBus = new Vue();
Vue.$eventBus = $eventBus;
Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get() {
      return $eventBus;
    }
  }
});
