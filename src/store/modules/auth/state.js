/* ============
 * The initial state of the auth module.
 * ============
 */
import storage from '@/utils/storage';
import appProperties from '@/constants/app.properties';

export default {
  authenticated: Boolean(storage.getItem(appProperties.ACCESS_TOKEN_KEY)),
  authenticating: false,
  user: {},
  error: '',
  loading: false
};
