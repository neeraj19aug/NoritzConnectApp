/* eslint-disable no-undef */
// @flow
import {
  SAVEHEATER_REQUEST,
  SAVEHEATER_SUCCESS,
  SAVEHEATER_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVEHEATER_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case SAVEHEATER_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case SAVEHEATER_FAILURE:
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
