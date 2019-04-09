/* ============
 * Getters for the profile module
 * ============
 *
 * The getters that are available on the
 * profile module.
 */
import { clone } from '@/utils/object';

const getAllUsers = state => clone(state.users);
const getTotalCount = state => clone(state.totalCount);
const getUserCount = state => clone(state.userCount);
const getUser = state => clone(state.user);

export default {
  getAllUsers,
  getTotalCount,
  getUserCount,
  getUser
};
