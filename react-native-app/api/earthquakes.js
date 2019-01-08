import constants from './constants';
import config from './config';
import UserInfoStorage from '../storage/userInfo';

export default class EarthquakesAPI {

	static getEarthquakes(longitude, latitude, radius) {
		let url = constants.EARTHQUAKES_ENDPOINT;
		url += `?long=${longitude}&lat=${latitude}&radius=${radius}`;
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

}

