/* ============
 * Actions for the carePlan module
 * ============
 *
 * The actions that are available on the
 * carePlan module.
 */
import CategoryProxy from '@/proxies/CategoryProxy';
import types from './mutation-types';

export const getCategories = ({ commit }, data) => {
  commit(types.FETCH_CATEGORY_LIST);
  new CategoryProxy().fetchCategories(data).then((response) => {
    commit(types.FETCH_CATEGORY_LIST_SUCCESS, response);
  }).catch((error) => {
    commit(types.FETCH_CATEGORY_LIST_FAIL, error);
  });
};

export default {
  getCategories
};
