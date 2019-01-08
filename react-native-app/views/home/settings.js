import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Button, Icon, Content } from 'native-base';
import CustomTitle from '../common/customTitle';


class Settings extends Component {

	static navigationOptions = {
		header: null
	};

  constructor(props) {
		super(props);
		this.state = {};
  }

  render() {
	  const { onLogout } = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Button onPress={() => this.props.navigation.pop()}
							transparent>
						<Icon name="ios-arrow-back" />
					</Button>

					<CustomTitle>
						Settings
					</CustomTitle>

					<Button transparent>
						<Icon name="ios-notifications-outline" style={{color: 'transparent'}}/>
					</Button>
				</Header>
				<View style={styles.content}>
					<Button style={styles.button}
							onPress={onLogout}
							success>
						<Text style={styles.buttonText}>Logout</Text>
					</Button>
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
		flexDirection: 'row',
		backgroundColor: '#fff',
		padding: 20
	},
	button: {
		flex: 1,
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 18,
		color: '#fff'
	}
});

export default Settings;
