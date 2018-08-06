import axios from 'axios';
import config from '../config';

class Api {
	constructor() {
		this.adapter = axios.create({
			baseURL: config.baseURL
		});

		this.requestType = {
			GET: 'get',
			POST: 'post',
			PATCH: 'patch',
			DELETE: 'delete'
		};
	}

	makeRequest(url, type, payload) {
		return this.adapter[type](url, payload);
	}
}

export default new Api();
