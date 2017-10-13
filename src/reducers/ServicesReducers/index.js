import {
    SERVICES_REQUEST,
    SERVICES_SUCCESS,
    SERVICES_FAILURE
} from '../../constants/ServicesConstants';

export default function ServicesReducer(state = {
    isFetching: false,
    data: [],
    errorMessage: '',
    statusError: 200
}, action) {
    switch (action.type) {
    case SERVICES_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: [],
            errorMessage: '',
            statusError: 200
        });
    case SERVICES_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case SERVICES_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message,
            statusError: action.status
        });
    default:
        return state;
    }
}