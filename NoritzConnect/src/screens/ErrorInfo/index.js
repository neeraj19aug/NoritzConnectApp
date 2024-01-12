import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ErrorInfoScreen from './ErrorInfo';
import { getErrorInfo } from '../../modules/GetErrorInfo';

const mapStateToProps = (state) => ({
  isBusyErrorInfo: state.ErrorInfoReducer.isBusy,
  responseErrorInfo: state.ErrorInfoReducer,

});

export default connect(
  mapStateToProps,
  (dispatch) => ({
    getErrorInfo: bindActionCreators(getErrorInfo, dispatch),

  })
)(ErrorInfoScreen);
