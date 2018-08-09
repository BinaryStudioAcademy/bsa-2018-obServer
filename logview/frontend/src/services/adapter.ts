import axios from 'axios';
import config from '../config';

class Api {
	adapter: any;
	requestType: any;

	constructor() {
		this.adapter = axios.create({
			baseURL: config.baseURL,
			headers: {
				'Content-Type': 'application/json'
			}
		});

		this.requestType = {
			GET: 'get',
			POST: 'post',
			PUT: 'put',
			DELETE: 'delete'
		};
	}

	makeRequest(url: string, type: string, payload?: any) {
		return this.adapter[type](url, payload);
	}
}

export default new Api();
