import constants from './constants';
import config from './config';
import UserInfoStorage from '../storage/userInfo';

export default class SetupAPI {

	static getInstitutions(longitude, latitude) {
		let url = constants.INSTITUTIONS_ENDPOINT;
		if (config.FAKE_LOCATION) {
			url += `?long=-122.27844&lat=37.868991`;
		} else {
			url += `?long=${longitude}&lat=${latitude}`;
		}
		console.log(url);
		return new Promise((resolve, reject) => {
			UserInfoStorage.get('token')
			.then(token => {
				console.log(`Bearer ${token}`);
				fetch(url, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((response) => {
					return resolve(response.json());
				});
			});
		});
	}

	static setupUser(role, institutionId, locationId, notificationToken) {
		let url = constants.USERS_ENDPOINT;
		console.log(url);
		return new Promise((resolve, reject) => {
			UserInfoStorage.get('token')
			.then(token => {
				console.log(`Bearer ${token}`);
				fetch(url, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						role,
						institutionId,
						locationId,
						notificationToken
					})
				})
				.then((response) => {
					return resolve(response.json());
				});
			});
		});
	}

}

