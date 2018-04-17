import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';
import { Header } from './shared/Header';
import { Footer } from './shared/Footer';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className="wrapper">
        <Header />
        <div className="page body-sign">
          <div className="page-inner p-none no-border">
            <section className="section-big section-primary-login">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 offset-2">
                    <div className="smart-wrap">
                      <div className="smart-forms smart-container wrap-2">
                        <div className="form-header header-primary">
                          <h4>
                            <i className="fa fa-sign-in" />Login
                          </h4>
                        </div>

                        <form method="post" action="/" id="contact">
                          <div className="form-body">
                            <div className="frm-row">
                              <div className="colm colm6 pad-r30 bdr">
                                <div className="spacer-b30">
                                  <div className="tagline">
                                    <span>Sign in With </span>
                                  </div>
                                </div>

                                <div className="section">
                                  <a
                                    href="#"
                                    className="button btn-social facebook span-left block"
                                  >
                                    <span>
                                      <i className="fa fa-facebook" />
                                    </span>{' '}
                                    Facebook
                                  </a>

                                  <a
                                    href="#"
                                    className="button btn-social twitter span-left block"
                                  >
                                    <span>
                                      <i className="fa fa-twitter" />
                                    </span>{' '}
                                    Twitter
                                  </a>

                                  <a
                                    href="#"
                                    className="button btn-social googleplus span-left block"
                                  >
                                    <span>
                                      <i className="fa fa-google-plus" />
                                    </span>{' '}
                                    Google+
                                  </a>
                                </div>
                              </div>

                              <div className="colm colm6 pad-l30">
                                <div className="spacer-b30">
                                  <div className="tagline">
                                    <span> OR Login </span>
                                  </div>
                                </div>

                                <div className="section">
                                  <label className="field prepend-icon">
                                    <input
                                      type="text"
                                      name="username"
                                      id="username"
                                      className="gui-input"
                                      placeholder="Enter username"
                                    />
                                    <span className="field-icon">
                                      <i className="fa fa-user" />
                                    </span>
                                  </label>
                                </div>

                                <div className="section">
                                  <label className="field prepend-icon">
                                    <input
                                      type="text"
                                      name="password"
                                      id="password"
                                      className="gui-input"
                                      placeholder="Enter password"
                                    />
                                    <span className="field-icon">
                                      <i className="fa fa-lock" />
                                    </span>
                                  </label>
                                </div>

                                <div className="section">
                                  <label className="switch block">
                                    <input
                                      type="checkbox"
                                      name="remember"
                                      id="remember"
                                      defaultChecked={true}
                                    />
                                    <span
                                      className="switch-label"
                                      data-on="YES"
                                      data-off="NO"
                                    />
                                    <span> Remember me</span>
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="frm-row">
                              <div className="section">
                                <p className="text-right pull-top-small margin-top-20">
                                  Don't have an account yet?{' '}
                                  <a className="v-link" href="register.html">
                                    Sign Up!
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="form-footer">
                            <button
                              type="submit"
                              className="button btn-primary"
                            >
                              Sign in
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
