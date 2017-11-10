import {
    GET_VOLUME_REQUEST,
    GET_VOLUME_SUCCESS,
    GET_VOLUME_FAILURE
} from '../../constants/VolumeConstants';

export default function GetVolumeReducer(state = {
    isFetching: false,
    data: {},
    status: '',
    idVolume: '',
    errorMessage: ''
}, action) {
    switch (action.type) {
    case GET_VOLUME_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: {},
            errorMessage: '',
            status: '',
            idVolume: ''
        });
    case GET_VOLUME_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data,
            status: action.status,
            idVolume: action.idVolume
        });
    case GET_VOLUME_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message,
            status: action.status,
            idVolume: action.idVolume
        });
    default:
        return state;
    }
}
