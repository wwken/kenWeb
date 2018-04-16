import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isNil, bindAll } from 'lodash';
import { userActions } from '../actions';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, ['logout', 'editProfile']);
  }

  componentDidMount() {
    this.props.getAll();
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }

  getUserName() {
    const { user } = this.props;
    let n = '';
    if (!isNil(user)) {
      n = user.first_name;
    }
    return n;
  }

  logout() {
    this.props.logout();
  }

  editProfile() {
    this.props.editProfile();
  }

  render() {
    const userName = this.getUserName();
    return <div className="col-md-6 col-md-offset-3">index</div>;
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const user = isNil(users.toJS().user)
    ? authentication.toJS().user
    : users.toJS().user;
  return {
    user,
  };
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAll: () => {
      dispatch(userActions.getAll());
    },
    logout: () => {
      dispatch(userActions.logout());
    },
    editProfile: () => {
      dispatch(userActions.editProfile());
    },
  };
};

const connectedIndexPage = connect(mapStateToProps, mapDispatchToProps)(
  IndexPage
);
export { connectedIndexPage as IndexPage };
