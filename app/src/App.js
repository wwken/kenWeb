import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { LoginPage } from './components/LoginPage'
import * as SocialActions from './actions/social'
import { alertActions } from './actions'
import { HomePage } from './components/HomePage'
import { RegisterPage } from './components/RegisterPage'
import { Router, Route, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import logo from './logo.svg'
import './App.css'
const history = createHistory()

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
              <div>
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SocialActions, dispatch)
}

// export default connect(mapStateToProps, mapDispatchToProps)(BuyerMain)
// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };