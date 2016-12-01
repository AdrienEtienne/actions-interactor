import { ACTION_BASE } from './ACTION_TYPE';

export default class Action {
  constructor(name = '', description = '') {
    this.name = name;
    this.description = description;
    this.type = ACTION_BASE;
  }

  isValid() {
    if (this.name) {
      return true;
    }
    return false;
  }
}
