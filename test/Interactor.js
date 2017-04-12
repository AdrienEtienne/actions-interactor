import { expect } from 'chai';
import actionsInteractor, { Types } from '../src';

describe('Interactor', () => {
  let interactor = null;
  let interactorObj = null;

  beforeEach(() => {
    interactorObj = {
      name: 'my interactor',
      description: 'define personal description',
    };
    interactor = actionsInteractor.create(interactorObj);
  });

  it('should create an Interactor', () => {
    interactor = actionsInteractor.create({});
  });

  describe('addAction(obj) type :', () => {

    it('should throw an error if no type or unkown type', () => {
      expect(() => interactor.addAction())
        .to
        .throw();
      expect(() => interactor.addAction({ type: 'toto' }))
        .to
        .throw();
    });

    describe('ACTION_BASE', () => {
      beforeEach(() => interactor.addAction({ name: 'name', description: 'description', type: Types.ACTION_BASE }));

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

      it('should not be valid when no name', () => {
        delete interactor.actions[0].name;
        expect(interactor.actions[0].isValid())
          .to
          .equal(false);
        interactor.addAction({ type: Types.ACTION_BASE });
        expect(interactor.actions[1].isValid())
          .to
          .equal(false);
      });
    });

    describe('ACTION_INPUT', () => {
      beforeEach(() => {
        interactorObj.type = Types.ACTION_INPUT;
      });

      it('should add action input', () => {
        interactor.addAction(interactorObj);
        expect(interactorObj)
          .to
          .deep
          .contain(interactorObj);
      });

      it('should add action input with required and value', () => {
        interactorObj.required = true;
        interactorObj.value = 'default';
        interactor.addAction(interactorObj);
        expect(interactorObj)
          .to
          .deep
          .contain(interactorObj);
      });

      describe('isValid()', () => {
        beforeEach(() => {
          interactorObj.required = true;
          interactorObj.value = 'default';
          interactor.addAction(interactorObj);
          interactorObj.value = null;
          interactor.addAction(interactorObj);
        });

        it('should be valid if default value', () => expect(interactor.actions[0].isValid()).to.equal(true));
        it('should not be valid if no default value', () => expect(interactor.actions[1].isValid()).to.equal(false));
      });

      describe('setValue(value)', () => {
        beforeEach(() => {
          interactorObj.required = true;
          interactor.addAction(interactorObj);
          interactor
            .actions[0]
            .setValue('my value');
        });

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

    describe('ACTION_COMBO', () => {
      beforeEach(() => {
        interactorObj.type = Types.ACTION_COMBO;
      });

      it('should throw error if no choices', () => {
        expect(() => interactor.addAction(interactorObj))
          .to
          .throw();
      });

      it('should throw error if choices without name', () => {
        interactorObj.choices = [
          {
            value: 0,
          },
        ];
        expect(() => interactor.addAction(interactorObj))
          .to
          .throw();
      });

      it('should throw error if choices without name', () => {
        interactorObj.choices = [
          {
            name: 'name',
          },
        ];
        expect(() => interactor.addAction(interactorObj))
          .to
          .throw();
      });

      describe('isValid()', () => {
        it('should be valid if no required', () => {
          interactorObj.choices = [
            {
              name: 'name',
              value: 0,
            },
          ];
          interactor.addAction(interactorObj);
          expect(interactor.actions[0].isValid())
            .to
            .equal(true);
        });
        it('should not be valid if no default value and required', () => {
          interactorObj.choices = [
            {
              name: 'name',
              value: 0,
            },
          ];
          interactorObj.required = true;
          interactor.addAction(interactorObj);
          expect(interactor.actions[0].isValid())
            .to
            .equal(false);
        });

        it('should be valid if default value and required', () => {
          interactorObj.choices = [
            {
              name: 'name',
              value: 0,
              default: true,
            },
          ];
          interactorObj.required = true;
          interactor.addAction(interactorObj);
          expect(interactor.actions[0].isValid())
            .to
            .equal(true);
        });
      });

      describe('action.setValue(obj)', () => {
        beforeEach(() => {
          interactorObj.choices = [
            {
              name: 'name 1',
              value: 1,
              default: true,
            }, {
              name: 'name 2',
              value: 2,
            },
          ];
          interactorObj.required = true;
          interactor.addAction(interactorObj);
          interactor
            .actions[0]
            .setValue(interactor.actions[0].choices[1]);
        });

        it('should set value', () => expect(interactor.actions[0].value).to.deep.equal(interactor.actions[0].choices[1]));
        it('should not set value', () => {
          expect(interactor.actions[0].setValue())
            .to
            .equal(false);
          expect(interactor.actions[0].setValue({ value: 666 }))
            .to
            .equal(false);
        });
      });
    });
  });

});
