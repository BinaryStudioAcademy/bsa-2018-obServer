import api from 'src/services/adapter';

function isLoggedInRequest() {
	return api.makeRequest(`/api/checkloggedin`, api.requestType.POST);
}

export default async function() {
	try {
		const response = await isLoggedInRequest();
		return true;
	} catch (error) {
		console.log('tt', error);
		return false;
	}
}
