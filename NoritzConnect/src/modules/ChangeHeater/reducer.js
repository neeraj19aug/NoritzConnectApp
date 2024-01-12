/* eslint-disable no-undef */
import {
  CHANGEHEATER_REQUEST,
  CHANGEHEATER_SUCCESS,
  CHANGEHEATER_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGEHEATER_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case CHANGEHEATER_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case CHANGEHEATER_FAILURE:
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
