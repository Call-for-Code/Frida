import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Container, Header, Button, Icon, Content } from 'native-base';
import CustomTitle from '../common/customTitle';

class School extends Component {

	static navigationOptions = {
		header: null
	};

  constructor(props) {
		super(props);
		this.state = {};
  }

  renderContent() {
	  const { showEscapeRoute } = this.props.navigation.state.params;
	  let img = <Image style={{ marginBottom: 2 }} source={require('../../assets/school-example.png')} />;
	  if (showEscapeRoute) {
		img = <Image style={{ marginBottom: 2, height: 400, width: 370}} source={require('../../assets/school-example-route.png')} />;
	  }
	  return (
		<View style={styles.innerContentContainer}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>
					Marlborough School
				</Text>
				<Text style={styles.headerDescription}>
					Los Angeles, CA
				</Text>
				<Text style={styles.headerDropdown}>
					My School Exits
				</Text>
			</View>
			{img}
		</View>
	  );
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
						My School
					</CustomTitle>

					<Button transparent>
						<Icon name="ios-notifications-outline" style={{color: 'transparent'}}/>
					</Button>
				</Header>
				<View style={styles.content}>
					{ this.renderContent.bind(this)() }
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
	header: {
		padding: 20,
		alignItems: 'center',
		backgroundColor: '#FFF'
	},
	headerTitle: {
		fontSize: 22,
		color: '#091A33'
	},
	headerDescription: {
		fontSize: 13,
		color: '#B7B7B7'
	},
	headerDropdown: {
		color: '#09B961',
		fontSize: 14,
		fontWeight: 'bold',
		paddingTop: 10
	},
	innerContentContainer: {
		backgroundColor: '#FAFAFA'
	}
});

export default School;
