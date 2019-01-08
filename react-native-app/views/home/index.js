import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableWithoutFeedback  } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { MapView, Location } from 'expo';
import { Container, Header, Button, Icon, Content, Drawer } from 'native-base';
import CustomTitle from '../common/customTitle';
import SideBar from './sidebar';
import Profile from './profile';
import Alerts from './alerts';
import School from './school';
import Settings from './settings';
import Medical from './medical';
import Guides from './guides';
import Guide from './guide';
import Chat from './chat';
import EarthquakesAPI from '../../api/earthquakes';

class Home extends Component {
	static navigationOptions = {
		header: null
	};
	state = {
		alertLockMode: false,
		loading: true,
		longitude: null, 
		latitude: null,
		earthquakes: [],
		earthquakesIds: [],
		accuracy: 5000,
		selectedEarthquake: null,
		coverageCircles: []
	}
	componentDidMount() {
		this._getLocationAsync();
	}

	_getLocationAsync = async () => {
		let location = await Location.getCurrentPositionAsync({});

		// location.coords.longitude = -122.27844; // REMOVE ME
		// location.coords.latitude = 37.868991; // REMOVE ME
		
		this.setState({ 
			loading: false,
			longitude: location.coords.longitude,
			latitude: location.coords.latitude,
			coverageCircles: this.state.coverageCircles.concat([{
				longitude: location.coords.longitude,
				latitude: location.coords.latitude
			}])
		 }, () => {
			 this.fetchEarthquakes(location.coords.longitude, location.coords.latitude, this.state.accuracy/7.5);
		 });
	};

	fetchEarthquakes(longitude, latitude, radius) {
		EarthquakesAPI.getEarthquakes(longitude, latitude, radius)
		.then(earthquakes => {
			// alert(earthquakes.length);
			const newEarthquakes = earthquakes.filter(earthquake => this.state.earthquakesIds.indexOf(earthquake.id) === -1);
			const newEarthquakesIds = earthquakes.map(eqs => eqs.id);
			this.setState({
				earthquakesIds: this.state.earthquakesIds.concat(newEarthquakesIds),
				earthquakes: this.state.earthquakes.concat(newEarthquakes)
			});
		});
	}

