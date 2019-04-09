/* ============
 * Getters for the profile module
 * ============
 *
 * The getters that are available on the
 * profile module.
 */
import { clone } from '@/utils/object';

const getUser = state => clone(state.user);
const getStatus = state => state.status;

export default {
  getUser,
  getStatus
};
