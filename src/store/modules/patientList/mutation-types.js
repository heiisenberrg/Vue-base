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

  CREATE_PATIENT: null,
  CREATE_PATIENT_SUCCESS: null,
  CREATE_PATIENT_FAIL: null,

  DELETE_PATIENT: null,
  DELETE_PATIENT_SUCCESS: null,
  DELETE_PATIENT_FAIL: null,

  GET_PATIENT_EHR: null,
  GET_PATIENT_EHR_SUCCESS: null,
  GET_PATIENT_EHR_FAIL: null,

  ASSIGN_CAREPLAN: null,
  ASSIGN_CAREPLAN_SUCCESS: null,
  ASSIGN_CAREPLAN_FAIL: null,

  UN_ASSIGN_CAREPLAN: null,
  UN_ASSIGN_CAREPLAN_SUCCESS: null,
  UN_ASSIGN_CAREPLAN_FAIL: null
});
