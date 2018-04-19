import React from 'react';
import { Page, addJSscript } from './../utils/render';
import './main.css';

import { getImageURL, TeamMemberShortBio } from '../utils/render';

class AboutUsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const pageClassName = '';
    const content = (
      <div className="about-us-page-container">
        <section className="page-header b-bordered t-bordered">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <h1 className="title">About Us - Basic</h1>

                <nav className="pull-right">
                  <ol className="breadcrumb">
                    <li>
                      <a href="#">Pages</a>
                    </li>
                    <li className="active">About Us</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        <div className="page-inner p-none">
          <section className="section-medium">
            <div className="container">
              <div className="row">
                <div className="col-sm-6">
                  <div
                    className="owl-carousel owl-theme"
                    data-plugin-options="{'items': 1, 'margin': 10}"
                  >
                    <div>
                      <img
                        alt=""
                        className="img-fluid rounded"
                        src={getImageURL('blog/x6.jpg')}
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        className="img-fluid rounded"
                        src={getImageURL('blog/x5.jpg')}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="v-heading-v2">
                    <h4>Welcome to WuahGe.com</h4>
                  </div>

                  <p>
                    <span className="dropcap3">W</span>
                    uahGe.com is a full-service information technology
                    consulting firm that implements and maintains
                    high-performance IT website and/or systems for personal,
                    small and medium-sized organizations in a wide range of
                    industries. Regardless of their size, today’s companies rely
                    on anytime, anywhere access to information—and Exigent
                    delivers. For smaller clients, we provide customized support
                    for total IT needs. For larger enterprises, we complement
                    internal IT resources for higher levels of efficiency and
                    productivity. Established in 2018, WuahGe.com brings proven
                    experience and expertise to every engagement. We
                    differentiate ourselves through a consistent emphasis on
                    integrity, responsiveness and value-added service.
                  </p>
                  <blockquote>
                    <p>
                      WuahGe.com is a trusted partner, and their expertise,
                      efficiency, and reliability ensure the successful delivery
                      of critical services.
                    </p>
                    <small>
                      Kathy Leake <cite title="Source Title">-CEO</cite>
                    </small>
                  </blockquote>
                </div>
              </div>
            </div>
          </section>

          <section className="section-small main-color">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="special-heading word-underline">
                    <h4 className="special-heading-inner">
                      <span> About WuahGe.com </span>
                    </h4>
                  </div>
                  <div
                    className="accordion v4"
                    id="accordion5"
                    role="tablist"
                    aria-multiselectable="true"
                  >
                    <div className="card">
                      <div className="card-header" role="tab" id="headingOne5">
                        <h5 className="mb-0">
                          <a
                            data-toggle="collapse"
                            data-parent="#accordion5"
                            href="#collapseOne5"
                            aria-expanded="true"
                            aria-controls="collapseOne5"
                          >
                            <i className="ion-android-mail" /> Our Process
                            <span className="label label-primary pull-right mr-10">
                              5 Items
                            </span>
                          </a>
                        </h5>
                      </div>

                      <div
                        id="collapseOne5"
                        className="collapse show"
                        role="tabpanel"
                        aria-labelledby="headingOne5"
                      >
                        <div className="card-block">
                          <ul className="features">
                            <li>Project Definition</li>
                            <li>Project Scope</li>
                            <li>Wireframes and Site Architecture</li>
                            <li>Visual Design</li>
                            <li>Site Development/Testing</li>
                            <li>Launch</li>
                            <li>Site Maintenance</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" role="tab" id="headingTwo5">
                        <h5 className="mb-0">
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordion5"
                            href="#collapseTwo5"
                            aria-expanded="false"
                            aria-controls="collapseTwo5"
                          >
                            <i className="fa fa-battery" /> Our Service
                          </a>
                        </h5>
                      </div>
                      <div
                        id="collapseTwo5"
                        className="collapse"
                        role="tabpanel"
                        aria-labelledby="headingTwo5"
                      >
                        <div className="card-block">
                          <ul className="features">
                            <li>Website buildings</li>
                            <li>IT consultings</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div
                        className="card-header"
                        role="tab"
                        id="headingThree5"
                      >
                        <h5 className="mb-0">
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordion5"
                            href="#collapseThree5"
                            aria-expanded="false"
                            aria-controls="collapseThree5"
                          >
                            <i className="fa fa-folder-open" /> Case Stadies
                          </a>
                        </h5>
                      </div>
                      <div
                        id="collapseThree5"
                        className="collapse"
                        role="tabpanel"
                        aria-labelledby="headingThree5"
                      >
                        <div className="card-block">Coming soon...3</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-sm-6">
                  <div className="special-heading word-underline">
                    <h4 className="special-heading-inner">
                      <span> Our Specialties </span>
                    </h4>
                  </div>

                  <div className="progress-bars v2">
                    <div className="progress-label">
                      <span>Website/Javascript/HTML</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-primary"
                        data-appear-progress-animation="95%"
                      >
                        <span className="progress-bar-tooltip">95%</span>
                      </div>
                    </div>
                    <div className="progress-label">
                      <span>Big Data</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-primary"
                        data-appear-progress-animation="85%"
                        data-appear-animation-delay="300"
                      >
                        <span className="progress-bar-tooltip">85%</span>
                      </div>
                    </div>

                    <div className="progress-label">
                      <span>Java/Python/Scala</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-primary"
                        data-appear-progress-animation="80%"
                        data-appear-animation-delay="500"
                      >
                        <span className="progress-bar-tooltip">80%</span>
                      </div>
                    </div>
                    <div className="progress-label">
                      <span>App Development/Services</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-primary"
                        data-appear-progress-animation="75%"
                        data-appear-animation-delay="700"
                      >
                        <span className="progress-bar-tooltip">75%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-small">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="special-heading word-underline">
                    <h4 className="special-heading-inner">
                      <span> Meet Our Executive Team </span>
                    </h4>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3 col-sm-6">
                  <TeamMemberShortBio
                    profileThumbnailURL={'team/team00.png'}
                    fullName={'Ken Wu'}
                    position={'Co-founder/CEO'}
                    summary={
                      'A programing champion and professional coder for 20+ years with characteristics of entrepreneurship.'
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="section-small main-color">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="special-heading word-underline">
                    <h3 className="special-heading-inner fs-18">
                      <span> Our Happy Clients </span>
                    </h3>
                  </div>
                  <br />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="clients-wrap carousel-wrap">
                    <div
                      className="owl-carousel"
                      data-plugin-options="{&quot;items&quot;: 6, &quot;singleItem&quot;: false, &quot;autoPlay&quot;: true, &quot;dots&quot;:false}"
                    >
                      <div className="item">
                        <figure>
                          <a href="https://vimeo.com/awards" target="_blank">
                            <img src={getImageURL('clients/03.png')} />
                          </a>
                        </figure>
                      </div>
                      <div className="item">
                        <figure>
                          <a href="http://dribbble.com/" target="_blank">
                            <img src={getImageURL('clients/02.png')} />
                          </a>
                        </figure>
                      </div>
                      <div className="item">
                        <figure>
                          <a href="http://wordpress.org/" target="_blank">
                            <img src={getImageURL('clients/01.png')} />
                          </a>
                        </figure>
                      </div>
                      <div className="item">
                        <figure>
                          <a href="https://vimeo.com/pro/" target="_blank">
                            <img src={getImageURL('clients/04.png')} />
                          </a>
                        </figure>
                      </div>
                      <div className="item">
                        <figure>
                          <a href="http://jquery.com/" target="_blank">
                            <img src={getImageURL('clients/05.png')} />
                          </a>
                        </figure>
                      </div>
                      <div className="item">
                        <figure>
                          <a href="http://wordpress.org/" target="_blank">
                            <img src={getImageURL('clients/01.png')} />
                          </a>
                        </figure>
                      </div>
                      <div className="item">
                        <figure>
                          <a href="http://www.envato.com/" target="_blank">
                            <img src={getImageURL('clients/03.png')} />
                          </a>
                        </figure>
                      </div>
                      <div className="item">
                        <figure>
                          <a href="https://vimeo.com/ondemand" target="_blank">
                            <img src={getImageURL('clients/04.png')} />
                          </a>
                        </figure>
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
          </section>

          <section className="section-medium section-arrow--bottom-center section-arrow-primary-color bg-primary">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-white text-center">
                  <h2 className="section-title "> What Others Say About Us</h2>
                  <p className="section-sub-title">
                    We are a passionate digital design agency that specializes
                    in beautiful and easy-to- <br />
                    use digital design &amp; web development services.
                  </p>
                </div>
              </div>
            </div>
          </section>
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

export { AboutUsPage };
