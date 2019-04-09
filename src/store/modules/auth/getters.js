/* ============
 * Getters for the auth module
 * ============
 *
 * The getters that are available on the
 * auth module.
 *
 */
import { clone } from '@/utils/object';

const getOrganisationId = state => clone(state.user.organisation_id);
const getUser = state => clone(state.user);
const getAuthenticating = state => clone(state.isAuthenticating);
const getAuthenticated = state => clone(state.authenticated);
const getErrorMessage = state => clone(state.error);
const isLoading = state => state.loading;

export default {
  getOrganisationId,
  getUser,
  getAuthenticating,
  getAuthenticated,
  getErrorMessage,
  isLoading
};
