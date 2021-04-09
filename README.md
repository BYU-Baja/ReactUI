# React Base Station GUI

This contains a react project that connects to an MQTT broker and display incoming data from the baja vehicle. There is still a lot of work that needs to be done to get this in a place that would be useful for the baja team.

## Getting started

There are a couple things that you need to get this running, first is an MQTT broker. We recommend using Mosquitto, it is open source and has lots of tutorials on how to use it. Something to note here is that since we are using a web app to connect to the broker, you need to enable web socket support on Mosquitto, a quick google search will help you figure out how to do that. This web app also specifically listens to port 8883. So adding a port and setting the protocol to be websockets in the Mosquitto configuration files will ensure that everything works with minimal headaches.

The second piece of software is npm and node. You can install both of them by installing node. The needed node version to compile this repo is Node 9. I would recommend installing a node version manager. If you are using windows this repo will get you started https://github.com/coreybutler/nvm-windows. For Linux or Mac, just search how to install nvm. Make sure that you use the nvm to install node 9. It won't effect the development of the app, but when you build it for release it won't compile unless node 9 is used.

To download this repo I would recommend installing git and becoming familiar with it.

## Running the app

To run the app once you have installed the above software navigate to this repo on your machine and run the command.

```
npm install
```

This will install all the packages that are used in this project. After you can start the development server by running

```
npm start
```

This will compile the project and open a browser tab for you. It will take a few minutes but the web app will show up. To build a release version run.

```
npm build
```

Once it is finished you can copy the files that it generated to wherever you need it to be for hosting the web app. Where that is depends on what web server you are using. The Raspberry Pi uses apache, but you can also use an npm http server. Both of these options are a google search away.
