import Action from './Action';
import { ACTION_INPUT } from './ACTION_TYPE';

/**
 * Action which take an input
 *
 * @extends {Action}
 * @property {boolean} [required=false] Required
 * @property {string} [value=''] Value
 * @property {string} [defaultValue=''] DefaultValue
 * @deprecated Property defaultValue
 */
class ActionInput extends Action {
  /**
   * Creates an instance of ActionInput.
   * @param {string} name
   * @param {string} description
   * @param {boolean} [required=false]
   * @param {string} [value='']
   *
   * @memberOf ActionInput
   */
  constructor(name, description, required = false, value = '') {
    super(name, description);
    this.type = ACTION_INPUT;
    this.required = required;
    this.defaultValue = value;
    this.value = value;
  }

  /**
   * Set value
   *
   * @param {string} value
   * @returns {boolean}
   *
   * @memberOf ActionInput
   */
  setValue(value) {
    this.value = value;
    return true;
  }

  /**
   * Test if valid
   *
   * @returns {boolean}
   *
   * @memberOf ActionInput
   */
  isValid() {
    if (this.required && !this.value) return false;
    return true;
  }
}

export default ActionInput;
