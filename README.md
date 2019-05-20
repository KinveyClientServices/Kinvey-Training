# KINVEY TRAINING APP

This app is intended to be used with the Kinvey Developer Training curriculum.

This app is written using NativeScript, which leverages the Kinvey NativeScript SDK to communicate with the backend.

Please follow the instructions below to set up your environment before attending a training.

### Prerequisites
* Install nodejs https://nodejs.org/en/
* Install NativeScript and platform dependencies https://docs.nativescript.org/start/quick-setup
* Install git https://git-scm.com/downloads


### Getting started
* git clone https://github.com/KinveyClientServices/Kinvey-Training
* cd Kinvey-Training
* tns install
* tns run android or tns run ios

### Flex Prerequisites
* Install Kinvey Cli : npm install -g kinvey-cli
* Create a new directory for the flex project
* Run npm init to generate "package.json". Make sure entry point is "index.js"
* In the new project directory run : npm install --save kinvey-flex-sdk to add the flex dependency
* Create a blank index.js file 

## Node/Npm Tips and Tricks
* Install nodemon to restart nodejs automagically on file save : npm install -g nodemon
* Add the following to the scripts object in package.json 
    * "dev": "nodemon --exec npm start",
    * "deploy": "npm version --no-git-tag-version patch && kinvey flex deploy",
    * "status": "kinvey flex job && kinvey flex status"




