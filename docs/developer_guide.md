# Developer Guide

## Run a full development build

Use the following instructions if you want to run a full development build:

1. standup your own Frida server:

https://github.com/IBM/Frida-backend/blob/master/README.md

2. Run the Mobile Simulator in your local machine:

- download the code from https://github.com/IBM/Frida-APP
- go inside the folder via terminal. 
- install modules with the command:
```
npm install
```
- make sure your expo and Xcode is already installed on your machine
- start app with the command: 
```
expo start
```
- In new browser tab, Click `Run on iOS Simulator` option. It opens IOS simulator on your machine with the new app
- To connect the app to your node instance, change the following line of code in `Map.js`
 
 ```
	var client = new WS('ws://iot-image-analysis.mybluemix.net/ws/receiveMessage');
  ```
to

  ```
	var client = new WS('ws://<your node red base url>/ws/receiveMessage');
  ```
 
