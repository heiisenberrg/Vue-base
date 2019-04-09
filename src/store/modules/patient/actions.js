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

export const getPatients = ({ commit }, data) => {
  commit(types.FETCH_PATIENT_LIST);
  console.log(data);
  new PatientProxy().fetchPatients(data).then((response) => {
    commit(types.FETCH_PATIENT_LIST_SUCCESS, response);
  }).catch((error) => {
    commit(types.FETCH_PATIENT_LIST_FAIL, error);
  });
};

export const update = ({ commit }, { data, id }) => {
  commit(types.UPDATE_PATIENT);
  new PatientProxy().update({ data, id }).then((response) => {
    commit(types.UPDATE_PATIENT_SUCCESS, response);
    Vue.router.push({
      name: 'patient.view',
      params: { id: response.id }
    });
  }).catch((error) => {
    commit(types.UPDATE_PATIENT_FAIL, error);
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


export default {
  getPatients,
  update,
  remove
};
