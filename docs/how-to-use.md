
# How to use

## Example

```
import actionsInteractor, {Types} from 'actions-interactor';
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

interactor.addAction({
  name:'Name'
  description:'Description',
  type: Types.ACTION_BASE
})

```

## API

### create(interactor: object) : [Interactor](#interactor)

interactor object : 
* name: String
* description: String,
* actions: [Action](#action)[]

## <a name="action_type">ACTION_TYPE</a>
```
import {Types} from 'actions-interactor';
```

- ACTION_BASE: 
  - name: `String`
  - description: `String`
- ACTION_INPUT: as ACTION_BASE plus
  - required: `Boolean`
  - defaultValue: `String`
- ACTION_COMBO: as ACTION_BASE plus
  - required: `Boolean`
  - choices: `Array` 

## Classes

### <a name="interactor">Interactor</a>

#### Attributes

* name: String
* description: String
* actions: [Action](#action)[]

#### Functions

##### isValid(): boolean

Return true if all actions are valid.

##### addAction(obj: Object)

Add an action to the list of actions

obj :
- name: `String`
- description: `String`
- type: [`ACTION_TYPE`](#action_type)
- required: `Boolean`
- defaultValue: `String`,
- choices: `Array`

### <a name="action">Action</a>

#### Attributes

* name: String
* description: String

#### Functions

##### isValid(): boolean

Return true if all actions are valid.
