import Action from '../action/Action';
import ActionInput from '../action/ActionInput';
import ActionCombo from '../action/ActionCombo';
import { ACTION_BASE, ACTION_COMBO, ACTION_INPUT } from '../action/ACTION_TYPE';

/**
 * Manage actions to interact with
 *
 * @class Interactor
 * @property {string} name Name
 * @property {string} description Description
 * @property {Array.<Action>} actions Actions
 */
class Interactor {
  constructor(name = '', description = '') {
    this.name = name;
    this.description = description;

    this.actions = [];
  }

  /**
   * Test if actions are well filled
   *
   * @returns {boolean}
   *
   * @memberOf Interactor
   */
  isValid() {
    let result = true;

    this
      .actions
      .forEach((action) => {
        if (action instanceof Action) {
          result = action.isValid();
        } else {
          result = false;
        }
        return result;
      });

    return result;
  }

  /**
   * Add an action to interactor
   *
   * @param {object} obj
   *
   * @memberOf Interactor
   */
  addAction(obj = {}) {
    switch (obj.type) {
      case ACTION_BASE:
        this
          .actions
          .push(new Action(obj.name, obj.description));
        return;
      case ACTION_INPUT:
        this
          .actions
          .push(new ActionInput(obj.name, obj.description, obj.required, obj.value));
        return;

      case ACTION_COMBO:
        if (Array.isArray(obj.choices) && obj.choices.length > 0) {
          obj.choices.forEach((choice, index) => {
            if (!choice.name) {
              throw new Error(`A choice should contains a name : choice ${index + 1} name missing`);
            }
            if (choice.value === undefined) {
              throw new Error(`A choice should contains a value : choice ${index + 1} value missing`);
            }
          });

          this
            .actions
            .push(new ActionCombo(obj.name, obj.description, obj.required, obj.choices));
        } else {
          throw new Error('Choices have to be provided for combo action');
        }
        return;
      default:
        throw new Error(`Unknown type of action : ${obj.type}`);
    }
  }
}

export default Interactor;
