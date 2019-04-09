/* ============
 * Getters for the category module
 * ============
 *
 * The getters that are available on the
 * category module.
 */
import { clone } from '@/utils/object';

const getCareplanCategories = state => clone(state.categories);
const getInterventionCategories = state => clone(state.categories);

export default {
  getCareplanCategories,
  getInterventionCategories
};
