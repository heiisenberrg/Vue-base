/* ============
 * Getters for the patient module
 * ============
 *
 * The getters that are available on the
 * patient module.
 */
import { clone } from '@/utils/object';

const getPatients = state => clone(state.patients);
const getPatient = state => clone(state.patient);
const getLoading = state => clone(state.loading);
const getTotalCount = state => clone(state.totalCount);

export default {
  getPatients,
  getPatient,
  getLoading,
  getTotalCount
};
