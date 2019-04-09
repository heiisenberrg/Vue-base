/* ============
 * Array Mixin
 * ============
 */
import moment from 'moment';
import constants from '@/constants/app.properties';

export default {
  /**
   * The methods that the mixin used for array functions.
   */
  methods: {
    /**
     * Method used to format date
     */
    getFormattedDate(value = '', format = constants.DATE_FORMAT) {
      return value ? moment(value).format(format) : '';
    },
    addDays(value, count) {
      return moment(value).add(count, 'days').format(constants.DATE_FORMAT);
    },
    defaultDateFormat(date) {
      return moment(date).format('ll');
    }
  }
};
