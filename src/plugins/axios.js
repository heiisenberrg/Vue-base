/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */

import Vue from 'vue';
import Axios from 'axios';
import store from '@/store';
import storage from '../utils/storage';

const getBaseUrl = () => {
  const {
    VUE_APP_API_PROTOCOL,
    VUE_APP_API_HOST,
    VUE_APP_API_PORT,
    VUE_APP_BASE_URL
  } = process.env;
  return `${VUE_APP_API_PROTOCOL}${VUE_APP_API_HOST}:${VUE_APP_API_PORT}${VUE_APP_BASE_URL}/`;
};

Axios.defaults.baseURL = getBaseUrl();
Axios.defaults.headers.common.Accept = 'application/json';
Axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      if (storage.getItem(process.env.VUE_APP_ACCESS_TOKEN_KEY)) {
        store.dispatch('auth/logout');
      }
    }
    return Promise.reject(error);
  },
);

/**
 * Set auth token as default in axios
 * @param token
 */
const setAuthToken = (token = storage.getItem(process.env.VUE_APP_ACCESS_TOKEN_KEY)) => {
  Axios.defaults.headers.common.Authorization = token;
};

setAuthToken();

// Bind Axios to Vue.
Vue.$http = Axios;
Vue.$baseUrl = getBaseUrl;

Object.defineProperties(Vue.prototype, {
  $baseUrl: {
    get() {
      return getBaseUrl();
    }
  },
  $http: {
    get() {
      return Axios;
    }
  }
});

export default {
  setAuthToken,
  getBaseUrl
};
