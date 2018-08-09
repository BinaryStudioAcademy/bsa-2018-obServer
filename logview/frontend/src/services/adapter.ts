import axios from 'axios';
import config from 'src/config';

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
			PUT: 'put',
			DELETE: 'delete'
		};
	}

	makeRequest(url: string, type: string, payload?: any) {
		return this.adapter[type](url, payload);
	}
}

export default new Api();
