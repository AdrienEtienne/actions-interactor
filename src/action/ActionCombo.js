import Action from './Action';
import { ACTION_COMBO } from './ACTION_TYPE';

/**
 * Action Combo
 *
 * @extends {Action}
 * @property {boolean} [required=false] Required
 * @property {string} [value=''] Value
 * @property {Array} choices Choices
 */
class ActionCombo extends Action {
  /**
   * Creates an instance of ActionCombo.
   * @param {string} name Name
   * @param {string} description Description
   * @param {string} required Required
   * @param {string} choices Choices
   *
   * @memberOf ActionCombo
   */
  constructor(name, description, required, choices) {
    super(name, description);
    this.required = required;
    this.choices = choices;
    this.type = ACTION_COMBO;
    this.value = null;

    this
      .choices
      .forEach((choice) => {
        if (choice.default) {
          this.value = choice;
        }
      });
  }

/**
 * Test if valid
 *
 * @returns {boolean}
 *
 * @memberOf ActionCombo
 */
  isValid() {
    if (this.required && !this.value) {
      return false;
    }
    return true;
  }

  /**
   * Set choice
   *
   * @param {object} choice
   * @returns {boolean}
   *
   * @memberOf ActionCombo
   */
  setValue(choice = {}) {
    let result = false;
    this.choices.forEach((item) => {
      if (item.value === choice.value) {
        this.value = choice;
        result = true;
        return false;
      }
      return true;
    });
    return result;
  }
}

export default ActionCombo;
