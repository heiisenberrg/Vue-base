import Proxy from './Proxy';

class AuthProxy extends Proxy {
  /**
   * The constructor for the ArtistProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('/Users', parameters);
  }

  /**
   * Method used to login.
   *
   * @param {String} username The username.
   * @param {String} password The password.
   *
   * @returns {Promise} The result in a promise.
   */
  login({ email, password }) {
    const data = {
      email,
      password
    };
    return this.submit('post', `${this.endpoint}/admin/login`, data);
  }

  /**
   * Method used to register the user.
   *
   * @param {Object} data The register data.
   *
   * @returns {Promise} The result in a promise.
   */
  register(data) {
    return this.submit('post', `${this.endpoint}/register`, data);
  }

  /**
   * Method used to logout and invalidate the user.
   *
   *
   * @returns {Promise} The result in a promise.
   */
  logout() {
    return this.submit('post', `${this.endpoint}/logout`);
  }


  verifyToken(token) {
    return this.submit('post', '/Users/tokenVerify', { token });
  }
}

export default AuthProxy;
