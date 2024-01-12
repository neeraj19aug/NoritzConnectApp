/* eslint-disable no-undef */
// @flow
import {
  HEATERON_OFF_REQUEST,
  HEATERON_OFF_SUCCESS,
  HEATERON_OFF_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case HEATERON_OFF_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case HEATERON_OFF_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case HEATERON_OFF_FAILURE:
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
