/* ============
 * Actions for the patient module
 * ============
 *
 * The actions that are available on the
 * patient module.
 */
import PatientProxy from '@/proxies/PatientProxy';
import types from './mutation-types';

export const getPatientProgresses = ({ commit }, data) => {
  commit(types.FETCH_PATIENT_PROGRESS_LIST);
  new PatientProxy().fetchPatientProgresses(data)
    .then(({ totalCount, patientProgress }) => {
      commit(types.FETCH_PATIENT_PROGRESS_LIST_SUCCESS, {
        totalCount,
        patientProgress
      });
    }).catch((error) => {
      commit(types.FETCH_PATIENT_PROGRESS_LIST_FAIL, error);
    });
};

export default {
  getPatientProgresses
};
