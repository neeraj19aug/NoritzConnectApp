/* eslint-disable no-undef */
// @flow
import {
  RECIRCULATION_ONOFF_REQUEST,
  RECIRCULATION_ONOFF_SUCCESS,
  RECIRCULATION_ONOFF_FAILURE,
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
    case RECIRCULATION_ONOFF_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null,
      };
    case RECIRCULATION_ONOFF_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload,
      };
    case RECIRCULATION_ONOFF_FAILURE:
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
