import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoginPage } from './components/LoginPage';
import * as SocialActions from './actions/social';
import { alertActions } from './actions';
import { HomePage } from './components/HomePage';
import { IndexPage } from './components/IndexPage';
import { EditProfile } from './components/EditProfile';
import { RegisterPage } from './components/RegisterPage';
import { ContactUsPage } from './components/ContactUsPage';
import { AboutUsPage } from './components/AboutUsPage';
import { ServicesPage } from './components/ServicesPage';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import logo from './logo.svg';
import './App.css';
const history = createHistory();

const user = localStorage.getItem('user');

console.log('In App.js, user: ', user);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )}
  />
);

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
      <Router history={history}>
        <div className={'dewRouter'}>
          <Switch>
            <PrivateRoute exact path="/home" component={HomePage} />
            <Route path="/login.html" component={LoginPage} />
            <Route path="/register.html" component={RegisterPage} />
            <Route path="/contact_us.html" component={ContactUsPage} />
            <Route path="/about_us.html" component={AboutUsPage} />
            <Route path="/services.html" component={ServicesPage} />
            <Route path="/editProfile" component={EditProfile} />
            <Route path="/" component={IndexPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SocialActions, dispatch);
}

// export default connect(mapStateToProps, mapDispatchToProps)(BuyerMain)
// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
