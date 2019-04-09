import Proxy from './Proxy';

class CarePlanProxy extends Proxy {
  /**
   * The constructor for the CareplanProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('/CarePlans', parameters);
  }

  /**
   * Method used to view carepaln using careplan id.
   *
   * @param {id} id.
   *
   * @returns {Promise} The result in a promise.
   */
  view(id) {
    return this.submit('get', `${this.endpoint}/${id}`);
  }

  /**
   * Method used to fetch careplan details.
   *
   * @param {Object} data data to fetch careplan details
   *
   * @returns {Promise} The result in a promise.
   */
  fetchCarePlans(data) {
    return this.submit('post', `${this.endpoint}/list`, data);
  }

  /**
   * Used to search careplans for listing and assigning
   * @param {*} filter => {
   *  pageNo: 1
   *  searchValue: '',
   *  limit: 10
   * }
   */
  searchCarePlans({ searchValue }) {
    return this.submit('post', `${this.endpoint}/all`, { searchValue });
  }


  /**
   * Method used to update careplan details.
   *
   * @param {Object} data data to update careplan
   *
   * @returns {Promise} The result in a promise.
   */
  update({ data, id }) {
    return this.submit('patch', `${this.endpoint}/${id}`, data);
  }

  /**
   * Method used to create careplan.
   *
   * @param {Object} data The careplandetails.
   *
   * @returns {Promise} The result in a promise.
   */
  createCarePlan(data) {
    return this.submit('post', `${this.endpoint}/create`, data);
  }

  /**
   * Method used to create intervention.
   *
   * @param {Object} data The interventiondetails.
   *
   * @returns {Promise} The result in a promise.
   */
  createIntervention(id, data) {
    return this.submit('post', `${this.endpoint}/${id}/intervention`, data);
  }


  /**
   * Method used to create instruction.
   *
   * @param {Object} data The instructiondetails.
   *
   * @returns {Promise} The result in a promise.
   */
  createInstruction(id, data) {
    return this.submit('post', `${this.endpoint}/${id}/instruction`, data);
  }


  /**
   * Method used to create assessment.
   *
   * @param {Object} data The assessmentdetails.
   *
   * @returns {Promise} The result in a promise.
   */
  createAssessment(id, data) {
    return this.submit('post', `${this.endpoint}/${id}/assessment`, data);
  }

  /**
   * Method used to create careplan from template.
   *
   * @returns {Promise} The result in a promise.
   */
  createCarePlanFromTemplate(id) {
    return this.submit('get', `${this.endpoint}/carePlanTemplate/${id}/create`);
  }
}

export default CarePlanProxy;
