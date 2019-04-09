<template>
  <div class="col-2 side-nav-bar px-1 position-fixed">
    <div
      id="v-pills-tab"
      class="nav col-12 flex-column nav-pills pr-0"
      role="tablist"
      aria-orientation="vertical"
    >
      <router-link
        v-for="(route, index) in activeRoutes"
        :key="index"
        :to="{ name: route.routeTo }"
        active-class="active"
        class="nav-link"
      >
        <span>{{ route.title }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideNav',
  data() {
    return {
      navs: [
        {
          title: 'Home',
          routeTo: 'home.index',
          module: 'home',
          enable: false
        },
        {
          title: 'Care Plan',
          routeTo: 'careplan.index',
          module: 'careplan',
          enable: true
        },
        {
          title: 'Patient List',
          routeTo: 'patientList.index',
          module: 'patientList',
          enable: true
        },
        {
          title: 'Patient Progress',
          routeTo: 'patientProgress.index',
          module: 'patientProgress',
          enable: true
        },
        {
          title: 'All Users',
          routeTo: 'user.index',
          module: 'user',
          enable: false
        },
        {
          title: 'Profile',
          routeTo: 'profile.index',
          module: 'profile',
          enable: false
        },
        {
          title: 'Patients',
          routeTo: 'patient.index',
          module: 'user',
          enable: true
        },
        {
          title: 'Create User',
          routeTo: 'user.create',
          module: 'user',
          enable: false
        },
        {
          title: 'Create Patient',
          routeTo: 'patient.create',
          module: 'patient',
          enable: false
        }
      ]
    };
  },
  computed: {
    activeRoutes() {
      return this.navs.filter(nav => nav.enable);
    }
  }
};
</script>

<style lang="scss" scoped>
  @import './style.scss';
</style>
