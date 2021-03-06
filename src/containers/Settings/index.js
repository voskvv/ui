/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';

import {
  GET_PROFILE_INVALID,
  GET_PROFILE_REQUESTING,
  GET_PROFILE_FAILURE
} from '../../constants/profileConstants/getProfile';
import type { ReduxState } from '../../types';
import ProfileSidebar from '../../components/ProfileSidebar';
// import ProfileWebHook from './WebHook';
import ProfileDomains from '../Domains';
import CLIInfo from '../../components/CLIInfo';

type Props = {
  getProfileReducer: Object,
  match: Object
};

// Export this for unit testing more easily
export class Settings extends PureComponent<Props> {
  renderProfileInfo = () => {
    const { getProfileReducer, match } = this.props;

    if (
      !getProfileReducer.readyStatus ||
      getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
      getProfileReducer.readyStatus === GET_PROFILE_REQUESTING
    ) {
      return (
        <img
          src={require('../../images/acc-main.svg')}
          style={{ marginTop: '28px', width: '100%' }}
          alt="account"
        />
      );
    }

    if (getProfileReducer.readyStatus === GET_PROFILE_FAILURE) {
      return <p>Oops, Failed to load data of Settings!</p>;
    }

    return (
      <div className="content-block-container container container-fluid">
        {/* <ProfileWebHook /> */}
        <ProfileDomains match={match} />
        <CLIInfo />
      </div>
    );
  };
  renderProfileSideBar = () => {
    const { getProfileReducer } = this.props;

    if (
      !getProfileReducer.readyStatus ||
      getProfileReducer.readyStatus === GET_PROFILE_INVALID ||
      getProfileReducer.readyStatus === GET_PROFILE_REQUESTING
    ) {
      return (
        <div>
          <img
            src={require('../../images/profile-sidebar-big.svg')}
            style={{ width: '100%' }}
            alt="sidebar"
          />
          {new Array(7)
            .fill()
            .map(() => (
              <img
                key={_.uniqueId()}
                src={require('../../images/profile-sidebar-small.svg')}
                style={{ marginTop: '25px', float: 'right' }}
                alt="sidebar"
              />
            ))}
          <img
            src={require('../../images/profile-sidebar-big.svg')}
            style={{ marginTop: '30px', width: '100%' }}
            alt="sidebar"
          />
          {new Array(4)
            .fill()
            .map(() => (
              <img
                key={_.uniqueId()}
                src={require('../../images/profile-sidebar-small.svg')}
                style={{ marginTop: '25px', float: 'right' }}
                alt="sidebar"
              />
            ))}
        </div>
      );
    }

    if (getProfileReducer.readyStatus === GET_PROFILE_FAILURE) {
      return <p>Oops, Failed to load data of Settings!</p>;
    }

    return <ProfileSidebar type="settings" />;
  };

  render() {
    return (
      <div>
        <Helmet title="Settings" />
        <div className="content-block">
          <div className="container no-back">
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2">
                <div className="content-block account-info">
                  <div className="content-block-container container no-back pl-0 pr-0 container-fluid">
                    {this.renderProfileSideBar()}
                  </div>
                </div>
              </div>
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className="content-block">{this.renderProfileInfo()}</div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getProfileReducer }: ReduxState) => ({ getProfileReducer })
);

export default connector(Settings);
