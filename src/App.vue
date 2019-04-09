<template>
  <div id="app">
    <router-view key="$route.fullPath" />
    <v-confirm-alert />
  </div>
</template>

<script>
import VConfirmAlert from '@/components/Confirmation.vue';
/* ============
  * Entry Point
  * ============
  *
  * The entry point of the application.
  */
export default {
  /**
   * The name of the application.
   */
  name: 'PatientPortal',
  components: { VConfirmAlert },
  /**
   * Fires when the app has been mounted.
   */
  mounted() {
    // If the user is authenticated,
    // fetch the data from the API
    if (this.$store.state.auth.authenticated) {
      this.$store.dispatch('account/find');
    }
  }
};
</script>
