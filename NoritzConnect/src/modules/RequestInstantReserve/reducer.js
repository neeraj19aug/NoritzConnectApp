/* eslint-disable no-undef */
// @flow
import {
  INSTANT_RESERVE_REQUEST,
  INSTANT_RESERVE_SUCCESS,
  INSTANT_RESERVE_FAILURE,
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
    case INSTANT_RESERVE_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null,
      };
    case INSTANT_RESERVE_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload,
      };
    case INSTANT_RESERVE_FAILURE:
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
