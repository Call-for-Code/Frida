import React from 'react';
import getTheme from './native-base-theme/components';
import { StyleProvider } from 'native-base';
import Setup from './views/setup';
import Home from './views/home';
import LoginComponent from './views/setup/login';
import commonColor from './native-base-theme/variables/commonColor';
import UserInfoStorage from './storage/userInfo';
import SetupAPI from './api/setup';
import StorageUtils from './storage/utils';
// import io from 'socket.io-client';

console.ignoredYellowBox = ['Warning:'];

export default class App extends React.Component {
  state = {
    loading: true,
    token: null
  }
  componentWillMount() {

    // const SocketEndpoint = 'https://api.frida.cf/v1/socket/alerts';
    // const socket = io(SocketEndpoint, {
    //   transportOptions: {
    //     polling: {
    //            extraHeaders: {
    //                  'Authorization': 'Bearer test'
    //                  }
    //            }
    //      },
    // });

    // socket.on('connect', () => {
    //   alert('connected');
    // });

    // socket.on('ping', data => {
    //   alert('ping');
    // });

    // this.setState({ loading: false, loggedIn: true }); return;
    // StorageUtils.dropUserInfoTable(); return;
    UserInfoStorage.getAll()
      .then(userData => {
        console.log(userData);
        if(userData && userData.role) { // todo: check all other fields
          this.setState({ loading: false, loggedIn: true });
          return;
        }
        this.setState({
          loading: false,
          // token: userData ? userData.token : null  // this is to always make the user login
        });
      });
  }
  onLogout() {
    StorageUtils.dropUserInfoTable();
    this.setState({ loggedIn: false });
  }
  render() {
    if (this.state.loading) {
      return null;
    }
    return (
      <StyleProvider  style={getTheme(commonColor)}>
        {
          this.state.loggedIn ? <Home screenProps={{ onLogout: this.onLogout.bind(this) }}/> :
            <Setup 
            screenProps={{
              token: this.state.token,
              onFinishSetup: (setupData) => { 
                SetupAPI.setupUser(setupData.role, setupData.institutionId, setupData.locationId, setupData.notificationToken)
                .then(response => {
                  console.log(response);
                  if (response.message === 'User Created') {
                    UserInfoStorage.set({
                      role: setupData.role,
                      institution: setupData.institution,
                      institutionId: setupData.institutionId,
                      locationId: setupData.locationId,
                      notificationToken: setupData.notificationToken
                    });
                    this.setState({ loggedIn: true });
                  } else {
                    alert('Internal Error, something went wrong');
                  }
                });
            }}} />
        }
      </StyleProvider>
    );
  }
}
