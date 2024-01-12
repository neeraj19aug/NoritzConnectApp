import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EnterModelNumberScreen from './EnterModelNumber';
import { validateHeater } from '../../modules/ValidateHeater';

const mapStateToProps = (state) => ({
  isBusyValidateHeater: state.ValidateHeaterReducer.isBusy,
  responseValidateHeater: state.ValidateHeaterReducer,

});

export default connect(
  mapStateToProps,
  (dispatch) => ({
    validateHeater: bindActionCreators(validateHeater, dispatch),

  })
)(EnterModelNumberScreen);
