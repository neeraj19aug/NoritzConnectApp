import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTimeZone} from '../../modules/getTimeZone';
import {setTimeZone} from '../../modules/SetTimeZone';

import TimeZoneScreen from './TimeZone';

const mapStateToProps = state => ({
  isBusyGetTimeZone: state.getTimeZoneReducer.isBusy,
  responseGetTimeZone: state.getTimeZoneReducer,

  isBusySetTimeZone: state.setTimeZoneReducer.isBusy,
  responseSetTimeZone: state.setTimeZoneReducer,
});

export default connect(mapStateToProps, dispatch => ({
  getTimeZone: bindActionCreators(getTimeZone, dispatch),
  setTimeZone: bindActionCreators(setTimeZone, dispatch),
}))(TimeZoneScreen);
