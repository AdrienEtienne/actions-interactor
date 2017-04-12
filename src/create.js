import Interactor from './Interactor/Interactor';

/**
 * Create an interactor from object
 *
 * @export
 * @param {object} obj Object
 * @returns {Interactor}
 */
export default function create(obj = {}) {
  const interactor = new Interactor(obj.name, obj.description);

  if (Array.isArray(obj.actions)) {
    obj.actions.forEach((action, key) => {
      interactor.addAction(action);
      if (action.value) interactor.actions[key].setValue(action.value);
    });
  }

  return interactor;
}
