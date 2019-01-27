# Frida, AI and IoT comes to the aid of teachers, students, and first responders

Frida is an end-to-end solution with a mobile AI-enabled application called Frida, and an IoT device called fridaSOS, which can be installed in schools and universities. The solution uses built-in AI functions to provide earthquake preparation, guide people through drills, predict the magnitude of earthquakes based on sensor data, identify the best escape routes during earthquakes, and detect people trapped in damaged classrooms. It is a first-of-a-kind complete solution for providing data collection, monitoring, notifications, and guidance before, during, and after a disaster.


Blog: [When an earthquake hits, Watson solution helps schools cope](https://developer.ibm.com/blogs/2018/10/17/mitigating-earthquakes-in-schools/)

[![Frida](https://img.youtube.com/vi/LE2ZWJ3WUms/0.jpg)](https://www.youtube.com/watch?v=LE2ZWJ3WUms)


## Vision Statement
To provide a lifesaving solution for natural disasters

## Mission Statement
To make emergency data accessible and act on them.

## Solution Name: Frida
We named it after Frida who is a rescue dog belonging to the Mexican Navy, with her handler Israel Arauz Salinas, takes part in the effort to look for people trapped at the Rebsamen school in Mexico City, on September 22, 2017. She has detected the bodies of 52 people throughout her career and has become the hero symbolic for their country's rescuing effort.

## Solution in Detail
In 2018, the [Call for Code Global Challenge](https://callforcode.org/challenge/) asks developers to create solutions that significantly improve preparedness for natural disasters and relief when they hit. We are committed to this cause! We are pushing for change, answering the call, and developing a lifesaving solution for natural disasters, called Frida. We choose to focus on earthquakes because they tend to happen unexpectedly and affect everyone in that area. Specifically, our solution targets schools and earthquakes. Because of the vulnerability of the students and cost of damage to school buildings, helping schools prepare for an earthquake, respond during an earthquake, and recover after an earthquake are extremely critical goals.

We have developed an end to end solution with a mobile AI-enabled application called Frida, and an IoT device called fridaSOS, that can be installed in schools and universities. The solution uses built-in AI functions to provide earthquake preparation, guide people through drills, predict the magnitude of earthquakes based on sensor data, identify the best escape routes during earthquakes, and detect people trapped in damaged classrooms. It is a first-of-a-kind complete solution for providing data collection, monitoring, notifications, and guidance before, during, and after a disaster.

We assembled the fridaSOS IoT device by integrating a device that has an earthquake Gyroscope sensor, a heat sensor, and a camera with the IBM IoT Platform. fridaSOS registers the sensor devices, monitors the near-real-time IoT data, and stores the IoT data. By building this AI-enabled mobile application through IBM Watson Studio, we can use a combination of AI technologies. We use a pre-trained earthquake deep learning model to predict the magnitude of the earthquake by streaming data from the IoT platform. We apply a visual recognition model to show the damage of buildings that people should avoid. We combine the information about damaged buildings with heat detection data to identify where people are trapped. 

## Solution Roadmap
We have developed the IoT integration tool kit and the AI-enabled mobile application contains key features. Frida mobile application contains an end-to-end solution that integrates with the IBM IoT platform and IBM Watson Studio. The mobile application's current features include: letting students sign up, submit a location, and select a school from stored school list, sending notifications of the earthquake magnitude, guiding drills, managing student lists, and texting entire classes. Our future roadmap adds more functionality to Frida, including applying a visual recognition model to show damaged buildings, using a Jupyter notebook to analyze school location data to guide the disaster drills, finding trapped victims, showing escape routes on a map through AI functions, and applying a blockchain for fundraising transparency in a web application. For this solution, we are focusing on earthquakes and schools, however, our kit can definitely be expanded to handle other types of natural disasters, such as volcanic eruptions, floods, landslides, hurricanes, and tornados. The IoT device can be manufactured in large scale and deployed into institutions. Frida can become one of most powerful and widely used mobile applications for disaster management across institutions globally.

- [Frida roadmap](https://github.com/IBM/Frida/blob/master/ROADMAP.md) 

## How to contribute
Please fork the code, make a contribution and create a pull request. If you have idea/requirement and want us to address a topic not already addressed, please open an issue and label it as type-requirement. If you would like to take on issue to work on, please select label as type-claimed. Let's make big impact on this life saving solution together! 

Frida will consist of four repos including this one, which serves as the entry point and contains umbrella documentation:

- [Frida](https://github.com/IBM/Frida) 
- [Frida-APP](https://github.com/IBM/Frida-APP)
- [Frida-backend](https://github.com/IBM/Frida-backend)
- [Frida-ML](https://github.com/IBM/Frida-ML)
- [Frida-IoT](https://github.com/IBM/Frida-IoT)

## Frida Solution Development

- [Frida roadmap](https://github.com/IBM/Frida/blob/master/ROADMAP.md) 
- [Frida releasenotes](https://github.com/IBM/Frida/blob/master/RELEASENOTES.md) 



