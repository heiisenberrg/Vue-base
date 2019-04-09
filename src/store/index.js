/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// Modules
import account from './modules/account';
import auth from './modules/auth';
import category from './modules/category';
import careplan from './modules/careplan';
import patientList from './modules/patientList';
import patient from './modules/patient';
import progress from './modules/progress';
import profile from './modules/profile';
import user from './modules/user';


const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  /**
   * Assign the modules to the store.
   */
  modules: {
    account,
    auth,
    careplan,
    category,
    patientList,
    progress,
    profile,
    patient,
    user
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger()] : []
});
