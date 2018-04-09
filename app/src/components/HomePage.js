import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isNil } from 'lodash';
import { userActions } from '../actions';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(userActions.getAll());
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

  render() {
    const userName = this.getUserName();
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {userName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All registered users:</h3>
        <p>
          <Link to="/login">Logout</Link>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
