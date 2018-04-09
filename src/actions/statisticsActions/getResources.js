/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_RESOURCES_REQUESTING,
  GET_RESOURCES_SUCCESS
  // GET_RESOURCES_FAILURE
} from '../../constants/statisticsConstants/getResourcesConstants';
import { webApiLogin } from '../../config/index';

const getResourcesRequest = () => ({
  type: GET_RESOURCES_REQUESTING,
  isFetching: true
});

const getResourcesSuccess = data => ({
  type: GET_RESOURCES_SUCCESS,
  isFetching: false,
  data
});

// const getResourcesFailure = err => ({
//   type: GET_RESOURCES_FAILURE,
//   isFetching: false,
//   err
// });

export const fetchGetResources = (
  axios: any,
  URL: string = webApiLogin
): ThunkAction => async (dispatch: Dispatch) => {
  const token = cookie.load('token') ? cookie.load('token') : null;
  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const accessToken = cookie.load('accessToken')
    ? cookie.load('accessToken')
    : null;

  dispatch(getResourcesRequest());

  const response = await axios.get(`${URL}/resources`, {
    headers: {
      Authorization: token,
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 200: {
      dispatch(getResourcesSuccess(data));
      break;
    }
    case 401: {
      dispatch(getResourcesRequest());
      dispatch(push('/login'));
      break;
    }
    default: {
      dispatch(
        getResourcesSuccess({
          containers: 'no data',
          deployments: 'no data',
          external_services: 'no data',
          ingresses: 'no data',
          internal_services: 'no data',
          namespaces: 'no data',
          pods: 'no data',
          volumes: 'no data'
        })
      );
    }
    // default: {
    //   dispatch(getResourcesFailure(data.message));
    // }
  }
};

export const fetchGetResourcesIfNeeded = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchGetResources(axios));