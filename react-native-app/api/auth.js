import constants from './constants';
import config from './config';
export default class AuthAPI {

	static auth(name, phoneNumber) {
		let url = constants.AUTH_ENDPOINT;
		if (config.FAKE_MODE) {
			url += '?fake=true';
		}
		console.log(url);
		return fetch(url, {
			method: 'POST',
			headers: constants.HEADERS,
			body: JSON.stringify({
				name,
				phoneNumber,
			}),
		})
		.then((response) => {
			return response.json();
		});
	}

	static validate(id, token) {
		let url = constants.AUTH_ENDPOINT + '/' + id;
		if (config.FAKE_MODE) {
			url += '?fake=true';
		}
		console.log(url);
		return fetch(url, {
			method: 'PATCH',
			headers: constants.HEADERS,
			body: JSON.stringify({
				op: 'replace',
				path: '/verificationCode',
				value: token
			}),
		})
		.then((response) => {
			return response.json();
		});
	}

}

