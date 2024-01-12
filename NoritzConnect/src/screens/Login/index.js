import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginScreen from './Login';
import {loginUser} from '../../modules/Login';
import {forgotUser} from '../../modules/Forgot';
import {getMetadata} from '../../modules/MetaData';
import {changeHeater} from '../../modules/ChangeHeater';

const mapStateToProps = (state) => ({
  isBusyLogin: state.loginReducer.isBusy,
  responseLogin: state.loginReducer,

  isBusyForgot: state.forgotReducer.isBusy,
  responseForgot: state.forgotReducer,

  isBusyMetadata: state.metadataReducer.isBusy,
  responseMetadata: state.metadataReducer,

  isBusyChangeHeater: state.ChangeHeaterReducer.isBusy,
  responseChangeHeater: state.ChangeHeaterReducer,
});

export default connect(mapStateToProps, (dispatch) => ({
  loginUser: bindActionCreators(loginUser, dispatch),
  forgotUser: bindActionCreators(forgotUser, dispatch),
  getMetadata: bindActionCreators(getMetadata, dispatch),
  changeHeater: bindActionCreators(changeHeater, dispatch),
}))(LoginScreen);
