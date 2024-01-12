import {bindActionCreators} from 'redux';
import {loginUser} from '../../modules/Login';
import {forgotUser} from '../../modules/Forgot';
import {getMetadata} from '../../modules/MetaData';
import { changeHeater } from '../../modules/ChangeHeater';

export const mapStateToProps = state => {
  return {
    isBusyLogin: state.loginReducer.isBusy,
    responseLogin: state.loginReducer,
  
    isBusyForgot: state.forgotReducer.isBusy,
    responseForgot: state.forgotReducer,
  
    isBusyMetadata: state.metadataReducer.isBusy,
    responseMetadata: state.metadataReducer,
  
    isBusyChangeHeater: state.ChangeHeaterReducer.isBusy,
    responseChangeHeater: state.ChangeHeaterReducer,   
  };
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
          loginUser,
          forgotUser,
          getMetadata,
          changeHeater
    },
    dispatch,
  );
