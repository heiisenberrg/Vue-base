/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import array from '@/utils/array';
import types from './mutation-types';

export default {
  [types.FETCH_PATIENT_LIST](state) {
    state.loading = true;
  },
  [types.FETCH_PATIENT_LIST_SUCCESS](state, response) {
    state.loading = false;
    state.totalCount = response.totalCount;
    state.patients = response.patients;
  },
  [types.FETCH_PATIENT_LIST_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.UPDATE_PATIENT](state) {
    state.loading = true;
  },
  [types.UPDATE_PATIENT_SUCCESS](state, res) {
    state.loading = false;
    state.patient = res.patient;
  },
  [types.UPDATE_PATIENT_FAIL](state, error) {
    state.loading = false;
    state.patient = null;
    state.error = error;
  },
  [types.DELETE_PATIENT](state) {
    state.loading = true;
  },
  [types.DELETE_PATIENT_SUCCESS](state, id) {
    state.loading = false;
    state.patients.splice(array.findIndex(state.patients, { id }), 1);
    state.totalCount -= 1;
  },
  [types.DELETE_PATIENT_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  }
};
