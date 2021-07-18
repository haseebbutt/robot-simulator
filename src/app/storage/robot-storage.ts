import { LEFT, MOVE, PLACE_ROBOT, RIGHT, RobotActions } from '../services/robot-actions/robot-actions.service';


export interface RobotState {
   xAxis: number;
   yAxis: number;
  direction: string;
  onEdge: boolean;
}
const initialState: RobotState = {
   xAxis: 0,
   yAxis: 0,
   direction: '',
   onEdge: false,
  };

export function robotReducer(state: RobotState = initialState,
                             action: RobotActions): RobotState {
    switch (action.type) {
        case PLACE_ROBOT: {
            return {
                ...state,
                xAxis: action.payload.xAxis,
                yAxis: action.payload.yAxis,
                direction: action.payload.direction,
                onEdge: action.payload.onEdge,
            };
        }
        case MOVE: {
            let newX = action.payload.xAxis;
            let newY = action.payload.yAxis;
            if (action.payload.direction === 'North' && action.payload.yAxis > 0) {
                  newY -= 20;
              } else if (action.payload.direction === 'South' && action.payload.yAxis < 80) {
                  newY += 20;
              } else if (action.payload.direction === 'East' && action.payload.xAxis < 80) {
                  newX += 20;
              } else if (action.payload.direction === 'West' && action.payload.xAxis > 0) {
                  newX -= 20;
              }

            return {
                ...state,
                xAxis: newX,
                yAxis: newY,
                direction: action.payload.direction,
                onEdge: action.payload.onEdge,
            };
        }
        case LEFT: {
            let direction = '';
            if (action.payload.direction === 'North') {
                direction = 'West';
              } else if (action.payload.direction === 'West') {
                direction = 'South';
              } else if (action.payload.direction === 'South') {
                direction = 'East';
              } else if (action.payload.direction === 'East') {
                direction = 'North';
              }
            return {
                ...state,
                xAxis: action.payload.xAxis,
                yAxis: action.payload.yAxis,
                direction,
                onEdge: action.payload.onEdge,
            };
        }
        case RIGHT: {
            let direction = '';
            if (action.payload.direction === 'North') {
                direction = 'East';
              } else if (action.payload.direction === 'West') {
                direction = 'North';
              } else if (action.payload.direction === 'South') {
                direction = 'West';
              } else if (action.payload.direction === 'East') {
                direction = 'South';
              }
            return {
                ...state,
                xAxis: action.payload.xAxis,
                yAxis: action.payload.yAxis,
                direction,
                onEdge: action.payload.onEdge,
            };
        }
        default: {
            return state;
        }
    }
}
