import axios from 'axios';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token');

import {
    SERVICES_REQUEST,
    SERVICES_SUCCESS,
    SERVICES_FAILURE
} from '../../constants/ServicesConstants';

export function getServices(namespaceName) {
    return dispatch => {
        dispatch(requestGetServices());
        const api = 'http://139.59.146.89/api/namespaces/' + namespaceName + '/services';

        return axios.get(
            api,
            {
                validateStatus: (status) => status >= 200 && status <= 500
            }
        )
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                console.log(response);
                dispatch(receiveGetServices(response.data));
            } else {
                dispatch(failGetServices(response.data.message))
            }
        }).catch(err => console.log(err))
    }
}

function requestGetServices() {
    return {
        type: SERVICES_REQUEST,
        isFetching: true
    }
}

function receiveGetServices(data) {
    return {
        type: SERVICES_SUCCESS,
        isFetching: false,
        data
    }
}

function failGetServices(message) {
    return {
        type: SERVICES_FAILURE,
        isFetching: false,
        message
    }
}
