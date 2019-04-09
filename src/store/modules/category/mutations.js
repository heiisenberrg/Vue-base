/* ============
 * Mutations for the category module
 * ============
 *
 * The mutations that are available on the
 * category module.
 */
import types from './mutation-types';

export default {
  [types.FETCH_CATEGORY_LIST](state) {
    state.loading = true;
  },
  [types.FETCH_CATEGORY_LIST_SUCCESS](state, response) {
    state.loading = false;
    state.categories = response;
  },
  [types.FETCH_CATEGORY_LIST_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  }
};
