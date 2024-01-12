/* eslint-disable no-undef */
// @flow
import {
  METADATA_REQUEST,
  METADATA_SUCCESS,
  METADATA_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case METADATA_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case METADATA_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case METADATA_FAILURE:
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
