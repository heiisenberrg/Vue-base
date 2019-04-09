/* ============
 * Actions for the carePlan module
 * ============
 *
 * The actions that are available on the
 * carePlan module.
 */
import Vue from 'vue';
import CarePlanProxy from '@/proxies/CarePlanProxy';
import OrganisationProxy from '@/proxies/OrganisationProxy';
import CarePlanTemplateProxy from '@/proxies/CarePlanTemplateProxy';

import AssessmentProxy from '@/proxies/AssessmentProxy';
import InstructionProxy from '@/proxies/InstructionProxy';
import InterventionProxy from '@/proxies/InterventionProxy';

import types from './mutation-types';

export const getCarePlans = ({ commit }, data) => {
  commit(types.FETCH_CAREPLAN_LIST);
  new CarePlanProxy().fetchCarePlans(data).then(({ careplan: { totalCount, carePlans } }) => {
    commit(types.FETCH_CAREPLAN_LIST_SUCCESS, {
      totalCount,
      carePlans
    });
  }).catch((error) => {
    commit(types.FETCH_CAREPLAN_LIST_FAIL, error);
  });
};

export const searchCarePlans = ({ commit }, data) => {
  commit(types.SEARCH_CAREPLAN);
  new CarePlanProxy().searchCarePlans(data).then(({ careplan }) => {
    commit(types.SEARCH_CAREPLAN_SUCCESS, careplan);
  }).catch((error) => {
    commit(types.SEARCH_CAREPLAN_FAIL, error);
  });
};

export const create = ({ commit }, data) => {
  commit(types.CREATE_CAREPLAN);
  new OrganisationProxy().create(data).then((response) => {
    commit(types.CREATE_CAREPLAN_SUCCESS, response);
    Vue.router.push({
      name: 'careplan.view',
      params: { id: response.careplan.id }
    });
  }).catch((error) => {
    commit(types.CREATE_CAREPLAN_FAIL, error);
  });
};

export const update = ({ commit }, { data, id }) => {
  commit(types.CREATE_CAREPLAN);
  new CarePlanProxy().update({ data, id }).then((response) => {
    commit(types.CREATE_CAREPLAN_SUCCESS, response);
    Vue.router.push({
      name: 'careplan.view',
      params: { id: response.id }
    });
  }).catch((error) => {
    commit(types.CREATE_CAREPLAN_FAIL, error);
  });
};

export const remove = ({ commit }, obj) => {
  commit(types.DELETE_CAREPLAN);
  new CarePlanProxy().update(obj).then((response) => {
    commit(types.DELETE_CAREPLAN_SUCCESS, response.id);
  }).catch((error) => {
    commit(types.DELETE_CAREPLAN_FAIL, error);
  });
};

export const view = ({ commit }, data) => {
  commit(types.GET_CAREPLAN);
  return new Promise((resolve, reject) => {
    new CarePlanProxy().view(data).then((response) => {
      commit(types.GET_CAREPLAN_SUCCESS, response);
      resolve();
    }).catch((error) => {
      commit(types.GET_CAREPLAN_FAIL, error);
      reject();
    });
  });
};

export const createIntervention = ({ commit }, { id, data }) => {
  commit(types.CREATE_INTERVENTION);
  new CarePlanProxy().createIntervention(id, data).then(({ intervention }) => {
    commit(types.CREATE_INTERVENTION_SUCCESS, intervention);
  }).catch((error) => {
    commit(types.CREATE_INTERVENTION_FAIL, error);
  });
};

export const createAssessment = ({ commit }, { id, data }) => {
  commit(types.CREATE_ASSESSMENT);
  new CarePlanProxy().createAssessment(id, data).then(({ assessment }) => {
    commit(types.CREATE_ASSESSMENT_SUCCESS, assessment);
  }).catch((error) => {
    commit(types.CREATE_ASSESSMENT_FAIL, error);
  });
};

export const createInstruction = ({ commit }, { id, data }) => {
  commit(types.CREATE_INSTRUCTION);
  new CarePlanProxy().createInstruction(id, data).then(({ instruction }) => {
    commit(types.CREATE_INSTRUCTION_SUCCESS, instruction);
  }).catch((error) => {
    commit(types.CREATE_INSTRUCTION_FAIL, error);
  });
};

export const getTemplates = ({ commit }) => {
  commit(types.IMPORT_CAREPLAN_TEMPLATE);
  new CarePlanTemplateProxy().fetchTemplates().then(({ careplan }) => {
    commit(types.IMPORT_CAREPLAN_TEMPLATE_SUCCESS, careplan);
  }).catch((error) => {
    commit(types.IMPORT_CAREPLAN_TEMPLATE_FAIL, error);
  });
};

export const getTemplate = ({ commit }, id) => {
  commit(types.FETCH_CAREPLAN_TEMPLATE);
  new CarePlanTemplateProxy().fetchTemplate(id).then((response) => {
    commit(types.FETCH_CAREPLAN_TEMPLATE_SUCCESS, response);
  }).catch((error) => {
    commit(types.FETCH_CAREPLAN_TEMPLATE_FAIL, error);
  });
};

export const updateIntervention = ({ commit }, { id, data }) => {
  commit(types.UPDATE_INTERVENTION);
  new InterventionProxy().updateIntervention(id, data).then((intervention) => {
    commit(types.UPDATE_INTERVENTION_SUCCESS, intervention);
  }).catch((error) => {
    commit(types.UPDATE_INTERVENTION_FAIL, error);
  });
};

export const updateAssessment = ({ commit }, { id, data }) => {
  commit(types.UPDATE_ASSESSMENT);
  new AssessmentProxy().updateAssessment(id, data).then((assessment) => {
    commit(types.UPDATE_ASSESSMENT_SUCCESS, assessment);
  }).catch((error) => {
    commit(types.UPDATE_ASSESSMENT_FAIL, error);
  });
};

export const updateInstruction = ({ commit }, { id, data }) => {
  commit(types.UPDATE_INSTRUCTION);
  new InstructionProxy().updateInstruction(id, data).then((instruction) => {
    commit(types.UPDATE_INSTRUCTION_SUCCESS, instruction);
  }).catch((error) => {
    commit(types.UPDATE_INSTRUCTION_FAIL, error);
  });
};

export const createCarePlan = ({ commit }, id) => {
  commit(types.CREATE_CAREPLAN_FROM_TEMPLATE);
  new CarePlanProxy().createCarePlanFromTemplate(id).then((response) => {
    commit(types.CREATE_CAREPLAN_FROM_TEMPLATE_SUCCESS, response);
    Vue.router.push({
      name: 'careplan.view',
      params: { id: response.careplan.id }
    });
  }).catch((error) => {
    commit(types.CREATE_CAREPLAN_FROM_TEMPLATE_FAIL, error);
  });
};

export default {
  getCarePlans,
  create,
  view,
  update,
  remove,
  createIntervention,
  createAssessment,
  createInstruction,
  getTemplates,
  getTemplate,
  updateIntervention,
  updateAssessment,
  updateInstruction,
  createCarePlan,
  searchCarePlans
};
