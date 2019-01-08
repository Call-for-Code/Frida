import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import UserInfoStorage from '../../storage/userInfo';

class SideBar extends Component {
	state = {
		name: null,
		messagesMenu: false
	};

	MENU_OPTIONS = [
		{
			id: 'School',
			title: 'My School',
			icon: <Image style={{ marginBottom: 2 }} source={require('../../assets/school-icon.png')} />
		},
		{
			id: 'Message',
			title: 'Messages',
			count: 1,
			onPress: () => { this.setState({ messagesMenu: true }) },
			icon: <Image style={{ marginBottom: 2 }} source={require('../../assets/messages-icon.png')} />
		},
		{
			id: 'Guides',
			title: 'Guides',
			icon: <Image style={{ marginBottom: 2 }} source={require('../../assets/guides-icon.png')} />
		},
		{
			id: 'Reports',
			title: 'Reports',
			icon: <Image style={{ marginBottom: 2 }} source={require('../../assets/report-icon.png')} />
		},
		{
			id: 'Forecasts',
			title: 'Forecasts',
			icon: <Image style={{ marginBottom: 2 }} source={require('../../assets/cloud-icon.png')} />
		},
		{
			id: 'Settings',
			title: 'Settings',
			icon: <Image style={{ marginBottom: 2 }} source={require('../../assets/settings-icon.png')} />
		}
	];

	componentWillMount() {
		UserInfoStorage.get('name')
		.then((name) => this.setState({ name }));
	}
	onClickOption(name, title) {
		const id = name;
		if (name.indexOf('Chat-') !== -1){
			name = 'Chat';
		} else {
			this.props.close();
		}
		this.props.navigation.navigate({
			routeName: name,
			params: {
				id,
				title,
				onLogout: this.props.onLogout
			}
		});
	}
	renderTopSection() {
		if (this.state.messagesMenu) {
			return(
				<View style={styles.topSection}>
					<Image style={styles.messagesLogo}
							source={require('../../assets/messages-icon.png')} />
					<View style={styles.topSectionRows}>
						<Text style={styles.nameText}>Messages</Text>
						<TouchableOpacity style={{flex: 1}} onPress={() => { this.setState({ messagesMenu: false }) }}>
							<View style={{ flexDirection: 'row', justifyContent: 'center', paddingLeft: 10 }}>
								<Icon name="ios-arrow-back" style={{ fontSize: 16, color:'#09B961' }}/>
								<Text style={[styles.viewProfileText, { paddingLeft: 5 }]}>Back to main menu</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			);
		}
		return(
			<View style={styles.topSection}>
				<Image style={{ marginBottom: 5 }}
						source={require('../../assets/profile-icon.png')} />
				<View style={styles.topSectionRows}>
					<Text style={styles.nameText}>{this.state.name}</Text>
					<TouchableOpacity style={{flex: 1}} onPress={() => this.onClickOption.bind(this)('Profile')}>
						<Text style={styles.viewProfileText}>View My Profile</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
	renderMenuSection() {
		let menuOptions = this.MENU_OPTIONS;
		if (this.state.messagesMenu) { 
			menuOptions = [
				{
					id: 'Chat-231231',
					title: 'My Classsroom',
				},
				{
					id: 'Chat-231242',
					title: 'Emergency Group',
					count: 1
				},
				{
					id: 'Chat-4353243',
					title: 'Lydia Li'
				}
			];
		}
		return (
			<View style={styles.menuSection}>
				{
					menuOptions.map((menuOption) => {
						return (
							<TouchableOpacity key={menuOption.id} 
											  onPress={menuOption.onPress ? menuOption.onPress : () => this.onClickOption.bind(this)(menuOption.id, menuOption.title)}>
								<View style={styles.menuItem}>
									{menuOption.icon}
									<Text style={[styles.menuItemText, { fontWeight: menuOption.count ? 'bold' : 'normal' }]}>
										{menuOption.title}
									</Text>
									{
										menuOption.count ? 
										<View style={styles.countContiner}>
											<Text style={styles.countText}>{menuOption.count}</Text>
										</View> : null
									}
								</View>
							</TouchableOpacity>
						);
					})
				}
			</View>
		);
	}
	render() {
		return (
			<View style={styles.content}>
			{this.renderTopSection.bind(this)()}
			{this.renderMenuSection.bind(this)()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: '#FAFAFA',
	},
	topSection: {
		flexDirection: 'row',
		paddingBottom: 25,
		paddingLeft: 20,
		paddingTop: 50,
		backgroundColor: '#fff',
	},
	topSectionRows: {
		flex: 1
	},
	nameText: {
		color: '#091A33',
		fontSize: 22,
		paddingLeft: 10,
		paddingBottom: 15,
		flex: 1
	},
	viewProfileText: {
		color: '#09B961',
		fontSize: 13,
		paddingLeft: 10,
		flex: 1,
	},
	menuSection: {
		flex: 1,
		paddingLeft: 30,
		backgroundColor: '#FAFAFA',
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 30
	},
	menuItemText: {
		color: '#091A33',
		paddingLeft: 10,
		fontSize: 18,
		flex: 1
	},
	messagesLogo: {
		marginTop: 5,
		marginBottom: 18,
		marginLeft: 15
	},
	countContiner: {
		marginRight: 20,
		backgroundColor: 'red',
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10
	},
	countText: {
		color: '#fff',
		fontWeight: 'bold',
	}
});

export default SideBar;
