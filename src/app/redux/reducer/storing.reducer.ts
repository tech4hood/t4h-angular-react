import { ActionType, DataActions } from '../actions/storing.action';

export interface DataState {
  data: string;
  message: string;
}

export const initialState: DataState = {
  data: '',
  message: ''
};

export function dataReducer(
           state = initialState,
  action: DataActions): DataState  {
  console.log("action", action.type);
  switch (action.type) {
    case ActionType.SAVING_DATA: {
      return {
        ...state,
        data: action.data,
        message: action.message
      };
     }
    default: {
      return state;
    }
           }
       }


