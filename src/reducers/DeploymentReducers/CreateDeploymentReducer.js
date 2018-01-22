import {
	CREATE_DEPLOYMENT_REQUEST,
	CREATE_DEPLOYMENT_SUCCESS,
	CREATE_DEPLOYMENT_FAILURE
} from '../../constants/CreateDeploymentConstants';

export default function CreateDeploymentReducer(state = {
	isFetching: false,
	data: {},
	status: '',
	idName: '',
	errorMessage: ''
}, action) {
	switch (action.type) {
		case CREATE_DEPLOYMENT_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				data: {},
				errorMessage: '',
				status: '',
				idName: ''
			});
		case CREATE_DEPLOYMENT_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				data: action.data,
				status: action.status,
				idName: action.idName
			});
		case CREATE_DEPLOYMENT_FAILURE:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				errorMessage: action.message,
				status: action.status,
				idName: action.idName
			});
		default:
			return state;
	}
}
