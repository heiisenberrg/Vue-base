import Proxy from './Proxy';

class CategoryProxy extends Proxy {
  /**
   * The constructor for the CategoryProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('/Categories', parameters);
  }

  fetchCategories() {
    return this.submit('get', this.endpoint);
  }
}

export default CategoryProxy;
