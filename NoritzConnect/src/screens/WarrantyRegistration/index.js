import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WarrantyRegistrationScreen from './WarrantyRegistration';
import { getInstallerInfo } from '../../modules/InstallerInfo';
import { warrantyRegister } from '../../modules/WarrantyRegister';

const mapStateToProps = (state) => ({
  isBusyInstallerInfo: state.InstallerInfoReducer.isBusy,
  responseInstallerInfo: state.InstallerInfoReducer,

  isBusyWarrantyRegister: state.WarrantyRegisterReducer.isBusy,
  responseWarrantyRegister: state.WarrantyRegisterReducer,

});

export default connect(
  mapStateToProps,
  (dispatch) => ({
    getInstallerInfo: bindActionCreators(getInstallerInfo, dispatch),
    warrantyRegister: bindActionCreators(warrantyRegister, dispatch),

  })
)(WarrantyRegistrationScreen);