	getDelta(lat, lon, distance) {
		distance = distance*1000; //in meters
		distance = distance/2
        const circumference = 40075
        const oneDegreeOfLatitudeInMeters = 111.32 * 1000
        const angularDistance = distance/circumference

        const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
        const longitudeDelta = Math.abs(Math.atan2(
                Math.sin(angularDistance)*Math.cos(lat),
                Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

        return result = {
            latitude: lat,
            longitude: lon,
            latitudeDelta,
            longitudeDelta,
        };
	}

	onSelectEarthquake(earthquake) {
		this.setState({
			selectedEarthquake: earthquake
		});
	}

	onRegionChangeComplete(cords) {
		console.log(cords);
		const distances = [];
		if(this.state && this.state.coverageCircles) {
			for (let circleIndex = 0; circleIndex < this.state.coverageCircles.length; circleIndex++) {
				const circle = this.state.coverageCircles[circleIndex];
				if (circle && circle.latitude && circle.longitude) {
					const distance = getDistanceFromLatLonInKm(circle.latitude, circle.longitude, cords.latitude, cords.longitude) * 1000;
					distances.push(distance);
				}
			}
			const shortestDistance = Math.min.apply(Math, distances);
			if (shortestDistance > this.state.accuracy*130) {
				console.log(this.state.accuracy*130);
				this.setState({
					coverageCircles: this.state.coverageCircles.concat([{
						longitude: cords.longitude,
						latitude: cords.latitude
					}])
				}, () => {
					this.fetchEarthquakes(cords.longitude, cords.latitude, this.state.accuracy/7.5);
				});
			}
		}
		

	}

	onTrackEarthquake() {
		this.setState({
			alertLockMode: false
		});
	}

	onAlertEMS() {
		this.props.navigation.navigate({
			routeName: 'Chat',
			params: {
				id: null,
				title: 'My Emergency Responder'
			}
		});
	}

	onViewEscapeRoute() {
		this.props.navigation.navigate({
			routeName: 'School',
			params: {
				showEscapeRoute: true
			}
		});
	}

	renderCoverageCircles() {
		return this.state.coverageCircles.map(circle => 
			<MapView.Circle
					key={`${circle.latitude},${circle.longitude}`}
					center={{
						latitude: circle.latitude,
						longitude: circle.longitude
					}} 
					radius={this.state.accuracy*130}
					strokeWidth={1}
					strokeColor='#1a66ff'
					fillColor='rgba(230,238,255,0.5)'
				/>
		);
	}

	renderAlertLockScreen() {
		return (
			<View style={styles.lockScreen}>
				<View style={{ alignItems: 'center' }}>
					<Image style={{width: 100, height: 100}} 
						source={require('../../assets/alert-earthquake-icon.png')} />
					<Text style={styles.lockScreenTitle}>
						6.9 MG Earthquake Pending
					</Text>x
					<Text style={styles.lockScreenSubtitle}>
						10 minutes away from your location
					</Text>
					<Text style={styles.lockScreenInstruction}>
						Drop, Cover and Hold On now!
					</Text>
					<Text style={[styles.lockScreenInstruction, { paddingTop: 0 }]}>
						Follow your escape route after.
					</Text>
				</View>
				<View style={{flexDirection: 'column', paddingTop: 35, alignItems: 'center', justifyContent: 'center'}}>
					<Button onPress={this.onTrackEarthquake.bind(this)}
							style={styles.lockScreenButton}
							danger>
						<Text style={styles.lockScreenButtonText}>
							Track Earthquake
						</Text>
					</Button>
					<Button onPress={this.onAlertEMS.bind(this)}
							style={styles.lockScreenButton}
							danger>
						<Text style={styles.lockScreenButtonText}>
							Alert EMS
						</Text>
					</Button>
					<Button onPress={this.onViewEscapeRoute.bind(this)}
							style={styles.lockScreenButton}
							danger>
						<Text style={styles.lockScreenButtonText}>
							View Escape Route
						</Text>
					</Button>
				</View>
			</View>
		);
	}

	render() {
		if (this.state.alertLockMode) {
			return this.renderAlertLockScreen.bind(this)();
		}
		const { onLogout } = this.props.screenProps;
		return (
			<Drawer ref={(ref) => { this.drawer = ref; }}
						content={<SideBar navigation={this.props.navigation} close={() => this.drawer._root.close()} onLogout={onLogout} />}
						onClose={() => this.drawer._root.close()}>
				<Container style={styles.container}>
					<Header>
						<Button onPress={() => this.drawer._root.open()}
								transparent>
							<Icon name="ios-menu" />
						</Button>

						<CustomTitle>
							<TouchableWithoutFeedback onPress={() => this.setState({ alertLockMode: true })}>
								<Text>Frida</Text>
							</TouchableWithoutFeedback>
						</CustomTitle>

						<Button onPress={() => {
								this.props.navigation.navigate({
									routeName: 'Alerts'
								});
							}}
							transparent>
							<Icon name="ios-notifications-outline" />
						</Button>
					</Header>
					<View style={styles.content}>
						{
							this.state.loading || !this.state.longitude || !this.state.latitude ? null :
							<MapView
								style={{ flex: 1 }}
								initialRegion={this.getDelta(this.state.latitude, this.state.longitude, this.state.accuracy)}
								onPress={(e) => {
									if (e.nativeEvent.action !== 'marker-press') {
										this.setState({selectedEarthquake: null})
									}
								}}
								onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
							>
							<MapView.Marker coordinate={{
								latitude: this.state.latitude,
								longitude: this.state.longitude
							}}/>

							{
								this.state.earthquakes && this.state.earthquakes.length > 0 ? 
								this.state.earthquakes.map(earthquake =>
									<MapView.Marker key={earthquake.id} coordinate={{
										latitude: earthquake.location.latitude,
										longitude: earthquake.location.longitude
									}} style={{width: 38, height: 38}} onPress={() => {this.onSelectEarthquake(earthquake)}}>
									{
										(() => {
											const isSelected = this.state.selectedEarthquake && this.state.selectedEarthquake.id === earthquake.id;
											return(
												<View style={[styles.markerWrap, {transform: [{scale: earthquake.mag/2}]}]}>
													<View style={[styles.outterRing, { backgroundColor:  isSelected ? '#09B961' : '#fff' }]} />
													<View style={[styles.ring, { borderColor: isSelected ? '#fff' : '#09B961' }]} />
													<View style={[styles.smallerRing, { borderColor: isSelected ? '#fff' : '#09B961' }]} />
													<View style={[styles.marker, { borderColor: isSelected ? '#fff' : '#09B961' }]} />
												</View>
											)
										})()
									}
									
										{/* <Image source={this.state.selectedEarthquake && this.state.selectedEarthquake.id === earthquake.id ? 
														require('../../assets/historic-eq-icon-active.png') : require('../../assets/historic-eq-icon.png') } 
											 /> */}
									</MapView.Marker>
								)
								: null
							}
							{/* {this.renderCoverageCircles.bind(this)()} */}
							</MapView>
						}
						{
							this.state.selectedEarthquake ? <Card earthquake={this.state.selectedEarthquake} /> : null
						}
					</View>
				</Container>
			</Drawer>
		);
	}
}

class Card extends Component {
	render() {
		console.log(this.props.earthquake)
		return(
			<View style={styles.mapCardContainer}>
				<View style={styles.card}>
					<View style={styles.markerWrap}>
						<View style={styles.ring} />
						<View style={styles.smallerRing} />
						<View style={styles.marker} />
					</View>
					<View style={styles.cardTextContent}>
						<Text style={styles.cardTitleText}>{this.props.earthquake.mag} MG Earthquake</Text>
						<Text style={styles.cardDescText}>{this.props.earthquake.time}</Text>
					</View>
					<View style={styles.buttonContainer}>
						<Button success style={styles.learnMoreBtn}>
							<Text style={styles.learnMoreBtnText}>Learn More</Text>
						</Button>
					</View>
				</View>
			</View>
		);
	}
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI/180)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flex: 1,
		backgroundColor: '#fff',
	},
	markerWrap: {
		alignItems: "center",
		justifyContent: "center",
	},
	marker: {
		width: 12,
		height: 12,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "#09B961",
	},
	smallerRing: {
		width: 20,
		height: 20,
		borderRadius: 10,
		position: "absolute",
		borderWidth: 1,
		borderColor: "#09B961",
		borderStyle: 'dashed',
	},
	outterRing: {
		width: 38,
		height: 38,
		borderRadius: 19,
		position: "absolute",
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		backgroundColor: "#fff"
	},
	ring: {
		width: 28,
		height: 28,
		borderRadius: 14,
		position: "absolute",
		borderWidth: 1,
		borderColor: "#09B961",
	},
	mapCardContainer: {
		position: 'absolute',
		bottom: 50,
		left: 30,
		right: 30,
		padding: 20,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#09B961',
		flex:1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	card: {
		padding: 10,
		elevation: 2,
		backgroundColor: "#FFF",
		marginHorizontal: 10,
		shadowColor: "#000",
		shadowRadius: 5,
		shadowOpacity: 0.3,
		shadowOffset: { x: 2, y: -2 },
		overflow: "hidden",
		flex: 1,
		flexDirection: 'column',
	},
	cardTextContent: {
		paddingTop: 10,
		paddingBottom: 10,
		alignItems: 'center'
	},
	cardTitleText: {
		fontSize: 22,
		color: '#091A33'
	},
	cardDescText: {
		fontSize: 11,
		color: '#091A33'
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	learnMoreBtn: {
		flex: 1,
		justifyContent: 'center'
	},
	learnMoreBtnText:{
		fontSize: 20,
		color: '#fff',
		textAlign: 'center'
	},
	lockScreen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#222E3E',
		padding: 20
	},
	lockScreenTitle: {
		paddingTop: 15,
		fontSize: 20,
		color: '#FA580F',
		fontWeight: 'bold',
	},
	lockScreenSubtitle: {
		paddingTop: 5,
		fontSize: 16,
		color: '#FA580F'
	},
	lockScreenInstruction: {
		paddingTop: 35,
		fontSize: 20,
		color: '#FFF'
	},
	lockScreenButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 25
	},
	lockScreenButtonText: {
		flex: 1,
		color: '#fff',
		fontSize: 22,
		textAlign: 'center'
	}
});

export default createStackNavigator({
	Home: {
		screen: Home
	},
	Profile: {
		screen: Profile
	},
	Alerts: {
		screen: Alerts
	},
	School: {
		screen: School
	},
	Settings: {
		screen: Settings
	},
	Medical: {
		screen: Medical
	},
	Guides: {
		screen: Guides
	},
	Guide: {
		screen: Guide
	},
	Chat: {
		screen: Chat
	}
},
{
	initialRouteName: 'Home',
	headerMode: null,
	cardStyle: {
		shadowOpacity: 0,
	}
});
