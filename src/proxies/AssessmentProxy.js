import Proxy from './Proxy';

class AssessmentProxy extends Proxy {
  /**
   * The constructor for the AssessmentProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('/CarePlanAssessments', parameters);
  }

  /**
   * Method used to update assessment.
   *
   * @param {Object} data The assessmentdetails.
   *
   * @returns {Promise} The result in a promise.
   */
  updateAssessment(id, data) {
    return this.submit('patch', `${this.endpoint}/${id}`, data);
  }
}

export default AssessmentProxy;
