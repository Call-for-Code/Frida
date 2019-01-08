import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Button, Icon, Content } from 'native-base';
import CustomTitle from '../common/customTitle';
import guidesContent from '../../assets/guidesContent';

class Guide extends Component {

	static navigationOptions = {
		header: null
	};

  constructor(props) {
		super(props);
		this.state = {};
  }

  renderSections() {
	const { id } = this.props.navigation.state.params;
	const guideContent = guidesContent[id];
	return guideContent.sections.map((sectionContent, index) => (
		<View style={styles.sectionContainer} key={index}>
			<Text style={styles.sectionTitle}>
				{sectionContent.title}
			</Text>
			<Text style={styles.sectionBody}>
				{sectionContent.body}
			</Text>
		</View>	
	));
  }

  renderContent() {
	const { icon, id } = this.props.navigation.state.params;
	const guideContent = guidesContent[id];
	return (
		<View style={styles.contentContainer}>
			<View style={styles.headerContainer}>
				{icon}
				<Text style={styles.headerTitleText}>
					{guideContent.title}
				</Text>
			</View>
			<View style={styles.bodyContainer}>
				<Text style={styles.bodyDescriptionText}>
					{guideContent.description}
				</Text>
				<View>
					{this.renderSections()}
				</View>
			</View>
		</View>
	);
  }

  render() {
	  const { title } = this.props.navigation.state.params;
	  return (
	  	<Container style={styles.container}>
		  <Header>
			  <Button onPress={() => this.props.navigation.pop()}
			  			transparent>
					<Icon name="ios-arrow-back" />
				</Button>

				<CustomTitle>
					{title}
				</CustomTitle>

				<Button transparent>
					<Icon name="ios-notifications-outline" style={{color: 'transparent'}}/>
				</Button>
			</Header>
			<Content style={styles.content}>
				{this.renderContent.bind(this)()}
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
		backgroundColor: '#fff',
	},
	contentContainer: {
		flex: 1,
	},
	headerContainer: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 20,
		paddingBottom: 20
	},
	headerTitleText: {
		fontSize: 20,
		color: '#091A33',
		paddingTop: 10
	},
	bodyContainer: {
		flex: 1,
		backgroundColor: '#FAFAFA',
		padding: 20
	},
	bodyDescriptionText: {
		fontSize: 12
	},
	sectionContainer: {
		paddingTop: 10,
	},
	sectionTitle: {
		paddingLeft: 10,
		paddingBottom: 10,
		color: '#09B961',
		fontSize: 16,
		fontWeight: 'bold',
	},
	sectionBody: {
		fontSize: 12
	}
});

export default Guide;
