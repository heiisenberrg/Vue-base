/* ============
 * careplan Transformer
 * ============
 *
 * The transformer for the careplan.
 */

import Transformer from './Transformer';

export default class CareplanTransformer extends Transformer {
  /**
   * Method used to transform a fetched careplan.
   *
   * @param careplan The fetched careplan.
   *
   * @returns {Object} The transformed careplan.
   */
  static fetch(careplan) {
    return {
      plan_no: careplan.plan_no
    };
  }

  /**
   * Method used to transform a send careplan.
   *
   * @param careplan The careplan to be send.
   *
   * @returns {Object} The transformed careplan.
   */
  static send(careplan) {
    return {
      plan_no: careplan.plan_no
    };
  }
}
