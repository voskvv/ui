/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_GROUP_REQUESTING,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE
} from '../../constants/globalMembershipConstants/deleteGroup';
import { webApi } from '../../config/index';

const deleteGroupRequest = () => ({
  type: DELETE_GROUP_REQUESTING,
  isFetching: true
});

const deleteGroupSuccess = data => ({
  type: DELETE_GROUP_SUCCESS,
  isFetching: false,
  data
});

const deleteGroupFailure = err => ({
  type: DELETE_GROUP_FAILURE,
  isFetching: false,
  err
});

const deleteGroupInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteGroup = (
  id: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');
  dispatch(deleteGroupRequest());

  console.log(id);
  const response = await axios.delete(`${URL}/groups/${id}`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { status, data } = response;
  switch (status) {
    case 202: {
      dispatch(deleteGroupSuccess(data));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteGroupInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(deleteGroupFailure(data.message));
      break;
    }
    // default: {
    //   dispatch(getNamespacesSuccess([]));
    //   dispatch(push('/login'));
    // }
    default: {
      dispatch(deleteGroupFailure(data.message));
      dispatch(push('/dashboard'));
    }
  }
};

export const fetchDeleteGroupIfNeeded = (id: string): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState,
  axios: any
) => dispatch(fetchDeleteGroup(id, axios));
