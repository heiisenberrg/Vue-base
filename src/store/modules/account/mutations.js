/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import types from './mutation-types';

export default {
  [types.FIND](state, account) {
    state.email = account.email;
    state.firstName = account.firstName;
    state.lastName = account.lastName;
  }
};
