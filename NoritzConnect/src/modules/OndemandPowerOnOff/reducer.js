/* eslint-disable no-undef */
// @flow
import {
  ONDEMAND_ONOFF_REQUEST,
  ONDEMAND_ONOFF_SUCCESS,
  ONDEMAND_ONOFF_FAILURE,
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
    case ONDEMAND_ONOFF_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null,
      };
    case ONDEMAND_ONOFF_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload,
      };
    case ONDEMAND_ONOFF_FAILURE:
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
