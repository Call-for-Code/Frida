
## Frida Architecture

The end to end solution with a mobile AI-enabled application called Frida, and an IoT device called FridaSOS, that can be installed in schools and universities. The solution uses built-in AI functions to provide earthquake preparation, guide people through drills, predict the magnitude of earthquakes based on sensor data, identify the best escape routes during earthquakes, and detect people trapped in damaged classrooms. It is a first-of-a-kind complete solution for providing data collection, monitoring, notifications, and guidance before, during, and after a disaster.

FridaSOS IoT device by integrating a device that has an earthquake Gyroscope sensor, a heat sensor, and a camera with the IBM IoT Platform. FridaSOS registers the sensor devices, monitors the near-real-time IoT data, and stores the IoT data. 

By building this AI-enabled mobile application through [IBM Watson Studio](https://www.ibm.com/ca-en/marketplace/watson-studio), we can use a combination of AI technologies. We use a pre-trained earthquake deep learning model to predict the magnitude of the earthquake by streaming data from the [IBM Watson IoT platform](https://www.ibm.com/cloud/watson-iot-platform). We apply a visual recognition model to show the damage of buildings that people should avoid through integrated [IBM Visual Recognition](https://www.ibm.com/watson/services/visual-recognition/) in Watson Studio. We combine the information about damaged buildings with heat detection data to identify where people are trapped. And we use a Jupyter notebook to analyze school location data which has been stored in [IBM Compose PostgreSQL](https://console.bluemix.net/catalog/services/compose-for-postgresql) to guide disaster drills, plus AI functions to show people their escape paths on a map. 

As we are building more features into solution, the above solution design will be updated accordingly. 

![Architecture](https://github.com/IBM/Frida/blob/master/docs/images/Frida_Architecture.png)
