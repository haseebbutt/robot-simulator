import { Action } from '@ngrx/store';
import { RobotState } from '../../storage/robot-storage';


export const PLACE_ROBOT = 'PLACE_ROBOT';
export const MOVE = 'MOVE';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const REPORT = 'REPORT';

export enum RobotActionTypes {
  PLACE_ROBOT = 'PLACE_ROBOT',
  MOVE = 'MOVE',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export class PlaceRobot implements Action {
  readonly type = RobotActionTypes.PLACE_ROBOT;
  constructor(public payload: RobotState) {}
}

export class Move implements Action {
  readonly type = RobotActionTypes.MOVE;
  constructor(public payload: RobotState) {}
}

export class Left implements Action {
  readonly type = RobotActionTypes.LEFT;
  constructor(public payload: RobotState) {}
}

export class Right implements Action {
    readonly type = RobotActionTypes.RIGHT;
    constructor(public payload: RobotState) {}
  }

export type RobotActions = PlaceRobot | Move | Left | Right;
