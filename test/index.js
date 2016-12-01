/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';
import actionsInteractor, { Types } from '../src';
import { Action, ActionInput, ActionCombo } from '../src/action';

describe('actionsInteractor', () => {

  describe('create(obj)', () => {
    let interactor = null;
    let interactorObj = null;

    beforeEach(() => {
      interactorObj = {
        name: 'my interactor',
        description: 'define personal description',
        actions: [],
      };
      interactor = actionsInteractor.create(interactorObj);
    });

    it('should have a name', () => {
      expect(interactor.name)
        .to
        .equal(interactorObj.name);
    });

    it('should have a description', () => {
      expect(interactor.description)
        .to
        .equal(interactorObj.description);
    });

    it('should have actions empty', () => {
      expect(interactor.actions)
        .to
        .have
        .length(0);
    });

    it('should be valid', () => {
      expect(interactor.isValid())
        .to
        .equal(true);
    });

    it('should not be valid if unknown Action', () => {
      interactor
        .actions
        .push({});
      expect(interactor.isValid())
        .to
        .equal(false);
    });

    it('should create interactor', () => {
      interactor = actionsInteractor.create();
      expect(interactor)
        .to
        .deep
        .contain({ name: '', description: '' });
    });

    it('should not add action', () => {
      interactorObj
        .actions
        .push({});
      interactor = actionsInteractor.create(interactorObj);
      expect(interactor.actions)
        .to
        .have
        .length(0);
    });

    describe('with Action', () => {

      beforeEach(() => {
        interactorObj
          .actions
          .push({ name: 'name', description: 'description', type: Types.ACTION_BASE });
        interactor = actionsInteractor.create(interactorObj);
      });

      it('should have one action', () => expect(interactor.actions).to.have.length(1));
      it('should be an Action', () => expect(interactor.actions[0]).to.be.instanceof(Action));
      it('should be well instanciate', () => expect(interactor.actions[0]).to.deep.contain({ name: 'name', description: 'description' }));
    });

    describe('with ActionInput', () => {

      beforeEach(() => {
        interactorObj
          .actions
          .push({
            name: 'name',
            description: 'description',
            required: true,
            defaultValue: 'value',
            value: 'new Value',
            type: Types.ACTION_INPUT,
          });
        interactor = actionsInteractor.create(interactorObj);
      });

      it('should have one action', () => expect(interactor.actions).to.have.length(1));
      it('should be an ActionInput', () => expect(interactor.actions[0]).to.be.instanceof(ActionInput));
      it('should be well instanciate', () => {
        expect(interactor.actions[0])
          .to
          .deep
          .contain({ name: 'name', description: 'description', required: true, defaultValue: 'value', value: 'new Value' });
      });
      it('should be valid', () => {
        expect(interactor.isValid())
          .to
          .equal(true);
      });
    });

    describe('with ActionInput', () => {

      beforeEach(() => {
        interactorObj
          .actions
          .push({
            name: 'name',
            description: 'description',
            required: true,
            choices: [
              {
                name: 'name',
                value: 0,
                default: true,
              }, {
                name: 'name 2',
                value: 1,
              },
            ],
            value: {
              name: 'name 2',
              value: 1,
            },
            type: Types.ACTION_COMBO,
          });
        interactor = actionsInteractor.create(interactorObj);
      });

      it('should have one action', () => expect(interactor.actions).to.have.length(1));
      it('should be an ActionCombo', () => expect(interactor.actions[0]).to.be.instanceof(ActionCombo));
      it('should be well instanciate', () => {
        expect(interactor.actions[0])
          .to
          .deep
          .contain({
            name: 'name',
            description: 'description',
            required: true,
            value: {
              name: 'name 2',
              value: 1,
            },
          });
      });
      it('should be valid', () => {
        expect(interactor.isValid())
          .to
          .equal(true);
      });
    });
  });

});
