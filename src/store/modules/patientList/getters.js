/* ============
 * Getters for the patient module
 * ============
 *
 * The getters that are available on the
 * patient module.
 */
import { clone } from '@/utils/object';

const getPatientList = state => clone(state.patientList);
const getPatient = state => clone(state.patient);
const getLoading = state => clone(state.loading);
const getTotalCount = state => clone(state.totalCount);
const getPatientStatusCount = status => clone(status.patienStatusCount);

export default {
  getPatientList,
  getPatient,
  getLoading,
  getTotalCount,
  getPatientStatusCount
};
