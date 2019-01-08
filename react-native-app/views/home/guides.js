import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity	 } from 'react-native';
import { Container, Header, Button, Icon, Content } from 'native-base';
import CustomTitle from '../common/customTitle';

class Guides extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
	guides: [
		{ id: 'earthquake', title: 'Earthquake', icon: <Image source={require('../../assets/earthquake-guide-icon.png')} /> },
		{ id: 'volcano', title: 'Volcanic Eruption', icon: <Image source={require('../../assets/volcanic-guide-icon.png')} /> },
		{ id: 'flooding', title: 'Flooding', icon: <Image source={require('../../assets/flooding-guide-icon.png')} /> },
		{ id: 'landslide', title: 'Landslide', icon: <Image source={require('../../assets/landslide-guide-icon.png')} /> },
		{ id: 'hurricane', title: 'Hurricane', icon: <Image source={require('../../assets/hurricane-guide-icon.png')} /> },
		{ id: 'tornado', title: 'Tornado', icon: <Image source={require('../../assets/tornado-guide-icon.png')} /> }
	]
  };

  renderCard(card) {
	return (
		<TouchableOpacity onPress={() => {
				this.props.navigation.navigate({
					routeName: 'Guide',
					params: {
						id: card.id,
						title: card.title,
						icon: card.icon
					}
				});
			}}>
			<View style={styles.cardContainer} key={card.title}>
				{ card.icon ? card.icon : null}
				<Text style={styles.cardTitleText}>{card.title}</Text>
			</View>
		</TouchableOpacity>
	);
  }

  renderCards() {
		const cardsInEachRow = 2;
		const { guides } = this.state;
		const cardRows = [];
		for (const i = 0; i < guides.length; i += cardsInEachRow) {
			const cardRow = [];
			for (const j=0; j < cardsInEachRow; j+= 1) {
				if (guides[i+j]) {
					cardRow.push(
						<View key={i+j} style={{flex: 1}}>
							{this.renderCard.bind(this)(guides[i+j])}
						</View>
					);
				}
			}
			cardRows.push(
				<View key={i} style={styles.cardRowContainer}>
					{ cardRow }
				</View>
			);
		}
		return (
			<View style={styles.cardsContainer}>
				{ cardRows }
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
					Guides
					</CustomTitle>

					<Button transparent>
						<Icon name="ios-notifications-outline" style={{color: 'transparent'}}/>
					</Button>
				</Header>
				<Content style={styles.content}>
					{ this.renderCards.bind(this)() }
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
	cardsContainer: {
		flex: 1,
		flexDirection: 'column',
		padding: 10
	},
	cardRowContainer: {
		flexDirection: 'row'
	},
	cardContainer: {
		flexDirection: 'column',
		borderRadius: 4,
		borderWidth: 1,
		margin: 10,
		borderColor: '#D8D8D8',
		backgroundColor: '#FAFAFA',
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cardTitleText: {
		paddingTop: 10
	}
});

export default Guides;
