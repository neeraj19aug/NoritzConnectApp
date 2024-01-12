import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegisterScreen from './Register';
import { registerUser } from '../../modules/Register';
import { getMetadata } from '../../modules/MetaData';

const mapStateToProps = (state) => ({
  isBusyRegister: state.registerReducer.isBusy,
  responseRegister: state.registerReducer,

  isBusyMetadata: state.metadataReducer.isBusy,
  responseMetadata: state.metadataReducer,

});

export default connect(
  mapStateToProps,
  (dispatch) => ({
    registerUser: bindActionCreators(registerUser, dispatch),
    getMetadata: bindActionCreators(getMetadata, dispatch),
  })
)(RegisterScreen);
