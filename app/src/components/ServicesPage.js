import React from 'react';
import { Page, addJSscript } from './../utils/render';
import './main.css';

import { getImageURL, ServiceFeatureShortBio } from '../utils/render';

class ServicesPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // addJSscript('vendor/dzsparallaxer/dzsparallaxer.js')
    // addJSscript('vendor/dzsparallaxer/dzsscroller/scroller.js')
    // addJSscript('dzsparallaxer/advancedscroller/plugin.js')
  }

  render() {
    const pageClassName = '';
    const content = (
      <div className="services-page-container">
        <section className="dzsparallaxer auto-init height-is-based-on-content use-loading mode-scroll loaded dzsprx-readyall">
          <div className="divimage dzsparallaxer--target w-100 section-primary-services" />

          <div className="container pt-120 pb-120">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="section-title">
                  Introducing <strong>WuahGe.com</strong> Today. A new way to
                  start an <br />
                  Easy Design Bootstrap Template
                </h1>

                <div className="clearfix pt-xl">
                  <a href="#" className="btn btn-primary mr-md">
                    <i className="fa fa-heart" />{' '}
                    <strong className="text-white">Download Now</strong>
                  </a>
                  <a href="#" className="btn btn-default">
                    <i className="fa fa-heart" /> Purchase<strong> Now</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="section-primary main-color b-bordered">
          <div class="container">
            <div class="row">
              <div class="col-sm-3">
                <ServiceFeatureShortBio
                  getImageURL={'new/n5.jpg'}
                  title={'hello'}
                  description={'hello1'}
                />
              </div>

              <div class="col-sm-3">
                <ServiceFeatureShortBio
                  getImageURL={'new/n2.jpg'}
                  title={'hello'}
                  description={'hello1'}
                />
              </div>
              <div class="col-sm-3">
                <ServiceFeatureShortBio
                  getImageURL={'new/n3.jpg'}
                  title={'hello'}
                  description={'hello1'}
                />
              </div>

              <div class="col-sm-3">
                <ServiceFeatureShortBio
                  getImageURL={'new/n4.jpg'}
                  title={'hello'}
                  description={'hello1'}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section-big main-color">
          <div className="container">
            <div className="row">
              <div className="col-md-12 pb-20 text-center">
                <h2 className="section-title mb-10">
                  <span>
                    {' '}
                    Some <strong className="primary-color">Express</strong> Core
                    Featuress{' '}
                  </span>
                </h2>
                <p className="section-sub-title">
                  We are a passionate digital design agency that specializes in
                  beautiful and easy-to- <br />
                  use digital design &amp; web development services.
                </p>
                <div className="exp-separator center-separator">
                  <div className="exp-separator-inner" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <ul className="i-list medium">
                  <li className="i-list-item">
                    <div className="icon">
                      {' '}
                      <i className="fa fa-desktop" />{' '}
                    </div>

                    <div className="icon-content">
                      <h3 className="title">Fully Responsive Design</h3>
                      <p className="sub-title">
                        Aenean vulputate eleifend tellus. Aenean leo ligula,
                        porttitor eu, consequat vitae, eleifend ac, enim ante,
                        dapibus in.
                      </p>
                    </div>
                    <div className="iconlist-timeline" />
                  </li>
                  <li className="i-list-item">
                    <div className="icon">
                      {' '}
                      <i className="fa fa-code" />{' '}
                    </div>

                    <div className="icon-content">
                      <h3 className="title">Easy & Clean Code</h3>
                      <p>
                        Aenean vulputate tellus. Aenean leo ligula, porttitor
                        eu, consequat vitae, eleifend ac, enim. Aliquam lorem
                        ante, dapibus in.
                      </p>
                    </div>
                    <div className="iconlist-timeline" />
                  </li>
                  <li className="i-list-item">
                    <div className="icon">
                      {' '}
                      <i className="fa fa-paper-plane" />{' '}
                    </div>

                    <div className="icon-content">
                      <h3 className="title">24/7 Customer Support</h3>
                      <p>
                        Aenean vulputate eleifend tellus. Aenean leo ligula,
                        porttitor eu, consequat, eleifend ac, enim lorem ante,
                        dapibus in.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <ul className="i-list medium">
                  <li className="i-list-item">
                    <div className="icon">
                      {' '}
                      <i className="fa fa-diamond" />{' '}
                    </div>
                    <div className="icon-content">
                      <h3 className="title">Endless Possibilites</h3>
                      <p className="sub-title">
                        Aenean vulputate eleifend tellus. Aenean leo ligula,
                        porttitor eu, consequat vitae, eleifend Aliquam lorem
                        ante, dapibus in.
                      </p>
                    </div>
                    <div className="iconlist-timeline" />
                  </li>
                  <li className="i-list-item">
                    <div className="icon">
                      {' '}
                      <i className="fa fa-recycle" />{' '}
                    </div>
                    <div className="icon-content">
                      <h3 className="title">Free Lifetime Updates</h3>
                      <p>
                        Aenean eleifend tellus. Aenean leo ligula, porttitor eu
                        consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                        dapibus in.
                      </p>
                    </div>
                    <div className="iconlist-timeline" />
                  </li>
                  <li className="i-list-item">
                    <div className="icon">
                      {' '}
                      <i className="fa fa-check" />{' '}
                    </div>
                    <div className="icon-content">
                      <h3 className="title">Clean & Modern Design</h3>
                      <p>
                        Aenean vulputate eleifend tellus. Aenean leo ligula,
                        porttitor eu, consequat vitae, eleifend enim lorem ante,
                        dapibus in.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <ul className="i-list medium">
                  <li className="i-list-item">
                    <div className="icon">
                      {' '}
                      <i className="fa fa-codepen" />{' '}
                    </div>
                    <div className="icon-content">
                      <h3 className="title">Useful Shortcodes</h3>
                      <p className="sub-title">
                        Aenean vulputate eleifend tellus. Aenean leo ligula,
                        porttitor eu, consequat vitae, eleifend ac, enim.
                        Aliquam lorem ante.
                      </p>
                    </div>
                    <div className="iconlist-timeline" />
                  </li>
                  <li className="i-list-item">
                    <div className="icon">
                      {' '}
                      <i className="fa fa-newspaper-o" />{' '}
                    </div>
                    <div className="icon-content">
                      <h3 className="title">Multipurpose Concept</h3>
                      <p>
                        Aenean vulputate eleifend tellus ligula, porttitor eu,
                        consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                        dapibus in.
                      </p>
                    </div>
                    <div className="iconlist-timeline" />
                  </li>
                  <li className="i-list-item">
                    <div className="icon">
                      {' '}
                      <i className="fa fa-heart-o" />{' '}
                    </div>
                    <div className="icon-content">
                      <h3 className="title">Crafted With Love</h3>
                      <p>
                        Aenean vulputate eleifend tellus. Aenean leo ligula,
                        porttitor eu, consequat vitae, eleifend ac lorem ante,
                        dapibus in.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div
          id="animated-numbers"
          className="dzsparallaxer auto-init simple-parallax use-loading pt-100 pb-140"
        >
          <div
            className="divimage dzsparallaxer--target "
            data-src={getImageURL('custom/c4.jpg')}
          />
          <div className="semi-black-overlay" />
          <div className="preloader-semicircles" />
          <div className="container">
            <div className="counters counters-text-light">
              <div className="row text-white">
                <div className="col-md-3 col-sm-6">
                  <div className="counter">
                    <strong
                      className="fs-40 text-white"
                      data-to="48.500"
                      data-plugin-options="{&quot;decimals&quot;: 3}"
                    >
                      48.500
                    </strong>{' '}
                    <i className="icon-users fs-40 ml-5" />
                    <span className="text-white">Happy Customer</span>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6">
                  <div className="counter">
                    <strong className="fs-40 text-white" data-to="7500">
                      7500
                    </strong>

                    <span className="text-white">Facebook Likes</span>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6">
                  <div className="counter">
                    <strong
                      className="fs-40 text-white"
                      data-to="105.49"
                      data-plugin-options="{&quot;decimals&quot;: 2}"
                    >
                      105.49
                    </strong>
                    <span className="text-white">Extremely Cheap</span>
                  </div>
                </div>

                <div className="col-md-3 col-sm-6">
                  <div className="counter">
                    <strong
                      className="fs-40 text-white"
                      data-to="105.49"
                      data-plugin-options="{&quot;decimals&quot;: 2}"
                    >
                      105.49
                    </strong>
                    <span className="text-white">Extremely Cheap</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="section-primary main-color">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <table className="clients-wrap v4">
                  <tbody>
                    <tr>
                      <td>
                        <figure>
                          <a
                            className="lite-tooltip"
                            href="#"
                            data-title="Dribbble"
                            data-location="top"
                          >
                            <img src={getImageURL('clients/amcor.png')} />
                          </a>
                        </figure>
                      </td>
                      <td>
                        <figure>
                          <a
                            className="lite-tooltip"
                            href="#"
                            data-title="VmWare"
                            data-location="top"
                          >
                            <img src={getImageURL('clients/audiopro.png')} />
                          </a>
                        </figure>
                      </td>
                      <td>
                        <figure>
                          <a
                            className="lite-tooltip"
                            href="#"
                            data-title="JQuery"
                            data-location="top"
                          >
                            <img src={getImageURL('clients/Infinity.png')} />
                          </a>
                        </figure>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <figure>
                          <a
                            className="lite-tooltip"
                            href="#"
                            data-title="VimeoPRO"
                            data-location="top"
                          >
                            <img src={getImageURL('clients/swann.png')} />
                          </a>
                        </figure>
                      </td>
                      <td>
                        <figure>
                          <a
                            className="lite-tooltip"
                            href="#"
                            data-title="Demond"
                            data-location="top"
                          >
                            <img src={getImageURL('clients/rko.png')} />
                          </a>
                        </figure>
                      </td>
                      <td>
                        <figure>
                          <a
                            className="lite-tooltip"
                            href="#"
                            data-title="Dribbble"
                            data-location="top"
                          >
                            <img src={getImageURL('clients/Sport.png')} />
                          </a>
                        </figure>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <figure>
                          <a
                            className="lite-tooltip"
                            href="#"
                            data-title="JQuery"
                            data-location="top"
                          >
                            <img src={getImageURL('clients/swann.png')} />
                          </a>
                        </figure>
                      </td>
                      <td>
                        <figure>
                          <a href="https://vimeo.com/awards" target="_blank">
                            <img src={getImageURL('clients/audiopro.png')} />
                          </a>
                        </figure>
                      </td>
                      <td>
                        <figure>
                          <a href="https://vimeo.com/awards" target="_blank">
                            <img src={getImageURL('clients/rko.png')} />
                          </a>
                        </figure>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-md-6 pr-xl">
                <h3 className="uppercase fs-18 o-4 ls-1">Express</h3>
                <h2 className="section-title">World Famous Brands</h2>
                <p className=" mt-md">
                  orem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean <br />
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                  nascetur ridiculus mus. commodo ligula eget dolor
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque nascetur ridiculus mus. Lorem ipsum dolor sit amet,
                  adipiscing elit aenean <br />
                  Aenean commodo ligula eget dolor. massa.
                </p>

                <a href="#" className="btn btn-primary mt-md mr-md">
                  <i className="fa fa-info" /> Learn about Express
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-big" style={{ background: '#2f353e' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <img
                  className="img-responsive mt-50"
                  src={getImageURL('custom/world.png')}
                  alt="Express"
                />
              </div>

              <div className="col-md-6">
                <div className="testimonial-five">
                  <div className="carousel-wrap">
                    <div
                      className="owl-carousel"
                      data-plugin-options="{&quot;items&quot;: 2, &quot;singleItem&quot;: true, &quot;autoPlay&quot;: true, &quot;margin&quot;: 35, &quot;dots&quot;: false}"
                    >
                      <div className="item">
                        <div className="testimonial-five testimonial-light">
                          <blockquote className="o-9">
                            <h4 className="fs-20 fw-5">Perfect support!</h4>
                            <p className="lh-26">
                              Lorem ipsum dolor sit amet, consectetuer
                              adipiscing elit, sed diam nonummy nibh euismod
                              tincidunt ut laoreet dolore magna aliquam erat
                              volutpat.
                            </p>
                          </blockquote>

                          <div className="testimonial-author pl-15 clearfix">
                            <div className="testimonial-author-thumbnail">
                              <img
                                className="img-responsive img-circle"
                                src={getImageURL('avatars/a5.jpg')}
                                alt="JOHN SMITH"
                              />
                            </div>
                            <p className="fs-16 text-white">
                              <strong className="text-white fs-18">
                                William Richardson
                              </strong>
                              <span className="text-white o-7 fs-13">
                                Web Developer
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="item">
                        <div className="testimonial-five testimonial-light">
                          <blockquote className="o-9">
                            <h4 className="fs-20 fw-5">Super support!</h4>
                            <p className="lh-26">
                              Lorem ipsum dolor sit amet, consectetuer
                              adipiscing elit, sed diam nonummy nibh euismod
                              tincidunt ut laoreet dolore magna aliquam erat
                              volutpat.
                            </p>
                          </blockquote>

                          <div className="testimonial-author pl-15 clearfix">
                            <div className="testimonial-author-thumbnail">
                              <img
                                className="img-responsive img-circle"
                                src={getImageURL('avatars/a6.jpeg')}
                                alt="JOHN SMITH"
                              />
                            </div>
                            <p className="fs-16 text-white">
                              <strong className="text-white fs-18">
                                Melissa James
                              </strong>
                              <span className="text-white o-7 fs-13">
                                {' '}
                                Manager at Youtube
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="item">
                        <div className="testimonial-five testimonial-light">
                          <blockquote className="o-9">
                            <h4 className="fs-20 fw-5">Awesome Design.</h4>
                            <p className="lh-26">
                              Lorem ipsum dolor sit amet, consectetuer
                              adipiscing elit, sed diam nonummy nibh euismod
                              tincidunt ut laoreet dolore magna aliquam erat
                              volutpat. Ut wisi enim ad elitad Cras non placerat
                              mi.
                            </p>
                          </blockquote>

                          <div className="testimonial-author pl-15 clearfix">
                            <div className="testimonial-author-thumbnail">
                              <img
                                className="img-responsive img-circle"
                                src={getImageURL('team/team5.jpg')}
                                alt="JOHN SMITH"
                              />
                            </div>
                            <p className="fs-16 text-white">
                              <strong className="text-white fs-18">
                                Michael Feldstein
                              </strong>
                              <span className="text-white o-7 fs-13">
                                CEO &amp; Founder
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="item">
                        <div className="testimonial-five">
                          <blockquote className="o-9">
                            <h4 className="fs-20 fw-5">Awesome Design.</h4>
                            <p className="lh-26">
                              Lorem ipsum dolor sit amet, consectetuer
                              adipiscing elit, sed diam nonummy nibh euismod
                              tincidunt ut laoreet dolore magna aliquam erat
                              volutpat. Ut wisi enim ad elitad Cras non placerat
                              mi.
                            </p>
                          </blockquote>

                          <div className="testimonial-author pl-15 clearfix">
                            <div className="testimonial-author-thumbnail">
                              <img
                                className="img-responsive img-circle"
                                src={getImageURL('avatars/a5.jpg')}
                                alt="JOHN SMITH"
                              />
                            </div>
                            <p className="fs-16 text-white">
                              <strong className="text-white fs-18">
                                JOHN SMITH
                              </strong>
                              <span className="text-white o-7 fs-13">
                                CEO &amp; Founder
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="customNavigation">
                      <a className="prev">
                        <i className="fa fa-angle-left" />
                      </a>
                      <a className="next">
                        <i className="fa fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-primary main-color">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <h3 className="mb-lg tt-none fs-20 fw-5">What does it cost?</h3>
                <p>
                  Lid est laborum dolo rumes fugats untras. Etharums ser quidem
                  rerum facilis dolores nemis omnis fugats vitaes nemo minima
                  rerums unsers sadips amets. Sed ut perspiciatis unde fugats
                  untras.
                </p>
                <a className="more-link" href="#">
                  Read more<span className="more-link-arrow"> →</span>
                </a>
              </div>

              <div className="col-md-4 col-sm-12">
                <h3 className="mb-lg tt-none fs-20 fw-5">
                  What exactly do I get?
                </h3>
                <p>
                  Lid est laborum dolo rumes fugats untras. Etharums ser quidem
                  rerum facilis dolores nemis omnis fugats vitaes nemo minima
                  rerums unsers sadips amets. Sed ut perspiciatis unde fugats
                  untras.
                </p>
                <a className="more-link" href="#">
                  Read more<span className="more-link-arrow"> →</span>
                </a>
              </div>

              <div className="col-md-4 col-sm-12">
                <h3 className="mb-lg tt-none fs-20 fw-5">
                  How long does it take?
                </h3>
                <p>
                  Lid est laborum dolo rumes fugats untras. Etharums ser quidem
                  rerum facilis dolores nemis omnis fugats vitaes nemo minima
                  rerums unsers sadips amets. Sed ut perspiciatis unde fugats
                  untras.
                </p>
                <a className="more-link" href="#">
                  Read more<span className="more-link-arrow"> →</span>
                </a>
              </div>
            </div>
          </div>

          <hr className="invisible medium" />

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <section className="cta cta-shadow-3x cta-dark mb-xl">
                  <div className="cta-inner p-0 pr-45">
                    <div className="cta-content">
                      <img
                        src={getImageURL('custom/sales.png')}
                        alt="sales and specials"
                      />

                      <h3 className="d-inline-block fs-20 fw-3">
                        High quality templates for your next web project.
                      </h3>
                    </div>
                    <div className="cta-btn">
                      <a
                        href="https://wrapbootstrap.com/theme/express-responsive-bootstrap-template-WB0TR1711"
                        target="_blank"
                        className="btn standard transparent-light text-white"
                      >
                        Purchase Now!{' '}
                        <i className="fa fa-angle-right fs-16 fw-6" />
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
    return (
      <Page
        component={content}
        pageClassName={pageClassName}
        headerActiveTab={'pages'}
      />
    );
  }
}

export { ServicesPage };
