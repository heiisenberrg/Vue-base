<template>
  <div v-bind="layoutProps">
    <v-header />
    <div class="container-fluid main-container">
      <div class="row">
        <v-sideNav />
        <div class="col col-10 offset-2">
          <v-breadcrumb />
          <!-- Content will be placed here -->
          <div class="body-container">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* ============
 * Default Layout
 * ============
 *
 * Used for the home and account pages.
 *
 * Layouts are used to store a lot of shared code.
 * This way the app stays clean.
 */

import VSideNav from '@/components/sidenav/SideNav.vue';
import VHeader from '@/components/header/Header.vue';
import VBreadcrumb from '@/components/breadcrumb/Breadcrumb.vue';

export default {
  /**
   * The name of the layout.
   */
  name: 'DefaultLayout',

  components: {
    VSideNav,
    VHeader,
    VBreadcrumb
  },
  props: {
    layoutProps: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
