import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditHeaterDetailsScreen from './EditHeaterDetails';
import { getInstallerInfo } from '../../modules/InstallerInfo';
import { warrantyRegister } from '../../modules/WarrantyRegister';
import { EditHeater } from '../../modules/EditHeater';
import { getMetadata } from '../../modules/MetaData';
import { DeleteHeater } from '../../modules/DeleteHeater';

const mapStateToProps = (state) => ({
  isBusyInstallerInfo: state.InstallerInfoReducer.isBusy,
  responseInstallerInfo: state.InstallerInfoReducer,

  isBusyWarrantyRegister: state.WarrantyRegisterReducer.isBusy,
  responseWarrantyRegister: state.WarrantyRegisterReducer,

  isBusyEditHeater: state.EditHeaterReducer.isBusy,
  responseEditHeater: state.EditHeaterReducer,

  isBusyDeleteHeater: state.DeleteHeaterReducer.isBusy,
  responseDeleteHeater: state.DeleteHeaterReducer,

  isBusyMetadata: state.metadataReducer.isBusy,
  responseMetadata: state.metadataReducer,

});

export default connect(
  mapStateToProps,
  (dispatch) => ({
    getInstallerInfo: bindActionCreators(getInstallerInfo, dispatch),
    warrantyRegister: bindActionCreators(warrantyRegister, dispatch),
    EditHeater: bindActionCreators(EditHeater, dispatch),
    getMetadata: bindActionCreators(getMetadata, dispatch),
    DeleteHeater: bindActionCreators(DeleteHeater, dispatch),

  })
)(EditHeaterDetailsScreen);
