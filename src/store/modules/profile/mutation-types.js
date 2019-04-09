/* ============
 * Mutation types for the profile module
 * ============
 *
 * The mutation types that are available
 * on the profile module.
 */
import keyMirror from 'key-mirror';

export default keyMirror({
  SET_USER: null,

  FETCH_USER: null,
  FETCH_USER_SUCCESS: null,
  FETCH_USER_FAIL: null,

  UPDATE_USER: null,
  UPDATE_USER_SUCCESS: null,
  UPDATE_USER_FAIL: null
});
