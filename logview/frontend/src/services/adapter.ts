import axios, { AxiosInstance } from 'axios';
import config from '../config';

class Api {
	adapter: any;
	requestType: any;

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

	makeRequest(url: string, type: string, payload?: any) {
		return this.adapter[type](url, payload);
	}
}

export default new Api();
