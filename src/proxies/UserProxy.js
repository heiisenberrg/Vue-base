import Proxy from './Proxy';

class UserProxy extends Proxy {
  /**
   * The constructor for the CareplanProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('/Users', parameters);
  }

  /**
   * Method used to create user profile.
   *
   * @param {id} id.
   *
   * @returns {Promise} The result in a promise.
   */
  create(data) {
    return this.submit('post', `${this.endpoint}/create`, data);
  }

  /**
   * Method used to view user profile.
   *
   * @param {id} id.
   *
   * @returns {Promise} The result in a promise.
   */
  view(id) {
    return this.submit('get', `${this.endpoint}/${id}`);
  }

  /**
   * Method used to view user profile.
   *
   * @param {id} id.
   *
   * @returns {Promise} The result in a promise.
   */
  update(data) {
    return this.submit('patch', `${this.endpoint}/${data.id}`, data);
  }

  /**
   * Method used to view user profile.
   *
   * @param {id} id.
   *
   * @returns {Promise} The result in a promise.
   */
  viewAll(data) {
    return this.submit('post', `${this.endpoint}/all`, data);
  }
}

export default UserProxy;
