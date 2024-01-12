/* eslint-disable no-undef */
import {
  STATUSDATA_REQUEST,
  STATUSDATA_SUCCESS,
  STATUSDATA_FAILURE
} from './types';

const INITIAL_STATE = [{
  error: null,
  response: null,
  isBusy: false
}];

const reducer = (state: State = INITIAL_STATE, action) => {
  switch (action.type) {
    case STATUSDATA_REQUEST:
      return {
        ...state,
        isBusy: true,
        response: null
      };
    case STATUSDATA_SUCCESS:
      return {
        ...state,
        isBusy: false,
        response: action.payload
      };
    case STATUSDATA_FAILURE:
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
