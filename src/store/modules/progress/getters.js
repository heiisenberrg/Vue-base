/* ============
 * Getters for the patient module
 * ============
 *
 * The getters that are available on the
 * patient progress module.
 */
import { clone } from '@/utils/object';

const getPatientProgresses = state => clone(state.patientProgressList);
const getPatientProgress = state => clone(state.patientProgress);
const getLoading = state => clone(state.loading);
const getTotalCount = state => clone(state.totalCount);

export default {
  getPatientProgresses,
  getPatientProgress,
  getLoading,
  getTotalCount
};
