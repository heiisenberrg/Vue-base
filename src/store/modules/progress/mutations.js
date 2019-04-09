/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import types from './mutation-types';

export default {
  [types.FETCH_PATIENT_PROGRESS_LIST](state) {
    state.loading = true;
  },
  [types.FETCH_PATIENT_PROGRESS_LIST_SUCCESS](state, response) {
    state.loading = false;
    state.totalCount = response.totalCount;
    state.patientProgressList = response.patientProgress;
  },
  [types.FETCH_PATIENT_PROGRESS_LIST_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  }
};
