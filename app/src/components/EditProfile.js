import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

import './font-awesome.min.css';
import './bootstrap.min.css';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 ">
            <p>
              <a href="/">Go Back</a>
            </p>
            <form className="form-horizontal">
              <fieldset>
                <legend>User profile form requirement</legend>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Name (Full name)"
                  >
                    Name (Full name)
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-user" />
                      </div>
                      <input
                        id="Name (Full name)"
                        name="Name (Full name)"
                        type="text"
                        placeholder="Name (Full name)"
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Upload photo"
                  >
                    Upload photo
                  </label>
                  <div className="col-md-4">
                    <input
                      id="Upload photo"
                      name="Upload photo"
                      className="input-file"
                      type="file"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Date Of Birth"
                  >
                    Date Of Birth
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-birthday-cake" />
                      </div>
                      <input
                        id="Date Of Birth"
                        name="Date Of Birth"
                        type="text"
                        placeholder="Date Of Birth"
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="Father">
                    Father's name
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-male" />
                      </div>
                      <input
                        id="Father"
                        name="Father"
                        type="text"
                        placeholder="Father's name"
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="Mother">
                    Mother's Name
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-female" />
                      </div>
                      <input
                        id="Mother"
                        name="Mother"
                        type="text"
                        placeholder="Mother's Name"
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="Gender">
                    Gender
                  </label>
                  <div className="col-md-4">
                    <label className="radio-inline" htmlFor="Gender-0">
                      <input
                        type="radio"
                        name="Gender"
                        id="Gender-0"
                        value="1"
                        defaultChecked="checked"
                      />
                      Male
                    </label>
                    <label className="radio-inline" htmlFor="Gender-1">
                      <input
                        type="radio"
                        name="Gender"
                        id="Gender-1"
                        value="2"
                      />
                      Female
                    </label>
                    <label className="radio-inline" htmlFor="Gender-2">
                      <input
                        type="radio"
                        name="Gender"
                        id="Gender-2"
                        value="3"
                      />
                      Other
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="radios">
                    Marital Status:
                  </label>
                  <div className="col-md-4">
                    <label className="radio-inline" htmlFor="radios-0">
                      <input
                        type="radio"
                        name="radios"
                        id="radios-0"
                        value="1"
                        defaultChecked="checked"
                      />
                      Married
                    </label>
                    <label className="radio-inline" htmlFor="radios-1">
                      <input
                        type="radio"
                        name="radios"
                        id="radios-1"
                        value="2"
                      />
                      Unmarried
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label col-xs-12"
                    htmlFor="Permanent Address"
                  >
                    Permanent Address
                  </label>
                  <div className="col-md-2  col-xs-4">
                    <input
                      id="Permanent Address"
                      name="Permanent Address"
                      type="text"
                      placeholder="District"
                      className="form-control input-md "
                    />
                  </div>

                  <div className="col-md-2 col-xs-4">
                    <input
                      id="Permanent Address"
                      name="Permanent Address"
                      type="text"
                      placeholder="Area"
                      className="form-control input-md "
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Permanent Address"
                  />
                  <div className="col-md-2  col-xs-4">
                    <input
                      id="Permanent Address"
                      name="Permanent Address"
                      type="text"
                      placeholder="Street"
                      className="form-control input-md "
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label col-xs-12"
                    htmlFor="Temporary Address"
                  >
                    Temporary Address
                  </label>
                  <div className="col-md-2  col-xs-4">
                    <input
                      id="Temporary Address"
                      name="Temporary Address"
                      type="text"
                      placeholder="District"
                      className="form-control input-md "
                    />
                  </div>

                  <div className="col-md-2 col-xs-4">
                    <input
                      id="Temporary Address"
                      name="Temporary Address"
                      type="text"
                      placeholder="Area"
                      className="form-control input-md "
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Temporary Address"
                  />
                  <div className="col-md-2  col-xs-4">
                    <input
                      id="Temporary Address"
                      name="Temporary Address"
                      type="text"
                      placeholder="Street"
                      className="form-control input-md "
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Primary Occupation"
                  >
                    Primary Occupation
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-briefcase" />
                      </div>
                      <input
                        id="Primary Occupation"
                        name="Primary Occupation"
                        type="text"
                        placeholder="Primary Occupation"
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Secondary Occupation (if any)"
                  >
                    Secondary Occupation (if any)
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-briefcase" />
                      </div>
                      <input
                        id="Secondary Occupation (if any)"
                        name="Secondary Occupation (if any)"
                        type="text"
                        placeholder="Secondary Occupation (if any)"
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-4 control-label" htmlFor="Skills">
                    Skills
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-graduation-cap" />
                      </div>
                      <input
                        id="Skills"
                        name="Skills"
                        type="text"
                        placeholder="Skills"
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Phone number "
                  >
                    Phone number{' '}
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-phone" />
                      </div>
                      <input
                        id="Phone number "
                        name="Phone number "
                        type="text"
                        placeholder="Primary Phone number "
                        className="form-control input-md"
                      />
                    </div>
                    <div className="input-group othertop">
                      <div className="input-group-addon">
                        <i className="fa fa-mobile fa-1x" />
                      </div>
                      <input
                        id="Phone number "
                        name="Secondary Phone number "
                        type="text"
                        placeholder=" Secondary Phone number "
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Email Address"
                  >
                    Email Address
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-envelope-o" />
                      </div>
                      <input
                        id="Email Address"
                        name="Email Address"
                        type="text"
                        placeholder="Email Address"
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Availability time"
                  >
                    Availability time
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-clock-o" />
                      </div>
                      <input
                        id="Availability time"
                        name="Availability time"
                        type="text"
                        placeholder="Availability time"
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Available Service Area"
                  >
                    Available Service Area
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-street-view" />
                      </div>
                      <input
                        id="Available Service Area"
                        name="Available Service Area"
                        type="text"
                        placeholder="Available Service Area"
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Citizenship No."
                  >
                    Citizenship No.
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-sticky-note-o" />
                      </div>
                      <input
                        id="Citizenship No."
                        name="Citizenship No."
                        type="text"
                        placeholder="Citizenship No."
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Languages Known"
                  >
                    Languages Known
                  </label>
                  <div className="col-md-4">
                    <div className="checkbox">
                      <label htmlFor="Languages Known-0">
                        <input
                          type="checkbox"
                          name="Languages Known"
                          id="Languages Known-0"
                          value="1"
                        />
                        Nepali
                      </label>
                    </div>
                    <div className="checkbox">
                      <label htmlFor="Languages Known-1">
                        <input
                          type="checkbox"
                          name="Languages Known"
                          id="Languages Known-1"
                          value="2"
                        />
                        Newari
                      </label>
                    </div>
                    <div className="checkbox">
                      <label htmlFor="Languages Known-2">
                        <input
                          type="checkbox"
                          name="Languages Known"
                          id="Languages Known-2"
                          value="3"
                        />
                        English
                      </label>
                    </div>
                    <div className="checkbox">
                      <label htmlFor="Languages Known-3">
                        <input
                          type="checkbox"
                          name="Languages Known"
                          id="Languages Known-3"
                          value="4"
                        />
                        Hindi
                      </label>
                    </div>

                    <div className="othertop">
                      <label htmlFor="Languages Known-4" />

                      <input
                        type="input"
                        name="LanguagesKnown"
                        id="Languages Known-4"
                        placeholder="Other Language"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="License No."
                  >
                    License No.
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-sticky-note-o" />
                      </div>
                      <input
                        id="License No."
                        name="License No."
                        type="text"
                        placeholder="License No."
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Owns Vehicle"
                  >
                    Owns Vehicle?
                  </label>
                  <div className="col-md-4">
                    <div className="checkbox">
                      <label htmlFor="Owns Vehicle-0">
                        <input
                          type="checkbox"
                          name="Owns Vehicle"
                          id="Owns Vehicle-0"
                          value="1"
                        />
                        4 wheeler
                      </label>
                    </div>
                    <div className="checkbox">
                      <label htmlFor="Owns Vehicle-1">
                        <input
                          type="checkbox"
                          name="Owns Vehicle"
                          id="Owns Vehicle-1"
                          value="2"
                        />
                        Bike
                      </label>
                    </div>
                    <div className="checkbox">
                      <label htmlFor="Owns Vehicle-2">
                        <input
                          type="checkbox"
                          name="Owns Vehicle"
                          id="Owns Vehicle-2"
                          value="3"
                        />
                        Bicycle
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Working Experience (time period)"
                  >
                    Working Experience (time period)
                  </label>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-addon">
                        <i className="fa fa-clock-o" />
                      </div>
                      <input
                        id="Working Experience (time period)"
                        name="Working Experience"
                        type="text"
                        placeholder="Enter time period "
                        className="form-control input-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="col-md-4 control-label"
                    htmlFor="Overview (max 200 words)"
                  >
                    Overview (max 200 words)
                  </label>
                  <div className="col-md-4">
                    <textarea
                      className="form-control"
                      rows="10"
                      id="Overview (max 200 words)"
                      name="Overview (max 200 words)"
                    >
                      Overview
                    </textarea>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-md-4 control-label" />
                  <div className="col-md-4">
                    <a href="#" className="btn btn-success">
                      <span className="glyphicon glyphicon-thumbs-up" /> Submit
                    </a>
                    <a href="#" className="btn btn-danger" value="">
                      <span className="glyphicon glyphicon-remove-sign" /> Clear
                    </a>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="col-md-2 hidden-xs">
            <img
              src="http://websamplenow.com/30/userprofile/images/avatar.jpg"
              className="img-responsive img-thumbnail "
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}

const connectedRegisterPage = connect(mapStateToProps)(EditProfile);
export { connectedRegisterPage as EditProfile };
