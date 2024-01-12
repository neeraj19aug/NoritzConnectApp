// import { createStore, combineReducers, applyMiddleware } from 'redux';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import loginReducer from '../modules/Login';
import registerReducer from '../modules/Register';
import forgotReducer from '../modules/Forgot';
import metadataReducer from '../modules/MetaData';
import GetConfigReducer from '../modules/GetConfig';
import CurrentTemperatureReducer from '../modules/GetCurrentTemp';
import HeaterOnOffReducer from '../modules/HeaterOnOff';
import ChangeHeaterReducer from '../modules/ChangeHeater';
import StatusDataReducer from '../modules/StatusData';
import MaintainenceReducer from '../modules/CallMaintainence';
import EventDataReducer from '../modules/EventData';
import ChangeTemperatureReducer from '../modules/ChangeTemperature';
import ValidateHeaterReducer from '../modules/ValidateHeater';
import InstallerInfoReducer from '../modules/InstallerInfo';
import WarrantyRegisterReducer from '../modules/WarrantyRegister';
import GetInitialReducer from '../modules/GetInitial';
import SaveHeaterReducer from '../modules/SaveHeater';
import changePasswordReducer from '../modules/changePassword';
import EditProfileReducer from '../modules/EditProfile';
import EditHeaterReducer from '../modules/EditHeater';
import DeleteHeaterReducer from '../modules/DeleteHeater';
import ErrorInfoReducer from '../modules/GetErrorInfo';
import getTimeZoneReducer from '../modules/getTimeZone';
import setTimeZoneReducer from '../modules/SetTimeZone';
import RecirculationPowerOnOffReducer from '../modules/RecirculationPowerOnOff';
import OndemandPowerReducer from '../modules/OndemandPowerOnOff';
import GetInstantInfoReducer from '../modules/GetInstantInfo';
import InstantReserveReducer from '../modules/RequestInstantReserve';
import GetRecirculationDataReducer from '../modules/GetRecirculationData';
import deleteReducer from '../modules/DeleteUser';

import middleware from './middleware';

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  forgotReducer,
  metadataReducer,
  GetConfigReducer,
  CurrentTemperatureReducer,
  HeaterOnOffReducer,
  ChangeHeaterReducer,
  StatusDataReducer,
  EventDataReducer,
  ChangeTemperatureReducer,
  ValidateHeaterReducer,
  InstallerInfoReducer,
  WarrantyRegisterReducer,
  GetInitialReducer,
  SaveHeaterReducer,
  changePasswordReducer,
  EditProfileReducer,
  EditHeaterReducer,
  DeleteHeaterReducer,
  ErrorInfoReducer,
  getTimeZoneReducer,
  setTimeZoneReducer,
  RecirculationPowerOnOffReducer,
  OndemandPowerReducer,
  GetInstantInfoReducer,
  InstantReserveReducer,
  GetRecirculationDataReducer,
  MaintainenceReducer,
  deleteReducer,
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
