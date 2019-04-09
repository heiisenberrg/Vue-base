/* ============
 * Actions for the patient module
 * ============
 *
 * The actions that are available on the
 * patient module.
 */
import Vue from 'vue';
import PatientProxy from '@/proxies/PatientProxy';
import types from './mutation-types';

/**
 * @patient format => {
 *   user: {
 *     first_name: String
 *   },
 *   mr_id: String,
 *   category: String,
 *   status: String,
 *   is_mobile_verified: String,
 *   patientCareplan: {
 *     title: String
 * }
 * */
export const getPatients = ({ commit }, data) => {
  commit(types.FETCH_PATIENT_LIST);
  console.log(data);
  new PatientProxy().fetchPatients(data).then((response) => {
    commit(types.FETCH_PATIENT_LIST_SUCCESS, response);
  }).catch((error) => {
    commit(types.FETCH_PATIENT_LIST_FAIL, error);
  });
};

export const assignCareplan = ({ commit }, data) => {
  commit(types.ASSIGN_CAREPLAN);
  new PatientProxy().assignCareplan(data).then((assignedCareplan) => {
    commit(types.ASSIGN_CAREPLAN_SUCCESS, {
      assignedCareplan
    });
  }).catch((error) => {
    commit(types.ASSIGN_CAREPLAN_FAIL, error);
  });
};

export const unAssignCareplan = ({ commit }, data) => {
  commit(types.UN_ASSIGN_CAREPLAN);
  new PatientProxy().unAssignCareplan(data).then((unAssignedCareplan) => {
    commit(types.UN_ASSIGN_CAREPLAN_SUCCESS, {
      unAssignedCareplan
    });
  }).catch((error) => {
    commit(types.UN_ASSIGN_CAREPLAN_FAIL, error);
  });
};

export const update = ({ commit }, { data, id }) => {
  commit(types.CREATE_PATIENT);
  new PatientProxy().update({ data, id }).then((response) => {
    commit(types.CREATE_PATIENT_SUCCESS, response);
    Vue.router.push({
      name: 'patientList.view',
      params: { id: response.id }
    });
  }).catch((error) => {
    commit(types.CREATE_PATIENT_FAIL, error);
  });
};

export const remove = ({ commit }, obj) => {
  commit(types.DELETE_PATIENT);
  new PatientProxy().update(obj).then((response) => {
    commit(types.DELETE_PATIENT_SUCCESS, response.id);
  }).catch((error) => {
    commit(types.DELETE_PATIENT_FAIL, error);
  });
};

export const getPatient = ({ commit }, id) => {
  commit(types.GET_PATIENT_EHR);
  return new Promise((resolve, reject) => {
    new PatientProxy().view(id).then((response) => {
      commit(types.GET_PATIENT_EHR_SUCCESS, response);
      resolve();
    }).catch((error) => {
      commit(types.GET_PATIENT_EHR_FAIL, error);
      reject();
    });
  });
};

export default {
  assignCareplan,
  getPatients,
  update,
  remove,
  getPatient,
  unAssignCareplan
};
