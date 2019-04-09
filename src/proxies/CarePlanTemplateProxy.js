import Proxy from './Proxy';

class CarePlanTemplateProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('/CarePlanTemplates', parameters);
  }

  /**
   * Method used to import careplan templates.
   *
   * @returns {Promise} The result in a promise.
   */
  fetchTemplates() {
    return this.submit('get', `${this.endpoint}/all`);
  }

  /**
   * Method used to import careplan templates.
   *
   * @returns {Promise} The result in a promise.
   */
  fetchTemplate(id) {
    return this.submit('get', `${this.endpoint}/${id}/detail`);
  }
}

export default CarePlanTemplateProxy;
