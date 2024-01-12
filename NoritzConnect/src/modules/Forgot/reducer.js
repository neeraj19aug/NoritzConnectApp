/* eslint-disable no-undef */
// @flow
import {
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORGOT_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case FORGOT_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case FORGOT_FAILURE:
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
