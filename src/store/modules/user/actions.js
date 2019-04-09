/* ============
 * Actions for the profile module
 * ============
 *
 * The actions that are available on the
 * profile module.
 */
import UserProxy from '@/proxies/UserProxy';
import types from './mutation-types';

export const view = ({ commit }, data) => {
  commit(types.FETCH_ALL_USERS);
  new UserProxy().viewAll(data)
    .then((response) => {
      commit(types.FETCH_ALL_USERS_SUCCESS, response);
    }).catch((error) => {
      commit(types.FETCH_ALL_USERS_FAIL, error);
    });
};

export const update = ({ commit }, data) => {
  commit(types.UPDATE_USER);
  new UserProxy().update(data)
    .then((response) => {
      commit(types.UPDATE_USER_SUCCESS, response);
    }).catch((error) => {
      commit(types.UPDATE_USER_FAIL, error);
    });
};

export const remove = ({ commit }, data) => {
  commit(types.UPDATE_USER);
  new UserProxy().update(data)
    .then((response) => {
      commit(types.UPDATE_USER_SUCCESS, response);
    }).catch((error) => {
      commit(types.UPDATE_USER_FAIL, error);
    });
};

export const create = ({ commit }, data) => {
  commit(types.CREATE_USER);
  new UserProxy().create(data)
    .then((response) => {
      commit(types.CREATE_USER_SUCCESS, response);
    }).catch((error) => {
      commit(types.CREATE_USER_FAIL, error);
    });
};

export default {
  create,
  view,
  update,
  remove
};
