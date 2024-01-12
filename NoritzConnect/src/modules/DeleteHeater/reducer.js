/* eslint-disable no-undef */
import {
  DELETEHEATER_REQUEST,
  DELETEHEATER_SUCCESS,
  DELETEHEATER_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETEHEATER_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case DELETEHEATER_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case DELETEHEATER_FAILURE:
      return {
        ...state,
        isBusy: false,
        response: null
      };
    default:
      return state;
  }
};

export default reducer;
