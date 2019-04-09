/* ============
 * Mutations for the auth module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */
import Vue from 'vue';
import storage from '@/utils/storage';
import appProperties from '@/constants/app.properties';
import types from './mutation-types';

export default {
  [types.CHECK](state) {
    state.authenticated = !!storage.getItem(appProperties.ACCESS_TOKEN_KEY);
    if (state.authenticated) {
      Vue.$http.defaults.headers.common.Authorization =
        storage.getItem(appProperties.ACCESS_TOKEN_KEY);
    }
  },
  [types.REGISTER]() {
    //
  },
  [types.LOGIN](state) {
    state.loading = true;
    state.authenticated = false;
    state.error = '';
  },
  [types.LOGIN_SUCCESS](state, {
    accessToken,
    user
  }) {
    state.authenticated = true;
    state.user = user;
    state.error = '';
    state.loading = false;
    storage.setItem(appProperties.ACCESS_TOKEN_KEY, accessToken.id);
    Vue.$http.defaults.headers.common.Authorization = accessToken.id;
  },
  [types.LOGIN_FAIL](state, res) {
    state.authenticated = false;
    state.loading = false;
    state.error = res.error.message;
  },
  [types.LOGOUT_INVALID_USER](state) {
    state.authenticated = false;
  },
  [types.VERIFY_TOKEN](state) {
    state.authenticated = false;
    state.authenticating = true;
  },
  [types.VERIFY_TOKEN_FAIL](state) {
    state.authenticated = false;
    state.authenticating = false;
  },
  [types.VERIFY_TOKEN_SUCCESS](state, user) {
    state.authenticated = true;
    state.authenticating = false;
    state.user = user;
  },
  [types.LOGOUT](state) {
    state.authenticated = false;
    storage.deleteItem(appProperties.ACCESS_TOKEN_KEY);
    Vue.$http.defaults.headers.common.Authorization = '';
  },
  [types.REGISTER_FAIL](state, error) {
    state.error = error;
  }
};
