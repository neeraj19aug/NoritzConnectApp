/* eslint-disable no-undef */
import {
  CHANGETEMP_REQUEST,
  CHANGETEMP_SUCCESS,
  CHANGETEMP_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGETEMP_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case CHANGETEMP_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case CHANGETEMP_FAILURE:
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
