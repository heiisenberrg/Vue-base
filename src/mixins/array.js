/* ============
 * Array Mixin
 * ============
 */

export default {
  /**
   * The methods that the mixin used for array functions.
   */
  methods: {
    /**
     * Method used to check if specific element is found in an array
     *
     * @param {Array} values array to find index
     *
     * @returns {int} index of the element if found or -1
     */
    findIndex(values = [], expectedValue) {
      let selectedIndex;
      const valuePresent = values.some((value, index) => {
        selectedIndex = index;
        return value === expectedValue;
      });
      return valuePresent ? selectedIndex : -1;
    }
  }
};
