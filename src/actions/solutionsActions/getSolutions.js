/* @flow */

// import { push } from 'react-router-redux';
// import cookie from 'react-cookies';

import type {
  Dispatch,
  GetState,
  ThunkAction
  // ReduxState
} from '../../types/index';
import {
  GET_SOLUTIONS_REQUESTING,
  GET_SOLUTIONS_SUCCESS,
  solutionsArray
  // GET_SOLUTIONS_FAILURE
} from '../../constants/solutionsConstants/getSolutions';
// import { webApi } from '../../config/index';

const getSolutionsRequest = () => ({
  type: GET_SOLUTIONS_REQUESTING,
  isFetching: true
});

const getSolutionsSuccess = data => ({
  type: GET_SOLUTIONS_SUCCESS,
  isFetching: false,
  data
});

// const getSolutionsFailure = err => ({
//   type: GET_SOLUTIONS_FAILURE,
//   isFetching: false,
//   err
// });

export const fetchGetSolutions = (): // axios: any,
// URL: string = webApi
ThunkAction => async (dispatch: Dispatch) => {
  // const browser = cookie.load('browser');

  dispatch(getSolutionsRequest());

  // const response = await axios.get(`${URL}/api/solutions`, {
  //   headers: {
  //     'User-Client': browser,
  //     'Content-Type': 'application/x-www-form-urlencode',
  //     'Access-Control-Allow-Origin': '*',
  //     'Cache-Control':
  //       'no-cache, no-store, must-revalidate, max-age=-1, private'
  //   },
  //   validateStatus: status => status >= 200 && status <= 505
  // });
  // const { status, data } = response;
  dispatch(getSolutionsSuccess(solutionsArray));
};

// Preventing dobule fetching data
/* istanbul ignore next */
// const shouldFetchGetSolutions = (state: ReduxState): boolean => {
//   // In development, we will allow action dispatching
//   // or your reducer hot reloading won't updated on the view
//   if (__DEV__) return true;
//
//   console.log(state);
//   if (state.getSolutionsReducer.readyStatus === GET_SOLUTIONS_SUCCESS)
//     return false; // Preventing double fetching data
//
//   return true;
// };

/* istanbul ignore next */
export const fetchGetSolutionsIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) =>
  /* istanbul ignore next */
  // if (shouldFetchGetSolutions(getState())) {
  /* istanbul ignore next */
  dispatch(fetchGetSolutions(axios));
// }

/* istanbul ignore next */
// return null;
