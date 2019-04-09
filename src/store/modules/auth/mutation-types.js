/* ============
 * Mutation types for the account module
 * ============
 *
 * The mutation types that are available
 * on the auth module.
 */
import keyMirror from 'key-mirror';

export default keyMirror({
  CHECK: null,
  REGISTER: null,
  LOGIN: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAIL: null,
  LOGOUT_INVALID_USER: null,
  LOGOUT: null,
  REGISTER_FAIL: null,
  VERIFY_TOKEN: null,
  VERIFY_TOKEN_FAIL: null,
  VERIFY_TOKEN_SUCCESS: null
});
