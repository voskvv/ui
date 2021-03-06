/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_NAMESPACE_REQUESTING,
  DELETE_NAMESPACE_SUCCESS,
  DELETE_NAMESPACE_FAILURE
} from '../../constants/namespaceConstants/deleteNamespace';
import { webApi } from '../../config';

const deleteNamespaceRequest = () => ({
  type: DELETE_NAMESPACE_REQUESTING,
  isFetching: true
});

const deleteNamespaceSuccess = (data, status, method, idName, idLabel) => ({
  type: DELETE_NAMESPACE_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idName,
  idLabel
});

const deleteNamespaceFailure = (err, status, idName) => ({
  type: DELETE_NAMESPACE_FAILURE,
  isFetching: false,
  err,
  status,
  idName
});

const deleteNamespaceInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeleteNamespace = (
  idName: string,
  idLabel: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(deleteNamespaceRequest());

  const response = await axios.delete(`${URL}/namespaces/${idName}`, {
    headers: {
      'User-Client': browser,
      'User-Token': accessToken
    },
    validateStatus: status => status >= 200 && status <= 505
  });
  const { data, status, config } = response;
  switch (status) {
    case 200: {
      dispatch(
        deleteNamespaceSuccess(data, 202, config.method, idName, idLabel)
      );
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deleteNamespaceInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(deleteNamespaceFailure(data.message, status, idName));
      break;
    }
    default: {
      dispatch(deleteNamespaceFailure(data.message, status, idName));
    }
  }
};

export const fetchDeleteNamespaceIfNeeded = (
  idName: string,
  idLabel: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeleteNamespace(idName, idLabel, axios));
