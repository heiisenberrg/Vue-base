import Proxy from './Proxy';

class OrganisationProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('/Organisations', parameters);
  }

  /**
   * Method used to create carepaln.
   *
   * @param {Object} data.
   *
   * @returns {Promise} The result in a promise.
   */
  create(data) {
    return this.submit('post', `${this.endpoint}/${data.organisation_id}/carePlan`, data);
  }
}

export default OrganisationProxy;
