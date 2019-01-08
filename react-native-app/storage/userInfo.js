import Expo, { SQLite } from 'expo';
import StorageUtils from './utils';

export default class UserInfoStorage {

	static set(props) {
		return new Promise (resolve => {
			this.getAll()
			.then(userData =>{
				const keys = Object.keys(props);
				const values = keys.map(key => props[key]);
				let stmt = 'insert into userInfo (' + keys.join(', ') + ') values (' + (new Array(keys.length).fill('?')).join(',') + ');';
				if (userData) {
					const setKeys = keys.map(key => key+=' = ?');
					stmt = 'update userInfo set ' + setKeys.join(', ') + ' where id = 1;';
				}
				StorageUtils.setupUserInfoTable()
				.then(() => {
					StorageUtils.exec(stmt, values)
					.then(res => resolve(res.rows))
					.catch(err => {
						console.log('err');
						console.log(err);
					});
				})
				.catch(err => {
					console.log(err);
				});
			});
		});
	}

	static get(attr) {
		return new Promise (resolve => {
			this.getAll()
      		.then(userData => {
				if (userData && userData[attr]) {
					resolve(userData[attr]);
				} else {
					resolve(null);
				}
			});
		});
	}

	static getAll() {
		return new Promise (resolve => {
			StorageUtils.setupUserInfoTable()
			.then(() => {
				StorageUtils.exec('select * from userInfo where id = ?;', [1])
				.then(res => {
					if (Array.isArray(res.rows) && res.rows.length > 0) {
						resolve(res.rows[0]);
					}
					resolve(null);
				});
			});
		});
	}

}
