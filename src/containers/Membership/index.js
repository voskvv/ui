import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import HeaderPage from '../Header/index';
import FooterPage from '../Footer/index';
import DeleteModal from '../../components/CustomerModal/DeleteModal';

class Membership extends PureComponent {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isOpen: false,
      idDep: null
    };
  }

  onHandleDelete = () => {
    console.log('azazaza');
  };

  handleDeleteDMembers = idDep => {
    this.setState({
      ...this.state,
      idDep,
      isOpen: true
    });
  };

  handleOpenCloseModal = () => {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen,
      idDep: null
    });
  };

  handleInputName = inputName => {
    this.setState({
      ...this.state,
      inputName
    });
  };

  render() {
    const name = 'azaz';
    return (
      <div>
        <Helmet title="Membership [namspace]" />
        <HeaderPage />
        <DeleteModal
          type="Membership"
          name={this.state.inputName}
          isOpened={this.state.isOpen}
          typeName={this.state.idDep}
          handleInputName={this.handleInputName}
          handleOpenCloseModal={this.handleOpenCloseModal}
          onHandleDelete={this.handleDeleteDMembers}
        />
        <div className="content-block">
          <div className="container no-back">
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2" />
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className="content-block">
                  <div
                    className="content-block-container container"
                    style={{ paddingTop: '40px' }}
                  >
                    <div className="content-block-header">
                      <div className="content-block-header-label__text content-block-header-label_main__membership content-block-header-label_main content-block-header-label__text_namspace-info">
                        [NAMSPACE_NAME]
                      </div>
                      <div className="content-block-header-nav">
                        <ul
                          className="content-block-menu nav nav-pills content-block-menu__membership"
                          role="tablist"
                          style={{ height: '50px' }}
                        >
                          <li
                            className="content-block-menu__li content-block-menu__li_membership nav-item"
                            style={{ width: 'auto' }}
                          >
                            <Link
                              to="/dashboard"
                              className="content-block-menu__link"
                            >
                              Users
                            </Link>
                          </li>
                          <li className="membership-btn-container">
                            <Link to="/dashboard">
                              <button className="membership-btn">
                                Add Users
                              </button>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content">
                        <div className="tab-pane deployments active">
                          <table
                            className="content-block__table table"
                            width="1170"
                          >
                            <thead>
                              <tr>
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Name
                                </td>
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Email
                                </td>
                                <td className="td-3__no-paddingLeft">
                                  Permission
                                </td>
                                <td className="td-1" />
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Name
                                </td>
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Email
                                </td>
                                <td className="td-3__no-paddingLeft td-3-flex">
                                  <div>Pods</div>
                                  <div style={{ paddingLeft: '50px' }}>
                                    <i
                                      className="content-block-table__more  dropdown-toggle"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    />
                                    <ul
                                      className="dropdown-menu dropdown-menu-right"
                                      role="menu"
                                    >
                                      <Link
                                        className="dropdown-item"
                                        to="/dashboard"
                                      >
                                        Write
                                      </Link>
                                      <button className="dropdown-item">
                                        Read
                                      </button>
                                    </ul>
                                  </div>
                                </td>
                                <td
                                  className="td-1"
                                  onClick={() =>
                                    this.handleDeleteDMembers(name)
                                  }
                                >
                                  <div className="membership-item">
                                    <i
                                      className="material-icons"
                                      role="presentation"
                                    >
                                      delete
                                    </i>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Name
                                </td>
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Email
                                </td>
                                <td className="td-3__no-paddingLeft td-3-flex">
                                  <div>Pods</div>
                                  <div style={{ paddingLeft: '50px' }}>
                                    <i
                                      className="content-block-table__more  dropdown-toggle"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    />
                                    <ul
                                      className="dropdown-menu dropdown-menu-right"
                                      role="menu"
                                    >
                                      <Link
                                        className="dropdown-item"
                                        to="/dashboard"
                                      >
                                        Write
                                      </Link>
                                      <button className="dropdown-item">
                                        Read
                                      </button>
                                    </ul>
                                  </div>
                                </td>
                                <td
                                  className="td-1"
                                  onClick={() =>
                                    this.handleDeleteDMembers(name)
                                  }
                                >
                                  <div className="membership-item">
                                    <i
                                      className="material-icons"
                                      role="presentation"
                                    >
                                      delete
                                    </i>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="td-2__membership td-3__no-paddingLeft" />
                                <td className="td-2__membership td-3__no-paddingLeft">
                                  Name
                                </td>
                                <td className="td-3__no-paddingLeft td-3-flex">
                                  <div>Pods</div>
                                  <div style={{ paddingLeft: '50px' }}>
                                    <i
                                      className="content-block-table__more  dropdown-toggle"
                                      data-toggle="dropdown"
                                      aria-haspopup="true"
                                      aria-expanded="false"
                                    />
                                    <ul
                                      className="dropdown-menu dropdown-menu-right"
                                      role="menu"
                                    >
                                      <Link
                                        className="dropdown-item"
                                        to="/dashboard"
                                      >
                                        Write
                                      </Link>
                                      <button className="dropdown-item">
                                        Read
                                      </button>
                                    </ul>
                                  </div>
                                </td>
                                <td
                                  className="td-1"
                                  onClick={() =>
                                    this.handleDeleteDMembers(name)
                                  }
                                >
                                  <div className="membership-item">
                                    <i
                                      className="material-icons"
                                      role="presentation"
                                    >
                                      delete
                                    </i>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

export default Membership;
