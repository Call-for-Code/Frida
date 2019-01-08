import React, { Component } from 'react';
import { View, StyleSheet, Text  } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './login';
import SetupForm from './setupForm';

class Setup extends Component {

	static navigationOptions = { 
		header: null
	};

	componentWillMount() {
		if (this.props.screenProps.token) {
			this.props.navigation.navigate({
				routeName: 'Role',
				params: {
					title: 'Role',
					onFinishSetup: this.props.screenProps.onFinishSetup
				}
			});
		}
	}

	render() {
    return (
      <View style={styles.container}>
        <Login onFinishSetup = {this.props.screenProps.onFinishSetup} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	}
});

export default createStackNavigator({
  Login: {
		screen: Setup
	},
	Role: {
		screen: SetupForm
	},
	Location: {
		screen: SetupForm
	},
	Notifications: {
		screen: SetupForm
	},
	Institution: {
		screen: SetupForm
	}
},
{
		initialRouteName: 'Login',
		headerMode: null,
		cardStyle: {
			shadowOpacity: 0,
		}
});
