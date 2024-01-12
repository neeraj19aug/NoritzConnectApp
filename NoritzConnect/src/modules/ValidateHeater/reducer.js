/* eslint-disable no-undef */
import {
  VALIDATE_HEATER_REQUEST,
  VALIDATE_HEATER_SUCCESS,
  VALIDATE_HEATER_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case VALIDATE_HEATER_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case VALIDATE_HEATER_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case VALIDATE_HEATER_FAILURE:
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
