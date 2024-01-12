/* eslint-disable no-undef */
// @flow
import {
  GETINITIAL_REQUEST,
  GETINITIAL_SUCCESS,
  GETINITIAL_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETINITIAL_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case GETINITIAL_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case GETINITIAL_FAILURE:
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
