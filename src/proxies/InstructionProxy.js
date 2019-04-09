import Proxy from './Proxy';

class InstructionProxy extends Proxy {
  /**
   * The constructor for the InstructionProxy.
   *
   * @param {Object} parameters The query parameters.
   */
  constructor(parameters = {}) {
    super('/CarePlanInstructions', parameters);
  }

  /**
   * Method used to update instruction.
   *
   * @param {Object} data The instructiondetails.
   *
   * @returns {Promise} The result in a promise.
   */
  updateInstruction(id, data) {
    return this.submit('patch', `${this.endpoint}/${id}`, data);
  }
}

export default InstructionProxy;
