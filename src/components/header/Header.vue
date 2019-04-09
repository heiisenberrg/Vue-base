<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <router-link
      :to="{ name: 'careplan.index' }"
      class="navbar-brand"
    >
      <img
        src="@/assets/image/logo.png"
        width="auto"
        height="auto"
        alt=""
      >
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      @click="toggleMenu"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div
      :class="{ show : menuCollapsed}"
      class="collapse navbar-collapse"
    >
      <ul class="navbar-nav flex-row ml-md-auto">
        <span class="navbar-text">
          <a
            href="#"
            @click.prevent="logout"
          >
            SIGN OUT
          </a>
        </span>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  /**
   * The name of the component.
   */
  name: 'Header',
  /**
   * The data that can be used by the page.
   *
   * @returns {Object} The view-model data.
   */
  data() {
    return {
      menuCollapsed: false
    };
  },

  /**
   * The methods that the layout can use.
   */
  methods: {
    /**
     * Will log the user out.
     */
    logout() {
      this.$store.dispatch('auth/logout');
    },

    /**
     * Will toggle the menu.
     */
    toggleMenu() {
      this.menuCollapsed = !this.menuCollapsed;
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./style.scss";
</style>
