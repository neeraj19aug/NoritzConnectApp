/* eslint-disable no-undef */
// @flow
import {
  GETERRORINFO_REQUEST,
  GETERRORINFO_SUCCESS,
  GETERRORINFO_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETERRORINFO_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case GETERRORINFO_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case GETERRORINFO_FAILURE:
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
