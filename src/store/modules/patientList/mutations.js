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
    state.patientList = response.patients;
    state.patienStatusCount = response.patientCount;
  },
  [types.FETCH_PATIENT_LIST_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.GET_PATIENT](state) {
    state.loading = true;
  },
  [types.GET_PATIENT_SUCCESS](state, res) {
    state.loading = false;
    state.patient = res.patient;
  },
  [types.GET_PATIENT_FAIL](state, error) {
    state.loading = false;
    state.patient = null;
    state.error = error;
  },
  [types.DELETE_PATIENT](state) {
    state.loading = true;
  },
  [types.DELETE_PATIENT_SUCCESS](state, id) {
    state.loading = false;
    state.patientList.splice(array.findIndex(state.patientList, { id }), 1);
  },
  [types.DELETE_PATIENT_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.SET_PATIENT](state, patient) {
    state.patient = patient;
  },
  [types.GET_PATIENT_EHR](state) {
    state.loading = true;
  },
  [types.GET_PATIENT_EHR_SUCCESS](state, response) {
    state.loading = false;
    state.patient = response;
  },
  [types.GET_PATIENT_EHR_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.ASSIGN_CAREPLAN](state) {
    state.loading = true;
  },
  [types.ASSIGN_CAREPLAN_SUCCESS](state, res) {
    state.loading = false;
    const assignedPatientIndex =
      array.findIndex(state.patientList, { id: res.assignedCareplan.patientId });
    state.patientList[assignedPatientIndex].patientCareplan.push({
      careplan: res.assignedCareplan.carePlan[0]
    });
    state.patientList[assignedPatientIndex].status = 'Assigned';
    const unAssignedCountIndex =
      array.findIndexOfObject(state.patienStatusCount, 'status', 'UnAssigned');
    let unAssignedCount = state.patienStatusCount[unAssignedCountIndex].count;
    unAssignedCount = parseInt(unAssignedCount, 10);
    if (unAssignedCount > 0) {
      state.patienStatusCount[unAssignedCountIndex].count = unAssignedCount - 1;
    }
    const assignedCountIndex =
      array.findIndex(state.patienStatusCount, 'status', 'Assigned');
    let assignedCount = state.patienStatusCount[assignedCountIndex].count;
    assignedCount = parseInt(assignedCount, 10);
    state.patienStatusCount[assignedCountIndex].count = assignedCount + 1;
  },
  [types.ASSIGN_CAREPLAN_FAIL](state) {
    state.loading = false;
  },

  [types.UN_ASSIGN_CAREPLAN](state) {
    state.loading = true;
  },
  [types.UN_ASSIGN_CAREPLAN_SUCCESS](state, res) {
    state.loading = false;
    const unAssignedPatientIndex =
      array.findIndex(state.patientList, { id: res.unAssignedCareplan.patientId });
    const unAssignedCountIndex =
      array.findIndexOfObject(state.patienStatusCount, 'status', 'UnAssigned');
    let unAssignedCount = state.patienStatusCount[unAssignedCountIndex].count;
    unAssignedCount = parseInt(unAssignedCount, 10);
    state.patienStatusCount[unAssignedCountIndex].count = unAssignedCount + 1;
    const assignedCountIndex =
      array.findIndex(state.patienStatusCount, 'status', 'Assigned');
    let assignedCount = state.patienStatusCount[assignedCountIndex].count;
    assignedCount = parseInt(assignedCount, 10);
    if (assignedCount > 0) {
      state.patienStatusCount[assignedCountIndex].count = assignedCount - 1;
    }
    state.patientList[unAssignedPatientIndex].patientCareplan = [];
    state.patientList[unAssignedPatientIndex].status = 'UnAssigned';
  },
  [types.UN_ASSIGN_CAREPLAN_FAIL](state) {
    state.loading = false;
  }
};
