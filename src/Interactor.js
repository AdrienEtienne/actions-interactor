import Action from './action/Action';
import ActionInput from './action/ActionInput';
import ActionCombo from './action/ActionCombo';

class Interactor {

  constructor(name = '', description = '') {
    this.name = name;
    this.description = description;

    this.actions = [];
  }

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

  addInfo(name, description) {
    this
      .actions
      .push(new Action(name, description));
    return true;
  }

  addInput(name, description, required, defaultValue) {
    this
      .actions
      .push(new ActionInput(name, description, required, defaultValue));
    return true;
  }

  addCombo(name, description, required, choices) {
    let result = false;
    if (Array.isArray(choices) && choices.length > 0) {
      choices.forEach((choice, index) => {
        if (!choice.name) {
          throw new Error(`A choice should contains a name : choice ${index + 1} name missing`);
        }
        if (choice.value === undefined) {
          throw new Error(`A choice should contains a value : choice ${index + 1} value missing`);
        }
      });

      result = true;
      this
        .actions
        .push(new ActionCombo(name, description, required, choices));
    } else {
      throw new Error('Choices have to be provided for combo action');
    }

    return result;
  }
}

export default Interactor;
