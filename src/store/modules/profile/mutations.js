/* ============
 * Mutations for the profile module
 * ============
 *
 * The mutations that are available on the
 * profile module.
 */

import types from './mutation-types';

export default {
  [types.FETCH_USER](state) {
    state.loading = true;
  },
  [types.FETCH_USER_SUCCESS](state, response) {
    state.loading = false;
    state.user = response;
  },
  [types.FETCH_USER_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.UPDATE_USER](state) {
    state.loading = true;
  },
  [types.UPDATE_USER_SUCCESS](state, response) {
    state.loading = false;
    state.user = response;
    state.status = 'success';
  },
  [types.UPDATE_USER_FAIL](state, error) {
    state.loading = false;
    state.error = error;
    state.status = 'danger';
  }
};
