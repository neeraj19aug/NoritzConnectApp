/* eslint-disable no-undef */
// @flow
import {
  SET_TIMEZONE_REQUEST,
  SET_TIMEZONE_SUCCESS,
  SET_TIMEZONE_FAILURE,
} from './types';
const INITIAL_STATE = [
  {
    error: null,
    response: null,
    isBusy: false,
  },
];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TIMEZONE_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null,
      };
    case SET_TIMEZONE_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload,
      };
    case SET_TIMEZONE_FAILURE:
      return {
        ...state,
        isBusy: false,
        response: null,
      };
    default:
      return state;
  }
};

export default reducer;
