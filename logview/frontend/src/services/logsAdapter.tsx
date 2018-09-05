import axios from 'axios';

class Api {
	adapter: any;
	requestType: any;

	constructor() {
		this.adapter = axios.create({
			baseURL: 'http://localhost:3060',
			headers: {
                'Content-Type': 'application/json',
			}
		});

		this.requestType = {
			GET: 'get',
			POST: 'post',
			PUT: 'put',
			DELETE: 'delete'
		};
	}

	makeRequest(url: string, type: string, payload?: any, headers?: any) {
		return this.adapter[type](url, payload, headers);
	}
}

export default new Api();