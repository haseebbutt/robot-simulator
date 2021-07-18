import { createFeatureSelector } from '@ngrx/store';
import { robotReducer, RobotState } from './robot-storage';

export interface State {
robotState: RobotState;
}

export const reducers = {
  robotState: robotReducer,
};

export const getPosition = createFeatureSelector<RobotState>('robotState');
