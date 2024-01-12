import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditProfileScreen from './EditProfile';
import { getMetadata } from '../../modules/MetaData';
import { EditProfile } from '../../modules/EditProfile';

const mapStateToProps = (state) => ({
  isBusyMetadata: state.metadataReducer.isBusy,
  responseMetadata: state.metadataReducer,

  isBusyEditProfile: state.EditProfileReducer.isBusy,
  responseEditProfile: state.EditProfileReducer,

});

export default connect(
  mapStateToProps,
  (dispatch) => ({
    getMetadata: bindActionCreators(getMetadata, dispatch),
    EditProfile: bindActionCreators(EditProfile, dispatch),

  })
)(EditProfileScreen);
