import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isNil, bindAll } from 'lodash';
import { userActions } from '../actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    bindAll(this, ['logout']);
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

  render() {
    const userName = this.getUserName();
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {userName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All registered users:</h3>
        <p>
          <a onClick={this.logout}>Logout</a>
        </p>
      </div>
    );
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
  };
};

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(
  HomePage
);
export { connectedHomePage as HomePage };
