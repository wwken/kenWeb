import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer stylelamas">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <section>
                  <div className="heading">
                    <h4 className="title">Newsletter</h4>
                  </div>
                  <p>
                    Keep up on our always evolving product features and
                    technology. Enter your e-mail and subscribe to our
                    newsletter.
                  </p>

                  <div className="clearfix">
                    <div className="input-group">
                      <input
                        className="form-control"
                        placeholder="Email Address"
                        name="newsletterEmail"
                        id="newsletterEmail"
                        type="text"
                      />
                      <div className="btn-in-footer">
                        <a
                          href="login.html"
                          className="btn btn-primary btn-primary-new"
                          style={{ 'margin-left': '10px' }}
                        >
                          ADD ME
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="clearfix social-wrap mt-25">
                    <ul className="list-inline">
                      <li>
                        <a
                          href="http://twitter.com/"
                          className="asc_twitter clearfix"
                        >
                          <span className="social-icon">
                            <i className="ion-social-twitter" />
                          </span>
                          <div className="meta clearfix">
                            <strong className="asc_count">Follow</strong>
                            <div className="name">on Twitter</div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://facebook.com/"
                          className="asc_facebook clearfix"
                        >
                          <span className="social-icon">
                            <i className="ion-social-facebook" />
                          </span>
                          <div className="meta clearfix">
                            <strong className="asc_count">Follow</strong>
                            <div className="name">on Facebook</div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              <div className="col-md-1"> </div>
              <div className="col-md-2 col-sm-6">
                <section>
                  <div className="heading">
                    <h4 className="title">Company</h4>
                  </div>
                  <ul className="list-unstyled">
                    <li>
                      {' '}
                      <a href="index.html">FAQ & Terms</a>{' '}
                    </li>
                    <li>
                      {' '}
                      <a href="custom-fonts/index.html">About Company</a>{' '}
                    </li>
                    <li>
                      {' '}
                      <a href="index.html">Terms of Service</a>{' '}
                    </li>
                    <li>
                      {' '}
                      <a href="index.html">Track Order</a>{' '}
                    </li>
                    <li>
                      {' '}
                      <a href="custom-fonts/index.html">Delivery</a>{' '}
                    </li>
                    <li>
                      {' '}
                      <a href="index.html">Privacy Policy</a>{' '}
                    </li>
                    <li>
                      {' '}
                      <a href="index.html">Jobs</a>{' '}
                      <span className="label label-default o-8">2</span>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="col-md-2 col-sm-6">
                <section>
                  <div className="heading">
                    <h4 className="title">Usefull Links</h4>
                  </div>
                  <ul className="list-unstyled">
                    <li>
                      {' '}
                      <a href="contact/index.html">Knowledge Base</a>{' '}
                    </li>
                    <li>
                      {' '}
                      <a href="custom-fonts/index.html">
                        Tracking & Reports
                      </a>{' '}
                    </li>
                    <li>
                      {' '}
                      <a href="index.html">Contact Express</a>{' '}
                    </li>
                    <li>
                      {' '}
                      <a href="responsive-image/index.html">Conditions</a>{' '}
                    </li>
                    <li>
                      {' '}
                      <a href="contact/index.html">Privacy Policy</a>{' '}
                    </li>
                    <li>
                      {' '}
                      <a href="index.html">Documentation</a>{' '}
                    </li>
                    <li>
                      {' '}
                      <a href="custom-fonts/index.html">All Features</a>{' '}
                    </li>
                  </ul>
                </section>
              </div>

              <div className="col-md-3">
                <section>
                  <div className="heading">
                    <h4 className="title">Contact Us</h4>
                  </div>

                  <div className="map-img">
                    <address>
                      <i className="ion-ios-location" />{' '}
                      <strong> Address</strong>
                      <br />
                      795 Folsom Ave, Suite 600 San Francisco, CA 94107<br />
                    </address>
                    <abbr title="Phone Number">
                      <strong>Phone:</strong>
                    </abbr>{' '}
                    (91) 8547 632521<br />
                    <abbr title="Fax">
                      <strong>Fax:</strong>
                    </abbr>{' '}
                    (91) 11 4752 1433<br />
                    <abbr title="Email Address">
                      <strong>Email:</strong>
                    </abbr>{' '}
                    info@express.com
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <ul className="list-inline fs-13 mb-none">
                  <li>
                    <p className="mb-0 fw-6">© 2018 WuahGe.com</p>
                  </li>
                  <li>
                    <a href="pages-about.html">About</a>
                  </li>
                  <li>
                    <a href="blog-grid.html">Blog</a>
                  </li>
                  <li>
                    <a href="pages-contact.html">Contact</a>
                  </li>
                  <li>
                    <a href="#">Terms</a>
                  </li>
                  <li>
                    <a href="#">Jobs</a>
                  </li>
                  <li>
                    <a href="#">Sitemap</a>
                  </li>
                  <li>
                    <a href="#">Public Policy</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6">
                <ul className="footer-socials list-inline pull-right mb-none">
                  <li>
                    <a
                      href="#"
                      className="tooltips"
                      data-placement="top"
                      data-rel="tooltip"
                      data-original-title="Twitter"
                    >
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="tooltips"
                      data-placement="top"
                      data-rel="tooltip"
                      data-original-title="Facebook"
                    >
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="tooltips"
                      data-placement="top"
                      data-rel="tooltip"
                      data-original-title="Google+"
                    >
                      <i className="fa fa-google-plus" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="tooltips"
                      data-placement="top"
                      data-rel="tooltip"
                      data-original-title="Linkedin"
                    >
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="tooltips"
                      data-placement="top"
                      data-rel="tooltip"
                      data-original-title="Linkedin"
                    >
                      <i className="fa fa-tumblr" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export { Footer };
