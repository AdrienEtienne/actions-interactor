import Interactor from './Interactor/Interactor';
import Action from './action/Action' ;
import ActionCombo from './action/ActionCombo' ;
import ActionInput from './action/ActionInput' ;
import { ACTION_BASE, ACTION_COMBO, ACTION_INPUT } from './action/ACTION_TYPE';

const populateActions = (interactorActions, actions) => {
  actions.forEach((action) => {
    switch (action.type) {
      case ACTION_BASE:
        {
          interactorActions.push(new Action(action.name, action.description));
          return true;
        }
      case ACTION_COMBO:
        {
          const tmp = new ActionCombo(
            action.name,
            action.description,
            action.required,
            action.choices);
          tmp.setValue(action.value);
          interactorActions.push(tmp);
          return true;
        }
      case ACTION_INPUT:
        {
          const tmp = new ActionInput(action.name,
            action.description,
            action.required,
            action.defaultValue);
          tmp.setValue(action.value);
          interactorActions.push(tmp);
          return true;
        }
      default:
        return false;
    }
  });
};

export default function create(obj = {}) {
  const interactor = new Interactor(obj.name, obj.description);

  if (Array.isArray(obj.actions)) {
    populateActions(interactor.actions, obj.actions);
  }

  return interactor;
}
