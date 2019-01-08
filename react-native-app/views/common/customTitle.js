import React, { Component } from 'react';
import { Title } from 'native-base';
import { Dimensions, Platform } from 'react-native';

export const isIphoneX = () => {
  let d = Dimensions.get('window');
  const { height, width } = d;

  return (
    // This has to be iOS duh
    Platform.OS === 'ios' &&

    // Accounting for the height in either orientation
    (height === 812 || width === 812)
  );
}

class CustomTitle extends Component {
	render() {
		return(
			<Title style={{ flex: 1, marginTop: isIphoneX() ? 22 : 12 }}>
				{this.props.children}
			</Title>
		);
	}
}
export default CustomTitle;
