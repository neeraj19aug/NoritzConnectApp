/* eslint-disable no-undef */
// @flow
import {
  CHANGEPASSWORD_REQUEST,
  CHANGEPASSWORD_SUCCESS,
  CHANGEPASSWORD_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGEPASSWORD_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case CHANGEPASSWORD_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case CHANGEPASSWORD_FAILURE:
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
