/* @flow */

import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import { NavLink, Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import cookie from 'react-cookies';
import queryString from 'query-string';

import { routerLinks } from '../../config';
import * as actionRecoveryPassword from '../../actions/recoveryPassword';
// import * as actionCheckHashPassword from '../../actions/checkHashPassword';
import InputPassword from '../../components/InputPassword';
import LoadButton from '../../components/LoadButton';
// import { CHECK_HASH_PASSWORD_FAILURE } from '../../constants/checkHashPasswordConstants';
import { RECOVERY_PASSWORD_FAILURE } from '../../constants/recoveryPasswordConstants';
import globalStyles from '../../theme/global.scss';
import buttonStyles from '../../theme/buttons.scss';
import styles from './index.scss';

type Props = {
  recoveryPasswordReducer: Object,
  // checkHashPasswordReducer: Object,
  location: Object,
  // history: Object,
  fetchRecoveryPasswordIfNeeded: (hashParam: string, password: string) => void
  // fetchCheckHashPasswordIfNeeded: (hashParam: string) => void
};

class RecoveryPassword extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isValidPassword: true,
      repeatPassword: '',
      isValidRepeatPassword: true,
      errorMessage: 'Password is not valid'
    };
  }
  // componentWillMount() {
  //   const { location, history, fetchCheckHashPasswordIfNeeded } = this.props;
  //   const { hashParam } = queryString.parse(location.search);
  //   if (hashParam) {
  //     fetchCheckHashPasswordIfNeeded(hashParam);
  //   } else {
  //     history.push('/forgot');
  //   }
  // }
  componentDidMount() {
    cookie.remove('accessToken', { path: '/' });
    cookie.remove('refreshToken', { path: '/' });
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.recoveryPasswordReducer.readyStatus !==
        nextProps.recoveryPasswordReducer.readyStatus &&
      nextProps.recoveryPasswordReducer.readyStatus ===
        RECOVERY_PASSWORD_FAILURE
    ) {
      // console.log(nextProps.recoveryPasswordReducer);
      if (nextProps.recoveryPasswordReducer.err === 'Invalid link') {
        this.setState({
          ...this.state,
          isValidPassword: false,
          isValidRepeatPassword: false,
          errorMessage: (
            <span>
              Link is invalid.{' '}
              <Link
                to={routerLinks.forgot}
                style={{ color: '#333', textDecoration: 'underline' }}
              >
                Forgot your password?
              </Link>
            </span>
          )
        });
      } else {
        this.setState({
          ...this.state,
          isValidPassword: false,
          isValidRepeatPassword: false,
          errorMessage: 'Password is not valid'
        });
      }
    }
    // if (
    //   this.props.checkHashPasswordReducer.readyStatus !==
    //     nextProps.checkHashPasswordReducer.readyStatus &&
    //   nextProps.checkHashPasswordReducer.readyStatus ===
    //     CHECK_HASH_PASSWORD_FAILURE
    // ) {
    //   this.setState({
    //     ...this.state,
    //     isValidPassword: false,
    //     isValidRepeatPassword: false,
    //     errorMessage: (
    //       <span>
    //         Link is invalid.{' '}
    //         <Link
    //           to={routerLinks.forgot}
    //           style={{ color: '#333', textDecoration: 'underline' }}
    //         >
    //           Forgot your password?
    //         </Link>
    //       </span>
    //     )
    //   });
    // }
  }
  handleChangePassword(password) {
    this.setState({
      ...this.state,
      password
    });
  }
  handleChangeConfirmPassword(repeatPassword) {
    this.setState({
      ...this.state,
      repeatPassword
    });
  }
  handleSubmitRecoveryPasswordAction(e) {
    e.preventDefault();
    const { password, repeatPassword } = this.state;
    const { location } = this.props;
    const { hashParam } = queryString.parse(location.search);
    if (
      password.length > 7 &&
      repeatPassword.length > 7 &&
      password === repeatPassword
    ) {
      this.props.fetchRecoveryPasswordIfNeeded(hashParam, repeatPassword);
    } else {
      this.setState({
        ...this.state,
        isValidPassword: false,
        isValidRepeatPassword: false,
        errorMessage: 'Password is not valid'
      });
    }
  }
  render() {
    // console.log(this.state);
    const {
      password,
      repeatPassword,
      isValidPassword,
      isValidRepeatPassword,
      errorMessage
    } = this.state;
    const { isFetching } = this.props.recoveryPasswordReducer;
    return (
      <div>
        <Helmet title="Recovery Password" />
        <div
          className={`${globalStyles.window} ${
            styles.windowResetPasswordThree
          }`}
        >
          <div className={globalStyles.windowForm}>
            <div className={globalStyles.authBlock}>
              <NavLink
                activeClassName={globalStyles.authBlockActiveLink}
                to={routerLinks.signUp}
              >
                Sign Up
              </NavLink>
              <span className={globalStyles.authDivider}>or</span>
              <NavLink
                activeClassName={globalStyles.authBlockActiveLink}
                to={routerLinks.login}
              >
                Log In
              </NavLink>
            </div>
            <div className={globalStyles.mainForm}>
              <div
                className={`${globalStyles.formHeader} ${
                  globalStyles.formHeaderLogin
                }`}
              >
                Type new password
              </div>
              {(!isValidPassword || !isValidRepeatPassword) && (
                <div className={globalStyles.errorMessage}>
                  <span className={globalStyles.errorMessageText}>
                    {errorMessage}
                  </span>
                </div>
              )}
              <form onSubmit={e => this.handleSubmitRecoveryPasswordAction(e)}>
                <InputPassword
                  handleChangePassword={value =>
                    this.handleChangePassword(value)
                  }
                  value={password}
                  id="password"
                  placeholder="New password"
                />
                <InputPassword
                  handleChangePassword={value =>
                    this.handleChangeConfirmPassword(value)
                  }
                  value={repeatPassword}
                  id="repeatPassword"
                  placeholder="Confirm new password"
                />
                <LoadButton
                  type="submit"
                  buttonText="Submit"
                  typeMiniSpinner="transparency"
                  isFetching={isFetching}
                  baseClassButton={`${buttonStyles.buttonUI} ${
                    buttonStyles.buttonUIPrimary
                  } ${globalStyles.authBtnMargin}`}
                />
              </form>
              {/* <NavLink */}
              {/* activeClassName="active" */}
              {/* className="forg-pass" */}
              {/* to={routerLinks.forgot} */}
              {/* > */}
              {/* Forgot your password? */}
              {/* </NavLink> */}
              <div>
                {false && (
                  <div>
                    <span className={globalStyles.orDivider}>or</span>
                    <div className={globalStyles.socialTitle}>
                      Sign up with your favourite social profile
                    </div>
                    <div className={globalStyles.socialWrapper}>
                      <a href="https://github.com/">
                        <img
                          src={require('../../images/github.svg')}
                          alt="github"
                        />
                      </a>
                      <a
                        href="https://google.com/"
                        className={globalStyles.socialCenterIcon}
                      >
                        <img
                          src={require('../../images/google.svg')}
                          alt="google"
                        />
                      </a>
                      <a href="https://facebook.com/">
                        <img src={require('../../images/fb.svg')} alt="fb" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({ recoveryPasswordReducer, checkHashPasswordReducer }) => ({
    recoveryPasswordReducer,
    checkHashPasswordReducer
  }),
  dispatch => ({
    // fetchCheckHashPasswordIfNeeded: (hashParam: string) =>
    //   dispatch(
    //     actionCheckHashPassword.fetchCheckHashPasswordIfNeeded(hashParam)
    //   ),
    fetchRecoveryPasswordIfNeeded: (hashParam: string, password: string) =>
      dispatch(
        actionRecoveryPassword.fetchRecoveryPasswordIfNeeded(
          hashParam,
          password
        )
      )
  })
);

export default connector(RecoveryPassword);
