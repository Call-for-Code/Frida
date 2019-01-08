import Expo, { SQLite } from 'expo';
const SQLLITE_FILE_NAME = 'local.db';

const CREATE_USERINFO_TABLE_STMT = `
	create table if not exists userInfo (
		id integer primary key autoincrement, 
		name text,
		phoneNumber text,
		email text,
		token text,
		emsContact text,
		role text,
		institution text, 
		institutionId text, 
		locationId text, 
		notificationToken text
	);`;
const DROP_USERINFO_TABLE_STMT = 'drop table if exists userInfo';

export default class StorageUtils {

	static getDB() {
		return new Promise((resolve, reject) => {
			resolve(SQLite.openDatabase(SQLLITE_FILE_NAME));
		});
	}

	static setupUserInfoTable() {
		return new Promise((resolve, reject) => {
			this.exec(CREATE_USERINFO_TABLE_STMT)
			.then(res => resolve())
			.catch(err => reject(err));
		});
	}

	static dropUserInfoTable() {
		return new Promise((resolve, reject) => {
			this.exec(DROP_USERINFO_TABLE_STMT)
			.then(res => resolve())
			.catch(err => reject(err));
		});
	}

	static exec(stmt, args=[]) {
		console.log(stmt);
		console.log(args);
		return new Promise((resolve, reject) => {
			this.getDB()
			.then(db => {
				db.transaction(tx => {
					tx.executeSql(
						stmt,
						args,
						(_, { rows: { _array } }) => resolve({ db, rows: _array }),
						(err) => reject(err)
					);
				});
			});
		});
	}

}
