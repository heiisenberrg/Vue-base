<template>
  <div class="login-container">
    <div class="row m-0">
      <div class="col-md-4 col-sm-6 offset-md-4 offset-sm-3 login-list">
        <div class="text-center logo">
          <img src="@/assets/image/logo-clr.png">
        </div>
        <h3 class="text-center">Welcome</h3>
        <p class="text-center">Please sign in to get access</p>
        <form @submit.prevent="login(user)">
          <div class="form-group">
            <div class="input-group">
              <input
                v-model="user.email"
                type="email"
                placeholder="Email"
                @focus="clearError"
                class="form-control"
              >
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <input
                v-model="user.password"
                type="password"
                placeholder="Password"
                @focus="clearError"
                class="form-control"
              >
            </div>
          </div>
          <div class="form-group">
            <b-button
              type="submit"
              :disabled="!loading"
              class="btn btn-outline-primary"
            >
              Login
            </b-button>
          </div>
          <div class="text-center error">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
/* ============
 * Login Index Page
 * ============
 *
 * Page where the user can login.
 */
import { mapGetters } from 'vuex';

export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        email: null,
        password: null
      }
    };
  },
  computed: {
    ...mapGetters({
      errorMessage: 'auth/getErrorMessage',
      loading: 'auth/isLoading'
    })
  },
  methods: {
    login(user) {
      this.$store.dispatch('auth/login', user);
    },
    clearError() {
      this.$store.dispatch('auth/clearError');
    }
  }
};
</script>
<style lang="scss" scoped>
  @import './login.scss'
</style>
