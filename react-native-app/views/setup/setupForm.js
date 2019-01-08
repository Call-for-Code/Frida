import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Keyboard  } from 'react-native';
import { Container, Header, Button, Icon, Content, Item, Radio, Input, ListItem, Left, Right } from 'native-base';
import CustomTitle from '../common/customTitle';
import { Entypo } from '@expo/vector-icons';
import { Location, Notifications, Permissions } from 'expo';
import SetupAPI from '../../api/setup';

const pages = ['Role', 'Location', 'Notifications', 'Institution'];

class SetupForm extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			role: 'teacher',
			longitude: null,
			latitude: null,
			nextDisabled: false,
			institutions: null,
			institution: '',
			institutionId: null,
			locationId: null,
			notificationToken: null
		};
	}

	componentWillMount() {
		this.setState(this.props.navigation.state.params.state, () => {
			const title = this.props.navigation.state.params.title;
			const current = pages.indexOf(title);
			if (current === 1) {
				this._getLocationAsync();
			} else if (current === 2) {
				this._allowNotificationsAsync();
			} else if (current === 3) {
				this.setState({ nextDisabled: true });
				SetupAPI.getInstitutions(this.state.longitude, this.state.latitude)
				.then(institutions => {
					this.setState({ institutions, nextDisabled: false });
				});
			}
		});
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
		  this.setState({
			errorMessage: 'Permission to access location was denied',
		  });
		  return;
		}
	
		let location = await Location.getCurrentPositionAsync({});
		this.setState({ 
			longitude: location.coords.longitude,
			latitude: location.coords.latitude
		 }, () => {
			this.onPressNext();
		 });
	};

	_allowNotificationsAsync = async () => {
		return this.onPressNext();
		const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

		if (status !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			if (status !== 'granted') {
				return;
			}
		}

		const notificationToken = await Notifications.getExpoPushTokenAsync();
		
		this.setState({
			notificationToken,
		}, () => {
			this.onPressNext();
		});
	}

	onPressNext() {
		const title = this.props.navigation.state.params.title;
		let nextRouteName = pages[pages.indexOf(title) + 1];
		if (!nextRouteName) {
			if (!this.state.locationId || !this.state.institutionId) {
				alert('Please select a listed institution');
				return;
			}
			this.setState({ nextDisabled: true }, () => {
				this.props.navigation.state.params.onFinishSetup({
					role: this.state.role,
					institutionId: this.state.institutionId,
					institution: this.state.institution,
					locationId: this.state.locationId,
					notificationToken: this.state.notificationToken,
				});
			});
			// nextRouteName = 'Home'
			// this.props.navigation.dispatch({
			// 	type: 'Reset',
			// 	index: 0,
			// 	actions: [{
			// 		type: 'Navigate',
			// 		routeName: nextRouteName
			// 	}]});
			return;
		}
		this.props.navigation.navigate({
			routeName: nextRouteName,
			params: {
				title: nextRouteName,
				onFinishSetup: this.props.navigation.state.params.onFinishSetup,
				state: this.state
			}
		});
	}

	renderForm() {
		const title = this.props.navigation.state.params.title;
		const current = pages.indexOf(title);
		const radioSelectedColor = '#09B961';
		const forms = [
			(
				<View>
					<Text style={styles.formText}>
						Are you a teacher or first responder?
					</Text>
					<ListItem onPress={() => this.setState({ role: 'teacher' } )}>
						<Left>
							<Text style={[styles.radioText, { color: this.state.role === 'teacher' ? null : '#B3B3B3' }]}>Teacher</Text>
						</Left>
						<Right>
							<Radio
								color={"#f0ad4e"}
								selectedColor={radioSelectedColor}
								selected={this.state.role === 'teacher'}
							/>
						</Right>
					</ListItem>
					<ListItem onPress={() => this.setState({ role: 'firstresponder' } )}>
						<Left>
							<Text style={[styles.radioText, { color: this.state.role === 'firstresponder' ? null : '#B3B3B3' }]}>First Responder</Text>
						</Left>
						<Right>
							<Radio
								color={"#f0ad4e"}
								selectedColor={radioSelectedColor}
								selected={this.state.role === 'firstresponder'}
							/>
						</Right>
					</ListItem>
				</View>
			),
			(
				<View style={styles.allowLocationContainer}>
					<Text style={styles.allowLocationText}>Press 'Allow' to let Frida know your location</Text>
				</View>
			),
			(
				<View style={styles.allowLocationContainer}>
					<Text style={styles.allowLocationText}>Press 'Allow' to let Frida send your notifications</Text>
				</View>
			),
			(
				<View>
					<Item style={styles.inputItem} regular>
						<Input placeholder='Institution Name' style={styles.input} 
							   onChangeText={(institution) => this.setState({institution})}
							   value={this.state.institution} />
					</Item>
					<View>
						{
							this.state.institutions && this.state.institution !== '' ? 
							this.state.institutions
								.filter(obj => obj.name.toLowerCase().indexOf(this.state.institution.toLowerCase()) != -1 && obj.name !== this.state.institution)
								.filter((i, index) => (index < 4))
								.map(obj => {
									return (
										<TouchableOpacity key={obj.id} onPress={() => {
											Keyboard.dismiss();
											this.setState({
												institution: obj.name,
												institutionId: obj.id,
												locationId: obj.locationId
											});
										}} style={styles.suggestionRow}>
											<Text style={styles.suggestionRowText}>
												{obj.name}
											</Text>
										</TouchableOpacity>
									);
								})
							: null
						}
						
					</View>
				</View>
			)
		];
		return (
			<View style={styles.formContainer}>
				{forms[current]}
			</View>
		);
	}
	renderDots() {
		const title = this.props.navigation.state.params.title;
		const current = pages.indexOf(title);
		if (current === 1 || current === 2) {
			return;
		}
		return (
			<View style={styles.dotsContainer}>
				{(() => {
					o = []
					for(let x = 0; x < pages.length; x ++) {
						const color = x === current ? "#09B961" : "#DEDEDE";
						o.push((
							<Entypo key={x} name="dot-single" size={40} color={color} />
						));
					}
					return o;
				})()}
			</View>
		);
	}
	renderNext() {
		const title = this.props.navigation.state.params.title;
		const current = pages.indexOf(title);
		if (current === 1 || current === 2) {
			return;
		}
		return (
			<View style={styles.buttonContainer}>
				<Button style={styles.button}
								onPress={this.onPressNext.bind(this)}
								success
								disabled={this.state.nextDisabled}>
					<Text style={styles.buttonText}>{this.state.nextDisabled ? 'Loading...' : 'Next' }</Text>
				</Button>
			</View>
		);
	}
	render() {
		return (
			<Container style={styles.container}>
                <Header>
					<Button transparent>
                        <Icon name="ios-arrow-back" style={{ color: 'transparent' }}/>
                    </Button>

                    <CustomTitle>
						{this.props.navigation.state.params.title}
					</CustomTitle>

                    <Button transparent>
                        <Icon name="ios-menu" style={{ color: 'transparent' }}/>
                    </Button>
                </Header>
				<Content style={styles.content}>
					{this.renderForm()}
					{this.renderDots()}
					{this.renderNext()}
				</Content>
            </Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
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
		color: '#fff',
		fontSize: 18,
		textAlign: 'center'
	},
	dotsContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	formContainer: {
		flex: 1,
		height: 250,
	},
	inputItem: {
		marginBottom: 10
	},
	formText: {
		textAlign: 'center',
		fontSize: 18,
		marginBottom: 25
	},
	radioText: {
		fontSize: 16
	},
	allowLocationContainer: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 60,
	},
	allowLocationText: {
		fontSize: 20,
		textAlign: 'center',
	},
	suggestionRow: {
		padding: 10
	},
	suggestionRowText: {
		fontSize: 16
	}
});

export default SetupForm;
