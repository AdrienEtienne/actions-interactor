import { expect } from 'chai';
import actionsInteractor from '../src';

describe('Interactor', () => {
  let interactor = null;
  const interactorObj = {
    name: 'my interactor',
    kind: 'define personal kind',
  };

  beforeEach(() => {
    interactor = actionsInteractor.create(interactorObj);
  });

  describe('addInfo(name, description)', () => {
    beforeEach(() => interactor.addInfo('name', 'description'));

    it('should add Info to actions', () => {
      expect(interactor.actions)
        .to
        .have
        .length(1);
    });
    it('should add Info with infos', () => {
      expect(interactor.actions[0])
        .to
        .deep
        .contain({ name: 'name', description: 'description' });
    });
    it('should be valid', () => {
      expect(interactor.isValid())
        .to
        .equal(true);
      expect(interactor.actions[0].isValid())
        .to
        .equal(true);
    });
  });

  describe('addInput(name, description, isRequired, defaultValue)', () => {
    describe('required', () => {
      beforeEach(() => interactor.addInput('name', 'description', true, 'default'));
      beforeEach(() => interactor.addInput('name', 'description', true));

      it('should be valid if default value', () => expect(interactor.actions[0].isValid()).to.equal(true));
      it('should not be valid if no default value', () => expect(interactor.actions[1].isValid()).to.equal(false));
    });

    describe('not required', () => {
      beforeEach(() => interactor.addInput('name', 'description', false, 'default'));
      beforeEach(() => interactor.addInput('name', 'description'));

      it('should be valid if default value', () => expect(interactor.actions[0].isValid()).to.equal(true));
      it('should be valid if no default value', () => expect(interactor.actions[1].isValid()).to.equal(true));
    });

    describe('action.setValue(value)', () => {
      beforeEach(() => interactor.addInput('name', 'description', true));
      beforeEach(() => interactor.actions[0].setValue('my value'));

      it('should be valid', () => expect(interactor.actions[0].isValid()).to.equal(true));
      it('should not be valid', () => {
        interactor
          .actions[0]
          .setValue('');
        expect(interactor.actions[0].isValid())
          .to
          .equal(false);
      });
    });
  });

  describe('addCombo(name, description, isRequired, choices)', () => {

    it('should throw error if no choices', () => {
      expect(() => interactor.addCombo('name', 'description')).to.throw();
    });

    it('should throw error if choices without name', () => {
      expect(() => interactor.addCombo('name', 'description', false, [{ value: 0 }])).to.throw();
    });

    it('should throw error if choices without name', () => {
      expect(() => interactor.addCombo('name', 'description', false, [{ name: 'name' }])).to.throw();
    });

    describe('required', () => {
      beforeEach(() => interactor.addCombo('name', 'description', true, [
        {
          name: 'name 1',
          value: 1,
        }, {
          name: 'name 2',
          value: 2,
        },
      ]));
      beforeEach(() => interactor.addCombo('name', 'description', true, [
        {
          name: 'name 1',
          value: 1,
          default: true,
        }, {
          name: 'name 2',
          value: 2,
        },
      ]));

      it('should not be valid if no default value', () => expect(interactor.actions[0].isValid()).to.equal(false));
      it('should be valid if default value', () => expect(interactor.actions[1].isValid()).to.equal(true));
    });

    describe('not required', () => {
      beforeEach(() => interactor.addCombo('name', 'description', false, [
        {
          name: 'name 1',
          value: 1,
        }, {
          name: 'name 2',
          value: 2,
        },
      ]));
      beforeEach(() => interactor.addCombo('name', 'description', false, [
        {
          name: 'name 1',
          value: 1,
          default: true,
        }, {
          name: 'name 2',
          value: 2,
        },
      ]));

      it('should be valid if default value', () => expect(interactor.actions[0].isValid()).to.equal(true));
      it('should be valid if no default value', () => expect(interactor.actions[1].isValid()).to.equal(true));
    });

    describe('action.setValue(obj)', () => {
      beforeEach(() => interactor.addCombo('name', 'description', true, [
        {
          name: 'name 1',
          value: 1,
        }, {
          name: 'name 2',
          value: 2,
        },
      ]));
      beforeEach(() => interactor.actions[0].setValue(interactor.actions[0].choices[0]));

      it('should be valid', () => expect(interactor.actions[0].isValid()).to.equal(true));
    });
  });
});
