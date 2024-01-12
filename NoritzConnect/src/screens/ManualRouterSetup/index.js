import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ManualRouterSetupScreen from './ManualRouterSetup';
import { getInitialdata } from '../../modules/GetInitial';
import { saveHeater } from '../../modules/SaveHeater';
import { getMetadata } from '../../modules/MetaData';

const mapStateToProps = (state) => ({
  isBusyGetInitial: state.GetInitialReducer.isBusy,
  responseGetInitial: state.GetInitialReducer,

  isBusySaveHeater: state.SaveHeaterReducer.isBusy,
  responseSaveHeater: state.SaveHeaterReducer,

  isBusyMetadata: state.metadataReducer.isBusy,
  responseMetadata: state.metadataReducer,

});

export default connect(
  mapStateToProps,
  (dispatch) => ({
    getInitialdata: bindActionCreators(getInitialdata, dispatch),
    saveHeater: bindActionCreators(saveHeater, dispatch),
    getMetadata: bindActionCreators(getMetadata, dispatch),
  })
)(ManualRouterSetupScreen);
