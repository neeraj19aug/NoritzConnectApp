/* eslint-disable no-undef */
// @flow
import {
  EDITHEATER_REQUEST,
  EDITHEATER_SUCCESS,
  EDITHEATER_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDITHEATER_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case EDITHEATER_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case EDITHEATER_FAILURE:
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
