import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddHeaterLoginScreen from './AddHeaterLogin';
import { getMetadata } from '../../modules/MetaData';

// import { NavigationActions } from 'react-navigation';

const mapStateToProps = (state) => ({
  isBusyMetadata: state.metadataReducer.isBusy,
  responseMetadata: state.metadataReducer,

});

export default connect(
  mapStateToProps,
  (dispatch) => ({
    getMetadata: bindActionCreators(getMetadata, dispatch),

  })
)(AddHeaterLoginScreen);
