/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
// import _ from 'lodash/fp';
import { Scrollbars } from 'react-custom-scrollbars';
import fileSaver from 'file-saver';

import scrollById from '../../../functions/scrollById';
import initSocket from '../../../functions/getSockets';
import * as actionGetPod from '../../../actions/podActions/getPod';
import {
  GET_POD_FAILURE,
  GET_POD_INVALID,
  GET_POD_REQUESTING
} from '../../../constants/podConstants/getPod';
import type { Dispatch, ReduxState } from '../../../types/index';
import NavigationHeaderItem from '../../NavigationHeader/index';

import globalStyles from '../../../theme/global.scss';
import podStyles from '../../../containers/Pod/index.scss';

type Props = {
  getPodReducer: Object,
  fetchGetPodIfNeeded: (idName: string, idDep: string, idPod: string) => void,
  fetchDeletePodIfNeeded: (idName: string, idPod: string) => void,
  match: Object
  // history: Object
};

// Export this for unit testing more easily
export class PodLogs extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      logs: '',
      errorMessage: ''
    };
  }
  componentDidMount() {
    const { fetchGetPodIfNeeded, match } = this.props;
    const { idName, idDep, idPod } = match.params;
    fetchGetPodIfNeeded(idName, idDep, idPod);
    this.clientSocket = initSocket(idName, idPod);
    if (this.clientSocket) {
      this.clientSocket.onerror = () => this.onMessageFailure();
      this.clientSocket.onmessage = evt => {
        const resultString = evt.data
          .replace(/ +/g, '<br />')
          .replace(/\n+/g, '<br />');
        this.onMessageReceived(resultString);
        setTimeout(() => {
          scrollById('endOfLogs');
        }, 300);
      };
    } else {
      this.clientSocket.onerror = () => this.onMessageFailure();
    }
    if (
      typeof window !== 'undefined' &&
      typeof window.document !== 'undefined'
    ) {
      document.addEventListener('keydown', e => this._handleKeyPress(e));
    }
  }
  componentWillUnmount() {
    if (this.clientSocket) {
      this.clientSocket.close();
    }
    if (
      typeof window !== 'undefined' &&
      typeof window.document !== 'undefined'
    ) {
      document.removeEventListener('keydown', e => this._handleKeyPress(e));
    }
  }
  onMessageReceived = data => {
    this.setState({ ...this.state, logs: this.state.logs + data });
  };
  onMessageFailure = () => {
    this.setState({
      ...this.state,
      errorMessage: 'Failed to connect to server'
    });
  };
  clientSocket = socket => socket;
  _handleKeyPress = e => {
    // console.log(e);
    if (e.key === 'Enter') {
      this.setState({ ...this.state, logs: `${this.state.logs}<br />` });
      scrollById('endOfLogs');
    }
  };

  handleDownloadLogs = () => {
    const { match } = this.props;
    if (typeof window !== 'undefined') {
      fileSaver.saveAs(
        new File(
          this.state.logs.split('<br />'),
          `${match.params.idName}-${
            match.params.idPod
          }-${new Date().toISOString()}`,
          {
            type: 'text/plain;charset=utf-8'
          }
        )
      );
    }
  };
  renderLogsPodInfo = () => {
    const { getPodReducer } = this.props;
    const { errorMessage } = this.state;

    if (
      !getPodReducer.readyStatus ||
      getPodReducer.readyStatus === GET_POD_INVALID ||
      getPodReducer.readyStatus === GET_POD_REQUESTING
    ) {
      return (
        <div
          className={`${globalStyles.container} container`}
          style={{
            padding: '0',
            marginTop: '17px',
            marginBottom: '30px',
            backgroundColor: 'transparent'
          }}
        >
          <img
            src={require('../../../images/ns-dep.svg')}
            alt="ns-dep"
            style={{ width: '100%' }}
          />
        </div>
      );
    }

    if (getPodReducer.readyStatus === GET_POD_FAILURE) {
      return <p>Oops, Failed to load data of Pod Logs!</p>;
    }

    return (
      <Scrollbars
        style={{ width: '100%', height: '80vh', overflowY: 'unset' }}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: 'rgba(256, 256, 256, 0.8)',
              width: '8px',
              borderRadius: '4px'
            }}
          />
        )}
        renderThumbHorizontal={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: 'rgba(256, 256, 256, 0.8)',
              height: '8px',
              borderRadius: '4px'
            }}
          />
        )}
        renderView={props => <div {...props} className={podStyles.logData} />}
      >
        <div>
          {errorMessage ? (
            <div>{errorMessage}</div>
          ) : (
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: this.state.logs
              }}
            />
          )}
        </div>
        <div id="endOfLogs" />
      </Scrollbars>
    );
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <Helmet title={`Logs Pod - ${match.params.idPod}`} />
        <NavigationHeaderItem
          idName={match.params.idName}
          idDep={match.params.idDep}
          idPod={match.params.idPod}
          handleDownloadLogs={this.handleDownloadLogs}
        />
        {this.renderLogsPodInfo()}
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ getPodReducer }: ReduxState) => ({
    getPodReducer
  }),
  (dispatch: Dispatch) => ({
    fetchGetPodIfNeeded: (idName: string, idDep: string, idPod: string) =>
      dispatch(actionGetPod.fetchGetPodIfNeeded(idName, idDep, idPod))
  })
);

export default connector(PodLogs);
