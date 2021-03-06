import {UnitClass} from '../t/unit'
import {ActionRules, surroundingPositions, removeDuplicates, excludePositions} from '../util/actions'

type UnitLabels = {[unitClass: number] : string}
export const unitLabels : UnitLabels = {
  [UnitClass.Grunt] : 'G',
  [UnitClass.Lancer] : 'L',
  [UnitClass.King]: 'K',
  [UnitClass.Sprinter] : 'S',
  [UnitClass.Paladin] : 'P',
  [UnitClass.Tank] : 'T',
  [UnitClass.Rogue] : 'R'
}

type UnitHealthValues = {[unitClass: number] : number}
export const unitHealthValues : UnitHealthValues = {
  [UnitClass.Grunt] : 2,
  [UnitClass.Lancer] : 1,
  [UnitClass.King]: 2,
  [UnitClass.Sprinter] : 1,
  [UnitClass.Paladin] : 2,
  [UnitClass.Tank] : 4,
  [UnitClass.Rogue] : 1
}

type UnitAttackDamageValues = {[unitClass: number] : number}
export const unitAttackDamageValues : UnitAttackDamageValues = {
  [UnitClass.Grunt] : 2,
  [UnitClass.Lancer] : 1,
  [UnitClass.King]: 1,
  [UnitClass.Sprinter] : 2,
  [UnitClass.Paladin] : 1,
  [UnitClass.Tank] : 1,
  [UnitClass.Rogue] : 3,
}

type MaximumActionValues = {[unitClass: number] : number}
export const maximumActionValues : MaximumActionValues = {
  [UnitClass.Grunt] : 2,
  [UnitClass.Lancer] : 2,
  [UnitClass.King]: 2,
  [UnitClass.Sprinter] : 2,
  [UnitClass.Paladin] : 2,
  [UnitClass.Tank] : 2,
  [UnitClass.Rogue] : 2,
}

export const movementRules : ActionRules = {
  [UnitClass.Grunt]: position => surroundingPositions(position, 1, true),
  [UnitClass.Sprinter]: position => surroundingPositions(position, 2, false),
  [UnitClass.Tank]: position => surroundingPositions(position, 1, false),
  [UnitClass.Lancer]: position => surroundingPositions(position, 1, true),
  [UnitClass.Paladin]: position => surroundingPositions(position, 1, false),
  [UnitClass.King]: position => removeDuplicates([...surroundingPositions(position, 1, true), ...surroundingPositions(position, 2, false)]),
  [UnitClass.Rogue]: position => surroundingPositions(position, 1, true),
}
export const attackingRules : ActionRules = {
  [UnitClass.Grunt]: movementRules[UnitClass.Grunt],
  [UnitClass.Sprinter]: movementRules[UnitClass.Sprinter],
  [UnitClass.Tank]: position => surroundingPositions(position, 1, true),
  [UnitClass.Lancer]: position => excludePositions(surroundingPositions(position, 2, true), surroundingPositions(position, 1, true)),
  [UnitClass.Paladin]: movementRules[UnitClass.Paladin],
  [UnitClass.King]: position => surroundingPositions(position, 1, true),
  [UnitClass.Rogue]: movementRules[UnitClass.Rogue],
}
export const abilityRules : ActionRules = {
  [UnitClass.Grunt]: attackingRules[UnitClass.Grunt],
  [UnitClass.Sprinter]: attackingRules[UnitClass.Sprinter],
  [UnitClass.Tank]: attackingRules[UnitClass.Tank],
  [UnitClass.Lancer]: attackingRules[UnitClass.Lancer],
  [UnitClass.Paladin]: position => [],
  [UnitClass.King]: attackingRules[UnitClass.King],
  [UnitClass.Rogue]: position => surroundingPositions(position, 2, false),
}