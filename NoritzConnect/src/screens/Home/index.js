import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HomeScreen from './Home';
import {getMetadata} from '../../modules/MetaData';
import {getConfigdata} from '../../modules/GetConfig';
import {getCurrentTemperature} from '../../modules/GetCurrentTemp';
import {heateronoff} from '../../modules/HeaterOnOff';
import {changeHeater} from '../../modules/ChangeHeater';
import {getStatusData} from '../../modules/StatusData';
import {getEventData} from '../../modules/EventData';
import {ChangeTemperature} from '../../modules/ChangeTemperature';
import {recirculationpower} from '../../modules/RecirculationPowerOnOff';
import {ondemandpower} from '../../modules/OndemandPowerOnOff';
import {getInstantInfo} from '../../modules/GetInstantInfo';
import {setInstantReserve} from '../../modules/RequestInstantReserve';
import {getRecircData} from '../../modules/GetRecirculationData';
import {getMaintainenceData} from '../../modules/CallMaintainence';

// import { NavigationActions } from 'react-navigation';
//GetRecirculationDataReducer

const mapStateToProps = (state) => ({
  isBusyMetadata: state.metadataReducer.isBusy,
  responseMetadata: state.metadataReducer,

  isBusyGetConfig: state.GetConfigReducer.isBusy,
  responseGetConfig: state.GetConfigReducer,

  isBusyGetCUrrentTemp: state.CurrentTemperatureReducer.isBusy,
  responseGetCUrrentTemp: state.CurrentTemperatureReducer,

  isBusyHeaterOnOff: state.HeaterOnOffReducer.isBusy,
  responseHeaterOnOff: state.HeaterOnOffReducer,

  isBusyChangeHeater: state.ChangeHeaterReducer.isBusy,
  responseChangeHeater: state.ChangeHeaterReducer,

  isBusyStatusData: state.StatusDataReducer.isBusy,
  responseStatusData: state.StatusDataReducer,

  isBusyMaintainenceData: state.MaintainenceReducer.isBusy,
  responseMaintainenceData: state.MaintainenceReducer,

  isBusyEventData: state.EventDataReducer.isBusy,
  responseEventData: state.EventDataReducer,

  isBusyChangeTemperature: state.ChangeTemperatureReducer.isBusy,
  responseChangeTemperature: state.ChangeTemperatureReducer,

  isBusyRecirculationPower: state.RecirculationPowerOnOffReducer.isBusy,
  responseRecirculationPower: state.RecirculationPowerOnOffReducer,

  isBusyOndemandPower: state.OndemandPowerReducer.isBusy,
  responseOndemandPower: state.OndemandPowerReducer,

  isBusyGetInstantInfo: state.GetInstantInfoReducer.isBusy,
  responseGetInstantInfo: state.GetInstantInfoReducer,

  isBusyInstantReserve: state.InstantReserveReducer.isBusy,
  responseInstantReserve: state.InstantReserveReducer,

  isBusyGetRecirculationData: state.GetRecirculationDataReducer.isBusy,
  responseGetRecirculationData: state.GetRecirculationDataReducer,
});

export default connect(mapStateToProps, (dispatch) => ({
  getMetadata: bindActionCreators(getMetadata, dispatch),
  getConfigdata: bindActionCreators(getConfigdata, dispatch),
  getCurrentTemperature: bindActionCreators(getCurrentTemperature, dispatch),
  heateronoff: bindActionCreators(heateronoff, dispatch),
  changeHeater: bindActionCreators(changeHeater, dispatch),
  getStatusData: bindActionCreators(getStatusData, dispatch),
  getEventData: bindActionCreators(getEventData, dispatch),
  recirculationpower: bindActionCreators(recirculationpower, dispatch),
  ondemandpower: bindActionCreators(ondemandpower, dispatch),
  getInstantInfo: bindActionCreators(getInstantInfo, dispatch),
  setInstantReserve: bindActionCreators(setInstantReserve, dispatch),
  getRecircData: bindActionCreators(getRecircData, dispatch),
  getMaintainenceData: bindActionCreators(getMaintainenceData, dispatch),
  ChangeTemperature: bindActionCreators(ChangeTemperature, dispatch),
}))(HomeScreen);
