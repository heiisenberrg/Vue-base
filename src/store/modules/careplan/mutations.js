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
  [types.FETCH_CAREPLAN_LIST](state) {
    state.loading = true;
  },
  [types.FETCH_CAREPLAN_LIST_SUCCESS](state, response) {
    state.loading = false;
    state.totalCount = response.totalCount;
    state.careplanList = response.carePlans;
  },
  [types.FETCH_CAREPLAN_LIST_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.GET_CAREPLAN](state) {
    state.loading = true;
  },
  [types.GET_CAREPLAN_SUCCESS](state, res) {
    state.loading = false;
    state.careplan = res.careplan;
  },
  [types.GET_CAREPLAN_FAIL](state, error) {
    state.loading = false;
    state.careplan = null;
    state.error = error;
  },
  [types.CREATE_CAREPLAN](state) {
    state.loading = true;
  },
  [types.CREATE_CAREPLAN_SUCCESS](state) {
    state.loading = false;
  },
  [types.CREATE_CAREPLAN_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.DELETE_CAREPLAN](state) {
    state.loading = true;
  },
  [types.DELETE_CAREPLAN_SUCCESS](state, id) {
    state.loading = false;
    state.careplanList.splice(array.findIndex(state.careplanList, { id }), 1);
    state.totalCount -= 1;
  },
  [types.DELETE_CAREPLAN_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.CREATE_INTERVENTION](state) {
    state.loading = true;
  },
  [types.CREATE_INTERVENTION_SUCCESS](state, data) {
    state.loading = false;
    state.careplan.careplanIntervention.push(data);
  },
  [types.CREATE_INTERVENTION_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.CREATE_ASSESSMENT](state) {
    state.loading = true;
  },
  [types.CREATE_ASSESSMENT_SUCCESS](state, data) {
    state.loading = false;
    state.careplan.careplanAssessment.push(data);
  },
  [types.CREATE_ASSESSMENT_FAIL](state) {
    state.loading = false;
  },
  [types.CREATE_INSTRUCTION](state) {
    state.loading = true;
  },
  [types.CREATE_INSTRUCTION_SUCCESS](state, data) {
    state.loading = false;
    state.careplan.careplanInstruction.push(data);
  },
  [types.CREATE_INSTRUCTION_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.IMPORT_CAREPLAN_TEMPLATE](state) {
    state.loading = true;
  },
  [types.IMPORT_CAREPLAN_TEMPLATE_SUCCESS](state, careplanTemplateList) {
    state.loading = false;
    state.careplanTemplateList = careplanTemplateList;
  },
  [types.IMPORT_CAREPLAN_TEMPLATE_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.FETCH_CAREPLAN_TEMPLATE](state) {
    state.loading = true;
  },
  [types.FETCH_CAREPLAN_TEMPLATE_SUCCESS](state, careplanTemplate) {
    state.loading = false;
    state.careplanTemplate = careplanTemplate;
  },
  [types.FETCH_CAREPLAN_TEMPLATE_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.SET_CAREPLAN](state, careplan) {
    state.careplan = careplan;
  },
  [types.UPDATE_INTERVENTION](state) {
    state.loading = true;
  },
  [types.UPDATE_INTERVENTION_SUCCESS](state, intervention) {
    state.loading = false;
    state.careplan.careplanIntervention[
      array.findIndex(state.careplan.careplanIntervention, intervention)
    ] = intervention;
  },
  [types.UPDATE_INTERVENTION_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.UPDATE_ASSESSMENT](state) {
    state.loading = true;
  },
  [types.UPDATE_ASSESSMENT_SUCCESS](state, assessment) {
    state.loading = false;
    state.careplan.careplanAssessment[
      array.findIndex(state.careplan.careplanAssessment, assessment)
    ] = assessment;
  },
  [types.UPDATE_ASSESSMENT_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.UPDATE_INSTRUCTION](state) {
    state.loading = true;
  },
  [types.UPDATE_INSTRUCTION_SUCCESS](state, instruction) {
    state.loading = false;
    state.careplan.careplanInstruction[
      array.findIndex(state.careplan.careplanInstruction, instruction)
    ] = instruction;
  },
  [types.UPDATE_INSTRUCTION_FAIL](state, error) {
    state.loading = false;
    state.careplan.error = error;
  },
  [types.CREATE_CAREPLAN_FROM_TEMPLATE](state) {
    state.loading = true;
  },
  [types.CREATE_CAREPLAN_FROM_TEMPLATE_SUCCESS](state) {
    state.loading = false;
  },
  [types.CREATE_CAREPLAN_FROM_TEMPLATE_FAIL](state, error) {
    state.loading = false;
    state.error = error;
  },
  [types.SEARCH_CAREPLAN](state) {
    state.searching = true;
  },
  [types.SEARCH_CAREPLAN_SUCCESS](state, searchedCareplans) {
    state.searching = false;
    state.searchedCareplans = searchedCareplans;
  },
  [types.SEARCH_CAREPLAN_FAIL](state) {
    state.searching = false;
  }
};
