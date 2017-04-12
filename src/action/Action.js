import { ACTION_BASE } from './ACTION_TYPE';

/**
 * Action to interact with
 *
 * @property {string} name Name
 * @property {string} description Description
 * @property {ACTION_TYPE} type Type
 */
class Action {
  /**
   * Creates an instance of Action.
   * @param {string} [name=''] Name
   * @param {string} [description=''] Description
   *
   * @memberOf Action
   */
  constructor(name = '', description = '') {
    this.name = name;
    this.description = description;
    this.type = ACTION_BASE;
  }

  /**
   * Test if action is valid
   *
   * @returns {boolean}
   *
   * @memberOf Action
   */
  isValid() {
    if (this.name) {
      return true;
    }
    return false;
  }
}

export default Action;
