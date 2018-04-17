import React from 'react';
import { Header } from './../components/shared/Header';
import { Footer } from './../components/shared/Footer';
import PropTypes from 'prop-types';
import classnames from 'classnames';

var config = require('./../restful-servers/server/config');

export function getImageURL(u) {
  return config.resourceServerAddress + '/img/' + u;
}

export const Page = ({ component, pageClassName = '' }) => {
  const pageClass = classnames('page', pageClassName);
  return (
    <div className="wrapper">
      <Header />
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
};

export function translateURL(url) {
  if (url.indexOf('http') == 0) {
    return url;
  } else {
    return config.resourceServerAddress + '/' + url;
  }
}

export function addJSscript(url) {
  const script = document.createElement('script');
  script.src = translateURL(url);
  script.async = true;
  document.body.appendChild(script);
}
