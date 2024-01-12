/* eslint-disable no-undef */
// @flow
import {
    DELETE_FAILURE,
    DELETE_REQUEST,
    DELETE_SUCCESS
  } from './types';
  
  const INITIAL_STATE = [{
    error: null,
    response: null,
    isBusy: false
  }];
  
  const reducer = (state: State = INITIAL_STATE, action) => {
    switch (action.type) {
      case DELETE_REQUEST:
        return {
          ...state,
          isBusy: true,
          response: null
        };
      case DELETE_SUCCESS:
        return {
          ...state,
          isBusy: false,
          response: action.payload
        };
      case DELETE_FAILURE:
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
  