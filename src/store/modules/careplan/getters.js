/* ============
 * Getters for the account module
 * ============
 *
 * The getters that are available on the
 * careplan module.
 */
import { clone } from '@/utils/object';

const getCareplanList = state => clone(state.careplanList);
const getCareplan = state => clone(state.careplan);
const getIntervention = state => clone((state.careplan ? state.careplan.careplanIntervention : []));
const getAssessment = state => clone((state.careplan ? state.careplan.careplanAssessment : []));
const getInstruction = state => clone((state.careplan ? state.careplan.careplanInstruction : []));
const getLoading = state => clone(state.loading);
const getCareplanTemplates = state => clone(state.careplanTemplateList);
const getTotalCount = state => clone(state.totalCount);
const getCareplanTemplate = state => clone(state.careplanTemplate);
const getSearching = state => clone(state.searching);
const getSearchedCareplans = state => clone(state.searchedCareplans);

export default {
  getCareplanTemplates,
  getCareplanTemplate,
  getCareplanList,
  getCareplan,
  getIntervention,
  getAssessment,
  getInstruction,
  getTotalCount,
  getLoading,
  getSearching,
  getSearchedCareplans
};
