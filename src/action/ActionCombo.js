import Action from './Action';
import { ACTION_COMBO } from './ACTION_TYPE';

export default class ActionCombo extends Action {
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

  isValid() {
    if (this.required && !this.value) {
      return false;
    }
    return true;
  }

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
