/* ============
 * Mutation types for the account module
 * ============
 *
 * The mutation types that are available
 * on the account module.
 */
import keyMirror from 'key-mirror';

export default keyMirror({
  SET_PATIENT: null,

  FETCH_PATIENT_LIST: null,
  FETCH_PATIENT_LIST_SUCCESS: null,
  FETCH_PATIENT_LIST_FAIL: null,

  DELETE_PATIENT: null,
  DELETE_PATIENT_SUCCESS: null,
  DELETE_PATIENT_FAIL: null,

  UPDATE_PATIENT: null,
  UPDATE_PATIENT_SUCCESS: null,
  UPDATE_PATIENT__FAIL: null
});
