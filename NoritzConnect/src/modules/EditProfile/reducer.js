/* eslint-disable no-undef */
// @flow
// @flow
import {
  EDITPROFILE_REQUEST,
  EDITPROFILE_SUCCESS,
  EDITPROFILE_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case EDITPROFILE_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case EDITPROFILE_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case EDITPROFILE_FAILURE:
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
