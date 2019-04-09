/* ============
 * Objects Mixin
 * ============
 */
import {
  isEmpty,
  isNotEmpty,
  clone,
  merge
} from '@/utils/object';

export default {
  /**
   * The methods that the mixin used for object functions.
   */
  methods: {
    isEmpty,
    isNotEmpty,
    clone,
    merge,
    set(object, key, value) {
      this.$set(object, key, value);
    }
  }
};
