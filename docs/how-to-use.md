
# How to use

## Example

```
import actionsInteractor from 'actions-interactor';
interactor = actionsInteractor.create({
  name:'My interactor',
  description:'My description'
})

console.log(interactor);
// {
//   name:'My interactor',
//   description:'My description',
//   actions:[]
// }

```

## API

### create(interactor: object) : [Interactor](#interactor)

interactor object : 
* name: String
* description: String,
* actions: [Action](#action)[]

## Classes

### <a name="interactor">Interactor</a>

#### Attributes

* name: String
* description: String
* actions: [Action](#action)[]

#### Functions

##### isValid(): boolean

Return true if all actions are valid.

##### addInfo(name: String, description: String): boolean

Add an action "information" to the list of actions
Return true if action added.

##### addInput(name: String, description: String[, required: boolean, defaultValue: :string]): boolean

Add an action "input box" to the list of actions
Return true if action added.

##### addCombo(name: String, description: String, required: boolean, choices: Choice[]): boolean

Add an action "combo" to the list of actions
Return true if action added.

### <a name="action">Action</a>

#### Attributes

* name: String
* description: String

#### Functions

##### isValid(): boolean

Return true if all actions are valid.
