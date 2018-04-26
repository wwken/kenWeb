import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';
import { Page } from './../utils/render';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.username && user.password) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    const c = (
      <section className="section-big section-primary-login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-2">
              <div className="smart-wrap">
                <div className="smart-forms smart-container wrap-3">
                  <div className="form-header header-primary">
                    <h4>
                      <i className="fa fa-pencil-square" />Registration form
                    </h4>
                  </div>

                  <form method="post" action="/" id="account2">
                    <div className="form-body">
                      <div className="spacer-b30">
                        <div className="tagline">
                          <span>Set up your account </span>
                        </div>
                      </div>

                      <div className="frm-row">
                        <div className="section colm colm6">
                          <label className="field prepend-icon">
                            <input
                              type="text"
                              name="firstname"
                              id="firstname"
                              className="gui-input"
                              placeholder="First name..."
                            />
                            <span className="field-icon">
                              <i className="fa fa-user" />
                            </span>
                          </label>
                        </div>

                        <div className="section colm colm6">
                          <label className="field prepend-icon">
                            <input
                              type="text"
                              name="lastname"
                              id="lastname"
                              className="gui-input"
                              placeholder="Last name..."
                            />
                            <span className="field-icon">
                              <i className="fa fa-user" />
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="section">
                        <label className="field prepend-icon">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="gui-input"
                            placeholder="Email address"
                          />
                          <span className="field-icon">
                            <i className="fa fa-envelope" />
                          </span>
                        </label>
                      </div>

                      <div className="section">
                        <div className="smart-widget sm-right smr-120">
                          <label className="field prepend-icon">
                            <input
                              type="text"
                              name="username"
                              id="username"
                              className="gui-input"
                              placeholder="Choose your username"
                            />
                            <span className="field-icon">
                              <i className="fa fa-user" />
                            </span>
                          </label>
                          <label htmlFor="username" className="button">
                            .envato.com
                          </label>
                        </div>
                      </div>

                      <div className="section">
                        <label className="field prepend-icon">
                          <input
                            type="text"
                            name="password"
                            id="password"
                            className="gui-input"
                            placeholder="Create a password"
                          />
                          <span className="field-icon">
                            <i className="fa fa-lock" />
                          </span>
                        </label>
                      </div>

                      <div className="section">
                        <label className="field prepend-icon">
                          <input
                            type="text"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="gui-input"
                            placeholder="Retype your password"
                          />
                          <span className="field-icon">
                            <i className="fa fa-unlock-alt" />
                          </span>
                        </label>
                      </div>

                      <div className="spacer-t40 spacer-b30">
                        <div className="tagline">
                          <span> 7 days free trial </span>
                        </div>
                      </div>

                      <div className="section">
                        <label className="option block">
                          <input type="checkbox" name="trial" />
                          <span className="checkbox" />
                          Sign me up for a{' '}
                          <a href="#" className="smart-link">
                            {' '}
                            7-day free PRO trial.{' '}
                          </a>
                        </label>
                        <label className="option block spacer-t10">
                          <input type="checkbox" name="terms" />
                          <span className="checkbox" />
                          I agree to the{' '}
                          <a href="#" className="smart-link">
                            {' '}
                            terms of use.{' '}
                          </a>
                        </label>
                      </div>
                    </div>
                    <div className="form-footer">
                      <button type="submit" className="button btn-primary">
                        I Accept - Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
    return <Page component={c} pageClassName={'body-sign'} />;
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering,
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
