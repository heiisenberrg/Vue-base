/* ============
 * Mutations for the profile module
 * ============
 *
 * The mutations that are available on the
 * profile module.
 */

import types from './mutation-types';

export default {
  [types.FETCH_ALL_USERS](state) {
    state.loading = true;
  },
  [types.FETCH_ALL_USERS_SUCCESS](state, response) {
    state.loading = false;
    state.users = response.users;
    state.totalCount = response.totalCount;
    state.userCount = response.userCount;
  },
  [types.FETCH_ALL_USER_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.UPDATE_USER](state) {
    state.loading = true;
  },
  [types.UPDATE_USER_SUCCESS](state, response) {
    state.loading = false;
    state.user = response;
  },
  [types.UPDATE_USER_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.CREATE_USER](state) {
    state.loading = true;
  },
  [types.CREATE_USER_SUCCESS](state, user) {
    state.loading = false;
    state.user = user;
  },
  [types.CREATE_USER_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  }
};
