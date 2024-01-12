/* eslint-disable no-undef */
// @flow
import {
  UPDATE_METADATA_REQUEST,
  UPDATE_METADATA_SUCCESS,
  UPDATE_METADATA_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_METADATA_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case UPDATE_METADATA_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case UPDATE_METADATA_FAILURE:
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
