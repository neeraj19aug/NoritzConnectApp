/* eslint-disable no-undef */
// @flow

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case REGISTER_FAILURE:
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
