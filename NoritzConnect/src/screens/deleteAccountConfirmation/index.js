import DeleteAccountConfirmation from './DeleteAccountConfirmation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteUser} from '../../modules/DeleteUser';

const mapStateToProps = (state) => ({
  userInfo: state.loginReducer.response,
});

export default connect(mapStateToProps, (dispatch) => ({
  deleteUser: bindActionCreators(deleteUser, dispatch),
}))(DeleteAccountConfirmation);
