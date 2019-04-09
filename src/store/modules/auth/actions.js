/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */
import Vue from 'vue';
import store from '@/store';
import AuthProxy from '@/proxies/AuthProxy';
import types from './mutation-types';

export const check = ({ commit }, token) => {
  new AuthProxy().verifyToken(token).then((response) => {
    commit(types.VERIFY_TOKEN_SUCCESS, response);
  }).catch((error) => {
    commit(types.LOGOUT_INVALID_USER);
    commit(types.VERIFY_TOKEN_FAIL, error);
  });
};

export const register = ({ commit }, payLoad) => {
  new AuthProxy().register(payLoad).then((response) => {
    /** can fetch account related api call inside success cb */
    store.dispatch('auth/setUser', response);
    commit(types.REGISTER, response);
  }).catch((error) => {
    commit(types.REGISTER_FAIL, error);
  });
};

export const login = ({ commit }, payLoad) => {
  commit(types.LOGIN);
  new AuthProxy().login(payLoad).then((response) => {
    commit(types.LOGIN_SUCCESS, response);
    Vue.router.push({
      name: 'careplan.index'
    });
  }).catch((error) => {
    commit(types.LOGIN_FAIL, error);
  });
};

export const logout = ({ commit }) => {
  commit(types.LOGOUT);
  Vue.router.push({
    name: 'login.index'
  });
  new AuthProxy().logout().then(() => {
  }).catch((error) => {
    commit(types.LOGIN_FAIL, error);
  });
};

export const clearError = ({ commit }) => {
  commit(types.LOGIN);
};

export default {
  check,
  register,
  login,
  logout,
  clearError
};
