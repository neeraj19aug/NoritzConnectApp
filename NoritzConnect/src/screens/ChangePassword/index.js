import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChangePasswordScreen from './ChangePassword';
import { getMetadata } from '../../modules/MetaData';
import { ChangePassword } from '../../modules/changePassword';

// import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state) => ({
  isBusyMetadata: state.metadataReducer.isBusy,
  responseMetadata: state.metadataReducer,

  isBusyChangePassword: state.changePasswordReducer.isBusy,
  responseChangePassword: state.changePasswordReducer,

});

export default connect(
  mapStateToProps,
  (dispatch) => ({
    getMetadata: bindActionCreators(getMetadata, dispatch),
    ChangePassword: bindActionCreators(ChangePassword, dispatch),

  })
)(ChangePasswordScreen);
