/* @flow */

import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import type { Dispatch, GetState, ThunkAction } from '../../types/index';
import {
  GET_POD_REQUESTING,
  GET_POD_SUCCESS,
  GET_POD_FAILURE
} from '../../constants/podConstants/getPod';
// import isTokenExist from '../functions/isTokenExist';
import { webApi } from '../../config/index';

const getPodRequest = () => ({
  type: GET_POD_REQUESTING,
  isFetching: true
});

const getPodSuccess = (data, status, idName, idDep, idPod) => ({
  type: GET_POD_SUCCESS,
  isFetching: false,
  data,
  status,
  idName,
  idDep,
  idPod
});

const getPodFailure = (err, status, idName, idDep, idPod) => ({
  type: GET_POD_FAILURE,
  isFetching: false,
  err,
  status,
  idName,
  idDep,
  idPod
});

const getPodInvalidToken = () => ({
  type: 'GET_INVALID_TOKEN'
});

export const fetchGetPod = (
  idName: string,
  idDep: string,
  idPod: string,
  axios: any,
  URL: string = webApi
): ThunkAction => async (dispatch: Dispatch) => {
  const browser = cookie.load('browser');
  const accessToken = cookie.load('accessToken');

  dispatch(getPodRequest());

  const response = await axios.get(
    `${URL}/namespaces/${idName}/pods/${idPod}`,
    {
      headers: {
        'User-Client': browser,
        'User-Token': accessToken
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
  const { status, data } = response;
  // console.log(data);
  switch (status) {
    case 200: {
      dispatch(getPodSuccess(data, status, idName, idDep, idPod));
      break;
    }
    case 400: {
      if (data.message === 'invalid token received') {
        dispatch(getPodInvalidToken());
      } else if (data.message === 'invalid request body format') {
        dispatch(push('/login'));
      } else
        dispatch(getPodFailure(data.message, status, idName, idDep, idPod));
      break;
    }
    default: {
      dispatch(getPodFailure(data.message, status, idName, idDep, idPod));
    }
  }
};

export const fetchGetPodIfNeeded = (
  idName: string,
  idDep: string,
  idPod: string
): ThunkAction => (dispatch: Dispatch, getState: GetState, axios: any) =>
  dispatch(fetchGetPod(idName, idDep, idPod, axios));
