import React from 'react';
import { Header } from './../components/shared/Header';
import { Footer } from './../components/shared/Footer';
import PropTypes from 'prop-types';
import classnames from 'classnames';

var config = require('./../restful-servers/server/config');
var objUtils = require('./objUtils');

export function getImageURL(u) {
  return config.resourceServerAddress + '/img/' + u;
}

export const Page = ({ component, pageClassName = '', headerActiveTab }) => {
  const pageClass = classnames('page', pageClassName);
  return (
    <div className="wrapper">
      <Header headerActiveTab={headerActiveTab} />
      <div className={pageClass}>
        <div className="page-inner p-none no-border">{component}</div>
        <Footer />
      </div>
    </div>
  );
};

Page.propTypes = {
  component: PropTypes.node,
  pageClassName: PropTypes.string,
  headerActiveTab: Header.propTypes.headerActiveTab,
};

export const TeamMemberShortBio = ({
  profileThumbnailURL,
  fullName,
  position,
  summary,
}) => {
  return (
    <div className="team-member">
      <div className="member-photo">
        <img
          className="img-responsive"
          src={getImageURL(profileThumbnailURL)}
          alt="Express"
        />
        <div className="member-social">
          <div className="member-social-inner">
            <ul className="list-inline">
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
            </ul>
          </div>
        </div>
      </div>
      <div className="member-info">
        <div className="member-name">
          <h3 className="name tt-none">{fullName}</h3>
        </div>
        <div className="member-position">
          <span>{position}</span>
        </div>
        <div className="member-desc t-bordered">
          <span>{summary}</span>
        </div>
      </div>
    </div>
  );
};

export const ServiceFeatureShortBio = ({
  profileThumbnailURL,
  title,
  description,
  readMoreClickFunc,
  clickKey,
}) => {
  return (
    <div
      className="v-animation noframe"
      data-animation="fade-in"
      data-delay="200"
    >
      <figure className="clearfix borderframe">
        <img
          src={getImageURL(profileThumbnailURL)}
          className="attachment-full responsive"
        />
        <figcaption className="image-caption">
          <h3 className="fw-4 fs-18 mt-20">{title}</h3>
          <p>{description}</p>
          <a
            href="javascript:void(0)"
            data-key={clickKey}
            className="read-more"
            onClick={readMoreClickFunc}
          >
            Read More →
          </a>
        </figcaption>
      </figure>
    </div>
  );
};

ServiceFeatureShortBio.propTypes = {
  profileThumbnailURL: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  readMoreClickFunc: PropTypes.func,
  clickKey: PropTypes.string,
};

export const ServiceFeatureBio = ({
  profileThumbnailURL,
  title,
  description,
  readMoreClickFunc,
  clickKey,
}) => {
  return (
    <div
      className="v-animation noframe"
      data-animation="fade-in"
      data-delay="200"
    >
      <figure className="clearfix borderframe">
        <img
          src={getImageURL(profileThumbnailURL)}
          className="attachment-full responsive"
        />
        <figcaption className="image-caption">
          <h3 className="fw-4 fs-18 mt-20">{title}</h3>
          <p>{description}</p>
          <a
            href="javascript:void(0)"
            data-key={clickKey}
            className="read-more"
            onClick={readMoreClickFunc}
          >
            Go Back →
          </a>
        </figcaption>
      </figure>
    </div>
  );
};

export function translateURL(url) {
  return objUtils.translateURL(url);
}

export function addJSscript(url) {
  const script = document.createElement('script');
  script.src = translateURL(url);
  script.async = false;
  document.body.appendChild(script);
}
