import React, { Component } from 'react';
import { View, StyleSheet, Image, Keyboard, TouchableWithoutFeedback  } from 'react-native';
import { Input, Item, Button, Text } from 'native-base';
import AuthAPI from '../../api/auth';
import UserInfoStorage from '../../storage/userInfo';

class Login extends Component {

	state = {
		name: '',
		phoneNumber: '',
		validationCode: '',
		errorMessage: '',
		id: null,
		validate: false,
		processing: false
	};

	onSubmit() {
		if (this.state.name === ''  || !this.state.phoneNumber === '') {
			this.setState({ errorMessage: 'Name and phone number required' });
			return;
		}
		if (this.state.validate) {
			if (this.state.validationCode === '') {
				this.setState({ errorMessage: 'Validation code required' });
				return;
			}
			this.setState({
				errorMessage: '',
				processing: true
			}, () => {
				AuthAPI.validate(this.state.id, this.state.validationCode)
				.then(res => {
					console.log(res);
					if (res.token) {
						UserInfoStorage.set({
							name: this.state.name,
							token: res.token,
							phoneNumber: this.state.phoneNumber
						});
						this.props.navigation.navigate({
							routeName: 'Role',
							params: {
								title: 'Role',
								onFinishSetup: this.props.onFinishSetup
							}
						});
					} else {
						this.setState({ processing: false, errorMessage: 'Internal error - try again' });
					}
				})
				.catch(err => {
					console.log(err);
				});
			});
			return;
		}
		this.setState({
			errorMessage: '',
			processing: true
		}, () => {
			AuthAPI.auth(this.state.name, this.state.phoneNumber)
			.then(res => {
				console.log(res);
				if (res.id) {
					this.setState({
						validate: true,
						processing: false,
						id: res.id
					});
				} else {
					this.setState({ processing: false, errorMessage: 'Internal error - try again' });
				}
			})
			.catch(err => {
				console.log(err);
			});
		});
	}
	renderAuthFields() {
		return (
			<View style={styles.fieldsContainer}>
				<Item style={styles.inputItem} regular>
					<Input placeholder='Name'
							style={styles.input}
							onChangeText={(name) => this.setState({name})}
							value={this.state.name} />
				</Item>
				<Item style={styles.inputItem} regular>
					<Input keyboardType='numeric' 
								placeholder='Phone Number'
								style={styles.input}
								onChangeText={(phoneNumber) => this.setState({phoneNumber})}
								value={this.state.phoneNumber} />
				</Item>
			</View>
		);
	}
	renderValidateField() {
		return (
			<View style={styles.fieldsContainer}>
				<Item style={styles.inputItem} regular>
					<Input keyboardType='numeric' 
								placeholder='Validation Code'
								style={styles.input}
								onChangeText={(validationCode) => this.setState({validationCode})}
								value={this.state.validationCode} />
				</Item>
			</View>
		);
	}
	render() {
		return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.container}>
					<Image style={styles.logo}
								source={require('../../assets/icon2.png')} />
					<Text style={styles.title}> frida </Text>
					<View style={{ flexDirection: 'row'}}>
					{
						this.state.validate ? this.renderValidateField() : this.renderAuthFields()
					}
					</View>
					{
						this.state.errorMessage !== '' ?
						<Text style={styles.errorMessage} > {this.state.errorMessage} </Text>
						: <Text></Text>
					}
					<View style={styles.buttonContainer}>
						<Button style={styles.button}
										onPress={this.onSubmit.bind(this)}
										success
										disabled={this.state.processing}>
							<Text style={styles.buttonText}>{this.state.processing ? 'Processing...' : 'Next' }</Text>
						</Button>
					</View>
			</View>
		</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 20,
		paddingRight: 20,
		marginBottom: 180,
	},
	logo: {
		marginBottom: 10,
	},
	title: {
		fontSize: 80,
		marginBottom: 30,
		color: '#091A33'
	},
	inputItem: {
		marginBottom: 10
	},
	input: {
		borderRadius: 20,
		color: '#091A33'
	},
	buttonContainer: {
		flexDirection: 'row',
		marginTop: 15,
	},
	button: {
		flex: 1
	},
	buttonText: {
		flex: 1,
		textAlign: 'center'
	},
	errorMessage: {
		color: 'red'
	},
	fieldsContainer: {
		flex: 1
	}
  });
  

export default Login;
