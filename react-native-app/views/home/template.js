import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Button, Icon, Content } from 'native-base';
import CustomTitle from '../common/customTitle';

class Template extends Component {

	static navigationOptions = {
		header: null
	};

  constructor(props) {
		super(props);
		this.state = {};
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
                        Template
                    </CustomTitle>

                    <Button transparent>
                        <Icon name="ios-notifications-outline" style={{color: 'transparent'}}/>
                    </Button>
                </Header>
                <View style={styles.content}>
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
	}
});

export default Profile;
