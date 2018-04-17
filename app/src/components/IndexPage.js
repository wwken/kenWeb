import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isNil, bindAll } from 'lodash';
import { userActions } from '../actions';
import { Header } from './shared/Header';

import './main.css';

import IOS from '../public/img/icons/ios-icon-medium@2x.png';
import JAVA from '../public/img/icons/java_logo_1.png';
import BIG_DATA from '../public/img/icons/big-data.png';
import ANDROID from '../public/img/icons/android-icon-medium@2x.png';
import HTML from '../public/img/icons/Html-tags-icon.png';

import { getImageURL } from '../utils/render';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //dew Index
    return (
      <div className="wrapper">
        <Header />
        <div className="page">
          <div className="page-inner p-none no-border">
            <section className="section-primary b-bordered section-primary-background">
              <div className="container margin-top-40">
                <div className="row margin-top-40">
                  <div className="col-md-12">
                    <i className="ion-android-checkmark-circle fs-60 primary-color" />
                    <h4 className="fs-13 fw-6 o-6 mt-20 mb-5 body-font">
                      DON'T WORRY! WE ARE WITH YOU TO HELP
                    </h4>
                    <h2 className="section-title mt-10 fs-36">
                      WuahGe.com helps you create awesome websites <br /> and
                      provides IT consulting services.
                    </h2>

                    <hr className="invisible small" />

                    <div className="clearfix content-center">
                      <ul className="list-inline flex-block clearfix">
                        <li
                          className="item exp-animation slow"
                          data-animation="bottom-to-top"
                          data-delay="100"
                        >
                          <img src={IOS} width="55" height="55" />
                          <a className="mt-10" href="#">
                            Mac
                          </a>
                        </li>
                        <li
                          className="item exp-animation slow"
                          data-animation="bottom-to-top"
                          data-delay="200"
                        >
                          <img src={JAVA} width="55" />
                          <a className="mt-10" href="#">
                            Java
                          </a>
                        </li>
                        <li
                          className="item exp-animation slow"
                          data-animation="bottom-to-top"
                          data-delay="400"
                        >
                          <img src={BIG_DATA} width="55" />
                          <a className="mt-10" href="#">
                            Big Data
                          </a>
                        </li>
                        <li
                          className="item exp-animation slow"
                          data-animation="bottom-to-top"
                          data-delay="300"
                        >
                          <img src={ANDROID} width="55" />
                          <a className="mt-10" href="#">
                            Android
                          </a>
                        </li>
                        <li
                          className="item exp-animation slow"
                          data-animation="bottom-to-top"
                          data-delay="500"
                        >
                          <img src={HTML} width="55" />
                          <a className="mt-10" href="#">
                            Html/Web
                          </a>
                        </li>
                      </ul>
                    </div>
                    <hr className="invisible small" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <a
                      className="btn standard accent sf-icon-stroke item-shadow"
                      href="#"
                      target="_self"
                    >
                      <i className="fa fa-link" />
                      <span className="text">GET STARTED NOW!</span>
                    </a>

                    <span className="video-link-wrap ml-10">
                      <span className="icon" /> <a href="#">How it works</a>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-tiny main-color text-center b-bordered bg-block-top-shadow v2">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <span className="m-none fs-15">
                      <span className="label label-primary mr-10 vl-3">
                        Hot
                      </span>{' '}
                      Develop your high quality
                      <a
                        href="https://wrapbootstrap.com/theme/express-responsive-bootstrap-template-WB0TR1711"
                        data-toggle="tooltip"
                        data-placement="top"
                        data-original-title="Lorem ipsum dolor"
                      >
                        Bootstrap
                      </a>
                      themes & templates for your next web project.
                    </span>
                    <a className="fs-15 mb-none ml-5" href="#">
                      Buy now!
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-primary alternate-color b-bordered pb-200 bg-block-top-shadow v2">
              <div className="container pr-30 pl-30">
                <div className="row">
                  <div className="col-md-6">
                    <div className="pricing-table two-cols pr-20">
                      <div className="pricing-column ">
                        <h3>Basic Web</h3>
                        <div className="pricing-column-content">
                          <h4>
                            <span className="dollar-sign">$</span> 599+
                          </h4>
                          <span className="interval">Per Website</span>
                          <ul className="features">
                            <li>Setup</li>
                            <li>Design & Buildings</li>
                            <li>Content Creation</li>
                            <li>Training to use it</li>
                          </ul>
                          <a
                            href="login.html"
                            className="btn btn-primary"
                            target="_self"
                          >
                            Sign up now!
                          </a>
                        </div>
                      </div>
                      <div className="pricing-column highlight accent-color">
                        <h3>
                          Standard<span className="highlight-reason">
                            Most Popular
                          </span>
                        </h3>
                        <div className="pricing-column-content">
                          <h4>
                            <span className="dollar-sign">$</span> 899+
                          </h4>
                          <span className="interval">Per Website+Database</span>
                          <ul className="features">
                            <li>Everything in Basic Web package</li>
                            <li>Database integrations</li>
                            <li>Testing frameworks</li>
                          </ul>
                          <a
                            href="login.html"
                            className="btn btn-primary"
                            target="_self"
                          >
                            Sign up now!
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h3 className="uppercase fs-16 o-4 ls-1 mt-30">
                      WuahGe Web Solutions
                    </h3>
                    <h2 className="section-title">
                      A <strong>better way</strong> to build a website &<br />
                      web app with <strong>WuahGe.com</strong>.
                    </h2>
                    <p className="fs-18 lh-26 fw-3 mt-md mb-md o-8">
                      Sign in to multiple teams, get desktop notifications,{' '}
                      <br />
                      and launch right from your tray.
                    </p>
                    <ul className="i-list filled">
                      <li>
                        <i className="fa fa-check" />
                        <span className="list-item">
                          You pick the themes and we do all work.
                        </span>
                      </li>
                      <li>
                        <i className="fa fa-check" />
                        <span className="list-item">
                          Satisfactions guaranteed.
                        </span>
                      </li>
                    </ul>
                    <a
                      className="btn standard accent sf-icon-stroke mt-10 item-shadow"
                      href="#"
                      target="_self"
                    >
                      <i className="fa fa-diamond" />
                      <span className="text">LEARN ABOUT EXPRESS</span>
                    </a>
                    <br />
                    * Plus a $69.99 monthly maintenance fee.
                  </div>
                </div>
              </div>
            </section>

            <section className="fx--y section-primary z-index-1">
              <div className="aframe-fxs">
                <div className="aframe-fx s1" />
                <div className="aframe-fx s2" />
              </div>

              <div className="container mnt-150">
                <div className="row">
                  <div className="col-md-12">
                    <div className="clients-wrap v3 carousel-wrap">
                      <div
                        className="owl-carousel"
                        data-plugin-options="{&quot;items&quot;: 5, &quot;singleItem&quot;: false, &quot;autoPlay&quot;: true, &quot;margin&quot;: 20, &quot;dots&quot;:false}"
                      >
                        <div className="item">
                          <figure>
                            <a
                              className="lite-tooltip"
                              href="#"
                              data-title="twitter"
                              data-location="top"
                            >
                              <img src={getImageURL('clients/twitter.png')} />
                            </a>
                          </figure>
                        </div>
                        <div className="item">
                          <figure>
                            <a
                              className="lite-tooltip"
                              href="#"
                              data-title="facebook"
                              data-location="top"
                            >
                              <img src={getImageURL('clients/facebook.png')} />
                            </a>
                          </figure>
                        </div>
                        <div className="item">
                          <figure>
                            <a
                              className="lite-tooltip"
                              href="#"
                              data-title="IBM"
                              data-location="top"
                            >
                              <img src={getImageURL('clients/ibm.png')} />
                            </a>
                          </figure>
                        </div>
                        <div className="item">
                          <figure>
                            <a
                              className="lite-tooltip"
                              href="#"
                              data-title="toshiba"
                              data-location="top"
                            >
                              <img src={getImageURL('clients/toshiba.png')} />
                            </a>
                          </figure>
                        </div>
                        <div className="item">
                          <figure>
                            <a
                              className="lite-tooltip"
                              href="#"
                              data-title="paypal"
                              data-location="top"
                            >
                              <img src={getImageURL('clients/paypal.png')} />
                            </a>
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row pl-50 pr-50 pt-70">
                  <div className="col-md-7 text-white">
                    <div className="copy">
                      <div className="intro-copy">
                        <h2 className="section-title">Some WuahGe Features</h2>
                        <p className="fs-20 lh-30 o-7">
                          It is very convenient that i do not need to care
                          everything<br /> but have my own professional
                          websites!
                        </p>
                      </div>
                      <div className="row pt-30">
                        <div className="col">
                          <h3>Crafted With Love</h3>
                          <p className="o-7">
                            We are highly-passionated team that aim at providing
                            highest quality and professional services to the
                            community.
                          </p>
                        </div>
                        <div className="col">
                          <h3>Advanced technology</h3>
                          <p className="o-7">
                            We will implement the solutions at the best current
                            up-todated technologies so that the development and
                            maintanence issues will be at minimum.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5">
                    <aside className="guide common-Card">
                      <div className="cover">
                        <img
                          src={getImageURL('clients/youtube.png')}
                          className="pt-25"
                        />
                      </div>
                      <h2>Check out our YouTube channels!</h2>
                      <p className=" pb-20">
                        Here are the lists of the videos we produce for your
                        reference.
                      </p>
                      <a href="#" className="btn btn-primary item-shadow">
                        <i className="fa fa-quote-left" /> Testimonials
                      </a>
                      <span className="video-link-wrap ml-10">
                        <span className="icon" /> <a href="#">How it works</a>
                      </span>
                    </aside>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-primary alternate-color b-bordered">
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <h2 className="section-title mb-0">Latest Updates</h2>
                    <p className="fs-18 lh-32 fw-3 mb-0">
                      We help take care of all the paperwork.
                    </p>
                  </div>

                  <div className="col-md-4">
                    <div className="clearfix pull-right">
                      <a className="read-more mt-40" href="#" target="_blank">
                        <span className="link_text">READ MORE</span> →
                      </a>
                    </div>
                  </div>
                </div>
                <hr className="invisible mt-5" />

                <div className="row">
                  <div className="col-sm-12">
                    <div
                      className="owl-carousel owl-theme mb-none"
                      data-plugin-options="{&quot;items&quot;: 3, &quot;margin&quot;: 25, &quot;animateOut&quot;: &quot;fadeOut&quot;}"
                    >
                      <div>
                        <article className="post-content-wrap minimal-post">
                          <div className="post-content-wrap-inner">
                            <h2 itemProp="name headline" className="post-title">
                              <a href="#">
                                Pay no interest until August 2018 with this card
                              </a>
                            </h2>

                            <div className="post-meta">
                              <ul>
                                <li className="date">
                                  <i className="ion-android-time" />June 16,
                                  2017{' '}
                                </li>
                                <li>
                                  <i className="fa fa-folder-o" />
                                  <a href="#">Design</a>,{' '}
                                  <a href="#">Company</a>
                                </li>
                              </ul>
                            </div>
                            <a className="read-more" href="#" target="_self">
                              READ MORE →
                            </a>
                          </div>
                        </article>
                      </div>
                      <div>
                        <article className="post-content-wrap minimal-post">
                          <div className="post-content-wrap-inner">
                            <h2 itemProp="name headline" className="post-title">
                              <a href="#">
                                Marine industry growing at a fastest pace since
                                2000
                              </a>
                            </h2>

                            <div className="post-meta">
                              <ul>
                                <li className="date">
                                  <i className="ion-android-time" />June 16,
                                  2017{' '}
                                </li>
                                <li>
                                  <i className="fa fa-folder-o" />
                                  <a href="#">Design</a>,{' '}
                                  <a href="#">Company</a>
                                </li>
                              </ul>
                            </div>
                            <a className="read-more" href="#" target="_self">
                              READ MORE →
                            </a>
                          </div>
                        </article>
                      </div>
                      <div>
                        <article className="post-content-wrap minimal-post">
                          <div className="post-content-wrap-inner">
                            <h2 itemProp="name headline" className="post-title">
                              <a href="#">
                                Pay no interest until August 2018 with this card
                              </a>
                            </h2>

                            <div className="post-meta">
                              <ul>
                                <li className="date">
                                  <i className="ion-android-time" />June 16,
                                  2017{' '}
                                </li>
                                <li>
                                  <i className="fa fa-folder-o" />
                                  <a href="#">Design</a>,{' '}
                                  <a href="#">Company</a>
                                </li>
                              </ul>
                            </div>
                            <a className="read-more" href="#" target="_self">
                              READ MORE →
                            </a>
                          </div>
                        </article>
                      </div>
                      <div>
                        <article className="post-content-wrap minimal-post">
                          <div className="post-content-wrap-inner">
                            <h2 itemProp="name headline" className="post-title">
                              <a href="#">
                                Pay no interest until August 2018 with this card
                              </a>
                            </h2>

                            <div className="post-meta">
                              <ul>
                                <li className="date">
                                  <i className="ion-android-time" />June 16,
                                  2017{' '}
                                </li>
                                <li>
                                  <i className="fa fa-folder-o" />
                                  <a href="#">Design</a>,{' '}
                                  <a href="#">Company</a>
                                </li>
                              </ul>
                            </div>
                            <a className="read-more" href="#" target="_self">
                              READ MORE →
                            </a>
                          </div>
                        </article>
                      </div>
                      <div>
                        <article className="post-content-wrap minimal-post">
                          <div className="post-content-wrap-inner">
                            <h2 itemProp="name headline" className="post-title">
                              <a href="#">
                                Pay no interest until August 2018 with this card
                              </a>
                            </h2>

                            <div className="post-meta">
                              <ul>
                                <li className="date">
                                  <i className="ion-android-time" />June 16,
                                  2017{' '}
                                </li>
                                <li>
                                  <i className="fa fa-folder-o" />
                                  <a href="#">Design</a>,{' '}
                                  <a href="#">Company</a>
                                </li>
                              </ul>
                            </div>
                            <a
                              className="read-more fs-13"
                              href="#"
                              target="_self"
                            >
                              READ MORE{' '}
                              <i className="fa fa-angle-double-right" />
                            </a>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-primary main-color b-bordered bg-block-top-shadow">
              <div className="container">
                <div className="row text-center">
                  <div className="col-md-12">
                    <h2 className="section-title">How Long Does It Take ?</h2>

                    <p className="section-sub-title">
                      It is very convenient that i can make a lot of pages from
                      my site with uniform <br />
                      design. Excellent professional and modern design.
                    </p>

                    <hr className="invisible medium" />
                  </div>
                </div>

                <div className="row process-step v2">
                  <div
                    className="col-md-3 process-step-step complete exp-animation"
                    data-animation="express_image_appear"
                    data-delay="400"
                  >
                    <div className="process-step-icon clearfix">
                      <i className="ion-gear-a fa-3x primary-color" />
                    </div>
                    <div className="process-step-content">
                      <div className="text-center process-step-stepnum">
                        Design
                      </div>
                      <div className="progress">
                        <div className="progress-bar" />
                      </div>
                      <a href="#" className="process-step-dot" />
                      <div className="process-step-info text-center">
                        Lorem ipsum dolor sitluctus amet. Nam mollis tristique
                        erat vel tristique.
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-md-3 process-step-step complete exp-animation"
                    data-animation="express_image_appear"
                    data-delay="800"
                  >
                    <div className="process-step-icon clearfix">
                      <i className="ion-paper-airplane fa-3x primary-color" />
                    </div>
                    <div className="process-step-content">
                      <div className="text-center process-step-stepnum">
                        Development
                      </div>
                      <div className="progress">
                        <div className="progress-bar" />
                      </div>
                      <a href="#" className="process-step-dot" />
                      <div className="process-step-info text-center">
                        Mauris et vestibulum nisi. Duis molestie nisl sed
                        scelerisque vestibulum.
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-md-3 process-step-step active exp-animation"
                    data-animation="express_image_appear"
                    data-delay="1200"
                  >
                    <div className="process-step-icon clearfix">
                      <i className="ion-bug fa-3x primary-color" />
                    </div>
                    <div className="process-step-content">
                      <div className="text-center process-step-stepnum">
                        Testing
                      </div>
                      <div className="progress">
                        <div className="progress-bar" />
                      </div>
                      <a href="#" className="process-step-dot" />
                      <div className="process-step-info text-center">
                        Integer semper dolor ac luctus auctor luctus rutrum.
                        Duis porta luctus ipsum.
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-md-3 process-step-step disabled exp-animation"
                    data-animation="express_image_appear"
                    data-delay="1600"
                  >
                    <div className="process-step-icon clearfix">
                      <i className="ion-ios-cloud-upload fa-3x o-2" />
                    </div>
                    <div className="process-step-content">
                      <div className="text-center process-step-stepnum">
                        Deployment
                      </div>
                      <div className="progress">
                        <div className="progress-bar" />
                      </div>
                      <a href="#" className="process-step-dot" />
                      <div className="process-step-info text-center">
                        Curabitur mollis magna at blandit vestibulum. in
                        faucibus orci luctus et ultrices
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-primary p-none">
              <div className="row fw-row">
                <div className="xpromo-wrap col-sm-12">
                  <div className="xpromo-bar promo-button pt-40 pb-40">
                    <p className="text-white e-custom-heading fs-22">
                      Like What You See? We’re Just Getting Started
                    </p>

                    <a
                      className="btn standard gold btn-icon-reveal item-shadow"
                      href="#"
                    >
                      <i className="fa fa-diamond fs-16" />
                      <span className="text">CHECK OUT OUR WORK</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-primary b-bordered">
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <h2 className="section-title mb-0">Solutions We Provide</h2>
                    <p className="section-sub-title">
                      We help take care of all the paperwork.
                    </p>
                    <div className="exp-separator">
                      <div className="exp-separator-inner" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <table className="table table-bordered srv-container">
                      <tbody>
                        <tr className="row">
                          <td className="col-md-3">
                            <div className="support_overview_lms">
                              <div className="item_wrapper">
                                <div className="up_block">
                                  <a href="#" className="logo_container">
                                    <img
                                      className="img-responsive"
                                      src="img/clients/rko.png"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className=" down_block">
                                  <p className="srv-name">
                                    <a href="#" target="_blank">
                                      Design for Startups
                                    </a>
                                  </p>
                                  <p className="scorm">Web Design, Startups</p>

                                  <a
                                    className="read-more link_arrow"
                                    href="#"
                                    target="_blank"
                                  >
                                    <span className="link_text">
                                      Learn more
                                    </span>{' '}
                                    →
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="col-md-3">
                            <div className="support_overview_lms">
                              <div className="item_wrapper">
                                <div className=" up_block">
                                  <a href="#" className="logo_container">
                                    <img
                                      className="img-responsive"
                                      src="img/clients/Sport.png"
                                    />
                                  </a>
                                </div>
                                <div className=" down_block">
                                  <p className="srv-name">
                                    <a href="#" target="_blank">
                                      eCommerce Websites
                                    </a>
                                  </p>
                                  <p className="scorm">WooCommerce, Magento</p>

                                  <a
                                    className="read-more link_arrow"
                                    href="#"
                                    target="_blank"
                                  >
                                    <span className="link_text">
                                      Learn more
                                    </span>{' '}
                                    →
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="col-md-3">
                            <div className="support_overview_lms">
                              <div className="vowel item_wrapper">
                                <div className=" up_block">
                                  <a href="#" className="logo_container">
                                    <img
                                      className="img-responsive"
                                      src="img/clients/Infinity.png"
                                    />
                                  </a>
                                </div>
                                <div className=" down_block">
                                  <p className="srv-name">
                                    <a href="#">Apps Development</a>
                                  </p>
                                  <p className="scorm">Android, IOS</p>

                                  <a
                                    className="read-more link_arrow"
                                    href="#"
                                    target="_blank"
                                  >
                                    <span className="link_text">
                                      Learn more
                                    </span>{' '}
                                    →
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="col-md-3">
                            <div className="support_overview_lms">
                              <div className="item_wrapper">
                                <div className=" up_block">
                                  <a href="#" className="logo_container">
                                    <img
                                      className="img-responsive"
                                      src="img/clients/swann.png"
                                    />
                                  </a>
                                </div>
                                <div className=" down_block">
                                  <p className="srv-name">
                                    <a href="#" target="_blank">
                                      Web Design
                                    </a>
                                  </p>
                                  <p className="scorm">HTML5, CSS</p>

                                  <a
                                    className="read-more link_arrow"
                                    href="#"
                                    target="_blank"
                                  >
                                    <span className="link_text">
                                      Learn more
                                    </span>{' '}
                                    →
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="col-md-12 text-center">
                    <a href="#" className="btn btn-link">
                      <i className="ss-navigateright" /> View All Servicess
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <section className="section-primary">
              <div className="xfade v3" />
              <div className="container">
                <div className="row text-center">
                  <div className="col-md-12">
                    <h2 className="mb-20 section-title">
                      {' '}
                      What’s your WuahGe Story?{' '}
                    </h2>
                    <div className="exp-separator center-separator">
                      <div className="exp-separator-inner mb-20" />
                    </div>
                    <p className="section-sub-title">
                      Share your experience with us!
                    </p>

                    <a href="#" className="btn btn-outline-success">
                      <i className="fa fa-link fs-16 mr-5" /> Share!
                    </a>
                    <hr className="invisible" />
                  </div>
                </div>
              </div>
            </section>
          </div>

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
                        <form
                          id="newsletterForm"
                          action="php/newsletter-subscribe.php"
                          method="POST"
                          noValidate="novalidate"
                        >
                          <div className="input-group">
                            <input
                              className="form-control"
                              placeholder="Email Address"
                              name="newsletterEmail"
                              id="newsletterEmail"
                              type="text"
                            />
                            <span className="input-group-btn">
                              <button className="btn btn-light" type="submit">
                                <i className="fa fa-search" />
                              </button>
                            </span>
                          </div>
                        </form>
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
                          <a href="custom-fonts/index.html">
                            About Company
                          </a>{' '}
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
                          <a href="responsive-image/index.html">
                            Conditions
                          </a>{' '}
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
                          <a href="custom-fonts/index.html">
                            All Features
                          </a>{' '}
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
                          795 Folsom Ave, Suite 600 San Francisco, CA 94107<br
                          />
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
                        <p className="mb-0 fw-6">© 2015-2018 Express</p>
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
        </div>
      </div>
    );
  }
}

export { IndexPage };
