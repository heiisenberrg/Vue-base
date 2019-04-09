<template>
  <nav
    aria-label="breadcrumb"
    class="breadcrum-container"
  >
    <ol class="breadcrumb">
      <li
        v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        :class="{'linked': !!breadcrumb.link}"
        class="breadcrumb-item"
      >
        <router-link
          v-if="breadcrumb.link"
          :to="{ name: breadcrumb.link }"
          active-class="active"
        >
          {{ breadcrumb.name }}
        </router-link>
        <span
          v-else
        >{{ breadcrumb.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data() {
    return {
      breadcrumbList: []
    };
  },
  watch: { $route() { this.updateList(); } },
  mounted() { this.updateList(); },
  methods: {
    routeTo(pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) {
        this.$router.push(this.breadcrumbList[pRouteTo].link);
      }
    },
    updateList() { this.breadcrumbList = this.$route.meta.breadcrumb; }
  }
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>
