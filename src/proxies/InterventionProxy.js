import Proxy from './Proxy';

class InterventionProxy extends Proxy {
  /**
   * The constructor for the InterventionProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('/CarePlanInterventions', parameters);
  }

  /**
   * Method used to update intervention.
   *
   * @param {Object} data The interventiondetails.
   *
   * @returns {Promise} The result in a promise.
   */
  updateIntervention(id, data) {
    return this.submit('patch', `${this.endpoint}/${id}`, data);
  }
}

export default InterventionProxy;
