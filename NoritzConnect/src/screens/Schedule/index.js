import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTimeZone} from '../../modules/getTimeZone';
import {setTimeZone} from '../../modules/SetTimeZone';
import {getInstantInfo} from '../../modules/GetInstantInfo';
import {setInstantReserve} from '../../modules/RequestInstantReserve';

import Schedule from './Schedule';

const mapStateToProps = (state) => ({
  isBusyGetTimeZone: state.getTimeZoneReducer.isBusy,
  responseGetTimeZone: state.getTimeZoneReducer,

  isBusySetTimeZone: state.setTimeZoneReducer.isBusy,
  responseSetTimeZone: state.setTimeZoneReducer,

  isBusyGetInstantInfo: state.GetInstantInfoReducer.isBusy,
  responseGetInstantInfo: state.GetInstantInfoReducer,

  isBusyInstantReserve: state.InstantReserveReducer.isBusy,
  responseInstantReserve: state.InstantReserveReducer,
});

export default connect(mapStateToProps, (dispatch) => ({
  getTimeZone: bindActionCreators(getTimeZone, dispatch),
  setTimeZone: bindActionCreators(setTimeZone, dispatch),
  getInstantInfo: bindActionCreators(getInstantInfo, dispatch),
  setInstantReserve: bindActionCreators(setInstantReserve, dispatch),
}))(Schedule);
