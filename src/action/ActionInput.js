import Action from './Action';
import { ACTION_INPUT } from './ACTION_TYPE';

export default class ActionInput extends Action {
  constructor(name, description, required = false, defaultValue = '') {
    super(name, description);
    this.type = ACTION_INPUT;
    this.required = required;
    this.defaultValue = defaultValue;
    this.value = defaultValue;
  }

  setValue(value) {
    this.value = value;
    return true;
  }

  isValid() {
    if (this.required && !this.value) return false;
    return true;
  }
}
