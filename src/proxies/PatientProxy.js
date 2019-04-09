import Proxy from './Proxy';

class PatientProxy extends Proxy {
  /**
   * The constructor for the CareplanProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('/Patients', parameters);
  }

  /**
   * Method used to view health record using patient id.
   *
   * @param {id} id.
   *
   * @returns {Promise} The result in a promise.
   */
  view(id) {
    return this.submit('get', `${this.endpoint}/${id}/record`);
  }

  /**
   * Method used to fetch patient details.
   *
   * @param {Object} data data to fetch patient details
   *
   * @returns {Promise} The result in a promise.
   */
  fetchPatients(data) {
    return this.submit('post', `${this.endpoint}/all`, data);
  }


  /**
   * Method used to update patient details.
   *
   * @param {Object} data data to update patient
   *
   * @returns {Promise} The result in a promise.
   */
  update({ data, id }) {
    return this.submit('patch', `${this.endpoint}/${id}`, data);
  }

  /**
   * Method used to fetch patient details.
   *
   * @param {Object} data data to fetch patient details
   *
   * @returns {Promise} The result in a promise.
   */
  fetchPatientProgresses(data) {
    return this.submit('post', `${this.endpoint}/patientsProgress`, data);
  }

  /**
   * Used to assign careplan details.
   * @param {*} data - careplan data
   */
  assignCareplan(data) {
    return this.submit('post', `${this.endpoint}/assignCarePlan`, data);
  }


  /**
   * Used to assign careplan details.
   * @param {*} data - careplan data
   */
  unAssignCareplan(data) {
    return this.submit('post', `${this.endpoint}/unAssignCarePlan`, data);
  }
}

export default PatientProxy;
