/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  DELETE_POD_REQUESTING,
  DELETE_POD_SUCCESS,
  DELETE_POD_FAILURE
} from '../../constants/podConstants/deletePod';
import { webApi } from '../../config';

const deletePodRequest = () => ({
  type: DELETE_POD_REQUESTING,
  isFetching: true
});

const deletePodSuccess = (data, status, method, idPod, idName) => ({
  type: DELETE_POD_SUCCESS,
  isFetching: false,
  data,
  status,
  method,
  idName,
  idPod
});

const deletePodFailure = (err, status, idPod, idName) => ({
  type: DELETE_POD_FAILURE,
  isFetching: false,
  err,
  status,
  idName,
  idPod
});

const deletePodInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchDeletePod = (
  idName: string,
  idPod: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(deletePodRequest());

  const response = await axios.delete(
    `${URL}/namespaces/${idName}/pods/${idPod}`,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { data, status, config } = response;
  switch (status) {
    case 202: {
      dispatch(deletePodSuccess(data, status, config.method, idPod));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(deletePodInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else dispatch(deletePodFailure(data.message, status, idPod, idName));
      break;
    }
    default: {
      dispatch(deletePodFailure(data.message, status, idPod, idName));
    }
  }
};

export const fetchDeletePodIfNeeded = (
  idName: string,
  idPod: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchDeletePod(idName, idPod, axios));
