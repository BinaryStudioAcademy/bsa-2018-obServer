import axios from 'axios';

class Api {
	adapter: any;
	requestType: any;

	constructor() {
		const url = window.location.origin;
		this.adapter = axios.create({
			baseURL: url,
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
