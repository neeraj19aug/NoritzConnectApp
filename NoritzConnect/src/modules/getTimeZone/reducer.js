/* eslint-disable no-undef */
// @flow
import {
  GET_TIMEZONE_REQUEST,
  GET_TIMEZONE_SUCCESS,
  GET_TIMEZONE_FAILURE,
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
    case GET_TIMEZONE_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null,
      };
    case GET_TIMEZONE_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload,
      };
    case GET_TIMEZONE_FAILURE:
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
