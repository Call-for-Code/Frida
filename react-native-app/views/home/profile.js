import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Button, Icon, Content, Item, Input } from 'native-base';
import CustomTitle from '../common/customTitle';
import UserInfoStorage from '../../storage/userInfo'

class Profile extends Component {

  static navigationOptions = {
	  header: null
  };

  state = {
	  editMode: false,
	  name: null,
	  fields: [
			{ title: 'Phone Number', key: 'phoneNumber', value: null },
			{ title: 'Email', key: 'email', value: 'test@gmail.com' }, // Fake Value
			{ title: 'Location', key: 'location', value: 'San Francisco, CA' }, // Fake Value
			{ title: 'School', key: 'institution', value: null },
			{ title: 'Frida Class Group', key: 'classGroup', value: null },
			{ title: 'My EMS Contact', key: 'emsContact', value: '4162324561' } // Fake Value
		]
  };

  componentWillMount() {
	UserInfoStorage.getAll()
	.then((userData) => {
		const newState = this.state;
		newState.name = userData.name;
		this.state.fields.map((field, index) => {
			if (userData[field.key]) {
				newState.fields[index].value = userData[field.key]
			} else {
				newState.fields[index].fake = true;
			}
		});
		this.setState(newState);
	});
  }

  renderFieldInput(field, index) {
	return (
		<View style={styles.fieldContainer} key={field.title}>
			<Text style={styles.fieldLabelText}>{field.title}</Text>
			<Item style={styles.fieldInputItem} regular>
				<Input style={styles.fieldInput} 
					   value={field.value}
					   disabled={!this.state.editMode}
					   onChangeText={(text) => {
						   const state = this.state;
						   state.fields[index].value = text;
						   this.setState(state);
					   }} />
			</Item>
		</View>
	);
  }

  renderMyMedicalId() {
	  return (
		<TouchableOpacity onPress={() => {
				this.props.navigation.navigate({
					routeName: 'Medical'
				});
			}}>
			<View style={styles.fieldContainer}>
				<View style={styles.myMedicalIdContainer}>
					<Icon name='ios-medical' style={{color: 'red', marginTop: 5, marginRight: 10}} />
					<Text style={styles.myMedialIDText}>
						My Medical ID
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	  );
  }

  onPressEditSave() {
	if (this.state.editMode) {
		const setValues = {};
		this.state.fields.map((field) => {
			if (!field.fake) {
				setValues[field.key] = field.value;
			}
		});
		UserInfoStorage.set(setValues);
	}
	this.setState({ editMode: !this.state.editMode });
  }

  render() {
		return (
			<Container style={styles.container}>
				<Header>
					<Button onPress={() => this.props.navigation.pop()}
							transparent>
						<Icon name="ios-arrow-back" />
					</Button>

					<CustomTitle>
						Profile
					</CustomTitle>

					<Button transparent>
						<Icon name="ios-notifications-outline" style={{color: 'transparent'}}/>
					</Button>
				</Header>
				<View style={styles.content}>
					<View style={styles.topSection}>
						<Image style={styles.profileImage}
							   source={require('../../assets/profile-icon-large.png')} />
						<View style={styles.nameContainer}>
							<Text style={styles.nameText}>{this.state.name}</Text>
						</View>
						<TouchableOpacity style={styles.editButton} onPress={this.onPressEditSave.bind(this)}>
							<Text style={styles.editText}>{this.state.editMode ? 'Save' : 'Edit'}</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.bottomSection}>
						{this.state.fields.map(this.renderFieldInput.bind(this))}
						{this.renderMyMedicalId()}
					</View>
				</View>
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
		backgroundColor: '#fff',
	},
	profileImage: {

	},
	topSection: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 15,
		paddingBottom: 15
	},
	nameText: {
		fontSize: 22
	},
	bottomSection: {
		flex: 1,
		backgroundColor: '#FAFAFA',
		padding: 20,
	},
	editButton: {
		position: 'absolute',
		right: 10,
		top: 10
	},
	editText: {
		color: '#09B961',
		fontSize: 13,
	},
	fieldLabelText: {
		color: '#091A33'
	},
	fieldInputItem: {
		flex: 1,
		marginTop: 25,
		marginBottom: 10
	},
	fieldInput: {
		marginBottom: 10,
		paddingBottom: 20,
		paddingLeft: 0
	},
	myMedicalIdContainer: {
		flexDirection: 'row'
	},
	myMedialIDText: {
		color: 'red',
		fontSize: 18,
		paddingTop: 10,
		alignItems: 'center'
	}
});

export default Profile;
