/* eslint-disable no-undef */
import {
  INSTALLERINFO_REQUEST,
  INSTALLERINFO_SUCCESS,
  INSTALLERINFO_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case INSTALLERINFO_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case INSTALLERINFO_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case INSTALLERINFO_FAILURE:
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
