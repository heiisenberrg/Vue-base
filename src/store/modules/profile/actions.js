/* ============
 * Actions for the profile module
 * ============
 *
 * The actions that are available on the
 * profile module.
 */
import UserProxy from '@/proxies/UserProxy';
import types from './mutation-types';

export const view = ({ commit }, id) => {
  commit(types.FETCH_USER);
  new UserProxy().view(id)
    .then((response) => {
      commit(types.FETCH_USER_SUCCESS, response);
    }).catch((error) => {
      commit(types.FETCH_USER_FAIL, error);
    });
};

export const update = ({ commit }, data) => {
  console.log('method', data);
  commit(types.UPDATE_USER);
  new UserProxy().update(data)
    .then((response) => {
      commit(types.UPDATE_USER_SUCCESS, response);
    }).catch((error) => {
      commit(types.UPDATE_USER_FAIL, error);
    });
};

export default {
  view,
  update
};
