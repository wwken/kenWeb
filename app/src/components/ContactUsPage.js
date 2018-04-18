import React from 'react';
import { Page, addJSscript } from './../utils/render';
import './main.css';

import { getImageURL } from '../utils/render';

class ContactUsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // addJSscript('vendor/jquery.gmap/map-styles.js')
    // addJSscript(
    //   'https://maps.googleapis.com/maps/api/js?key=AIzaSyBIy24644w-ZBEOCfMfzYPYeULbuKJg_rs'
    // )
    // addJSscript('vendor/jquery.gmap/jquery.gmap.min.js')
  }

  render() {
    const pageClassName = 'has-sidebar has-right-sidebar bordered';
    const content = (
      <div>
        <section className="section-primary p-none">
          <div
            className="xgoogle-map"
            data-map-type="roadmap"
            data-map-zoom="14"
            data-map-style="base"
            data-map-address="180 Madison Ave New York, NY 10016"
            style={{ height: '400px' }}
          />
        </section>

        <div className="page-inner pt-none">
          <div className="container">
            <div className="row">
              <div className="col-md-9 left-side-sidebar">
                <div className="v-heading-v2">
                  <h3>Welcome To WuahGe.com</h3>
                </div>

                <p className="mb-60">
                  Feel free to contact us regarding to any question/concern you
                  might have using the below form. We promise we will respond
                  within one business day. Thanks and have a nice day!
                </p>

                <form action="#" method="post">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-4">
                        <label>
                          Your name <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          value=""
                          maxLength="100"
                          className="form-control"
                          name="name"
                          id="name"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label>
                          Your email address <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          value=""
                          maxLength="100"
                          className="form-control"
                          name="email"
                          id="email1"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label>Website</label>
                        <input
                          type="text"
                          value=""
                          maxLength="100"
                          className="form-control"
                          name="website"
                          id="website"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-12">
                        <label>
                          Comment <span className="required">*</span>
                        </label>
                        <textarea
                          maxLength="5000"
                          rows="10"
                          className="form-control"
                          name="comment"
                          id="Textarea1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <br />
                      <button
                        name="submit"
                        type="submit"
                        id="sendmesage"
                        className="btn btn-primary btn-md"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>

                <hr className="invisible" />
              </div>

              <div className="col-md-3 right-side-sidebar">
                <aside className="sidebar">
                  <div className="v-heading-v2">
                    <h3 className="fs-18">Phone & Email</h3>
                  </div>
                  <p>
                    Email:{' '}
                    <a href="#" target="_blank">
                      info@wuahge.com
                    </a>
                    <br />
                    Phone: +1 (347) 993-8421<br />
                    WhatsApp: +1 (347) 993-8421<br />
                    WeChat: wwken926<br />
                  </p>

                  <hr className="invisible" />

                  <div className="v-heading-v2">
                    <h3 className="fs-18">Business Hours</h3>
                  </div>
                  <p>
                    Mon - Fri: 9am to 6pm<br />
                    Sat: 10am to 2pm
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <Page
        component={content}
        pageClassName={pageClassName}
        headerActiveTab={'about'}
      />
    );
  }
}

export { ContactUsPage };
