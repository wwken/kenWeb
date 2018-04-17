import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header
        id="header"
        className="header-narrow header-full-width"
        data-plugin-options="&quot;stickyEnabled&quot;: true, &quot;stickyEnableOnBoxed&quot;: true, &quot;stickyEnableOnMobile&quot;: true, &quot;stickyStartAt&quot;: 1, &quot;stickySetTop&quot;: &quot;1&quot;}"
      >
        <div className="header-body">
          <div className="header-container container">
            <div className="header-row">
              <div className="header-column">
                <div className="header-row">
                  <div className="header-logo">
                    <a href="index.html">
                      <img
                        alt="Express"
                        width="106"
                        height="69"
                        src="img/logo.png"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="header-column justify-content-center">
                <div className="header-row">
                  <div className="header-nav header-nav-top-line justify-content-center">
                    <div className="header-nav-main header-nav-main-effect-2 header-nav-main-sub-effect-1">
                      <nav className="collapse">
                        <ul className="nav nav-pills" id="mainNav">
                          <li className="dropdown">
                            <a
                              className="dropdown-item dropdown-toggle active"
                              href="index.html"
                            >
                              Home{' '}
                            </a>
                          </li>
                          <li className="dropdown">
                            <a
                              className="dropdown-item dropdown-toggle"
                              href="#"
                            >
                              Pages{' '}
                            </a>
                            <ul className="dropdown-menu">
                              <li className="dropdown-submenu">
                                <a className="dropdown-item" href="#">
                                  Layouts
                                </a>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="pages-full-width.html"
                                    >
                                      Full Width
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="blog-medium-left-sidebar.html"
                                    >
                                      Left Sidebar
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="blog-medium-right-sidebar.html"
                                    >
                                      Right Sidebar
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="dropdown-submenu">
                                <a className="dropdown-item" href="#">
                                  Extra
                                </a>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="features-404-pages.html"
                                    >
                                      404 Error{' '}
                                      <span className="tip tip-primary">
                                        Premium
                                      </span>{' '}
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="dropdown-submenu">
                                <a className="dropdown-item" href="#">
                                  Login / Register
                                </a>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="pages-login.html"
                                    >
                                      Login Default
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="pages-login-horizontal.html"
                                    >
                                      Login Horizontal
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="pages-login-3.html"
                                    >
                                      Login Extended
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li className="dropdown-submenu">
                                <a className="dropdown-item" href="#">
                                  Services
                                </a>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="pages-services.html"
                                    >
                                      Services
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="pages-services-2.html"
                                    >
                                      Services Alt
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="pages-search-result.html"
                                >
                                  Search Result
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="pages-pricing.html"
                                >
                                  Pricing Page
                                </a>
                              </li>
                              <li className="dropdown-submenu">
                                <a className="dropdown-item" href="#">
                                  FAQs
                                </a>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="pages-faq.html"
                                    >
                                      FAQ
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="pages-faq-2.html"
                                    >
                                      FAQ Alt
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="pages-privacy.html"
                                >
                                  Privacy Page
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className="dropdown dropdown-mega dropdown-mega-column-3">
                            <a
                              className="dropdown-item dropdown-toggle"
                              href="#"
                            >
                              Blog
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <div className="dropdown-mega-content">
                                  <div className="row">
                                    <div className="col">
                                      <span className="dropdown-mega-sub-title">
                                        Blog Columns
                                      </span>
                                      <ul className="dropdown-mega-sub-nav">
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-grid-2-columns.html"
                                          >
                                            Boxed Grid - 2 Columns
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-grid-3-columns.html"
                                          >
                                            Boxed Grid - 3 Columns
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-grid-4-columns.html"
                                          >
                                            Boxed Grid - 4 Columns
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-fw-grid-3-columns.html"
                                          >
                                            Full Width Grid - 3 Columns
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-fw-grid-4-columns.html"
                                          >
                                            Full Width Grid - 4 Columns
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-fw-grid-5-columns.html"
                                          >
                                            Full Width Grid - 5 Columns
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col">
                                      <span className="dropdown-mega-sub-title">
                                        BLOG LAYOUTS
                                      </span>
                                      <ul className="dropdown-mega-sub-nav">
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-grid-right-sidebar.html"
                                          >
                                            Grid Right Sidebar
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-grid-left-sidebar.html"
                                          >
                                            Grid Left Sidebar
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-medium-right-sidebar.html"
                                          >
                                            Medium Right Sidebar
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-medium-left-sidebar.html"
                                          >
                                            Medium Left Sidebar
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-large-right-sidebar.html"
                                          >
                                            Large Right Sidebar
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-large-left-sidebar.html"
                                          >
                                            Large Left Sidebar
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="col">
                                      <span className="dropdown-mega-sub-title">
                                        BLOG SINGLE
                                      </span>
                                      <ul className="dropdown-mega-sub-nav">
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-post-standard.html"
                                          >
                                            Post With Sidebar
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="blog-post-standard-2.html"
                                          >
                                            Full Width Post
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </li>
                          <li className="dropdown">
                            <a
                              className="dropdown-item dropdown-toggle"
                              href="index.html"
                            >
                              About{' '}
                            </a>
                            <ul className="dropdown-menu">
                              <li className="dropdown-submenu">
                                <a className="dropdown-item" href="#">
                                  About Us
                                </a>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="pages-about.html"
                                    >
                                      About Us
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="pages-meet-team.html"
                                    >
                                      Meet Team
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  href="pages-contact-us.html"
                                >
                                  Contact
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <button
                      className="btn header-btn-collapse-nav"
                      data-toggle="collapse"
                      data-target=".header-nav-main nav"
                    >
                      <i className="fa fa-bars" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="header-column justify-content-end">
                <div className="header-row">
                  <div className="header-nav header-nav-top-line justify-content-end">
                    <div className="header-nav-main header-nav-main-effect-2 header-nav-main-sub-effect-1">
                      <nav className="collapse">
                        <ul className="nav nav-pills" id="mainNav">
                          <li className="dropdown header-search-wrap">
                            <a
                              className="dropdown-item dropdown-toggle pr-5"
                              href="#"
                            >
                              <i className="fa fa-search3 fs-18" />{' '}
                            </a>
                            <ul className="dropdown-menu">
                              <li>
                                <div className="header-search">
                                  <form
                                    id="searchForm"
                                    action="pages-search-result.html"
                                    method="get"
                                    noValidate="novalidate"
                                  >
                                    <div className="input-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="q"
                                        id="q"
                                        placeholder="Search..."
                                        required=""
                                      />
                                      <span className="input-group-btn">
                                        <button
                                          className="btn btn-light"
                                          type="submit"
                                        >
                                          <i className="fa fa-search" />
                                        </button>
                                      </span>
                                    </div>
                                  </form>
                                </div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export { Header };
