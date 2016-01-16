import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import {AppBar, IconButton, FlatButton, RaisedButton} from 'material-ui';
require('./main.scss');
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import MyRawTheme from './css/materialThemeCustomizations';
import DashboardWidgets from './components/DashboardWidgets';
import axios from 'axios';
import Firebase from 'firebase';
import _ from 'lodash';
let fixtures = require('./fixtures/userData.js');
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData:  []
    }
    this.myFirebaseRef = new Firebase('https://spotyfind.firebaseio.com/');
  }

// want to add colors to context to make available to other components
  static childContextTypes = {
    //just declares we will stick on child context, not actually setting it
    muiTheme: React.PropTypes.object
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
    };
  }
  componentWillMount() {
    this.myFirebaseRef.on("child_added", (dataSnapshot) => {
      this.setState({
        rawData: this.state.rawData.concat(dataSnapshot.val())
      });
    })
  }
  componentWillUnmount() {
    this.myFirebaseRef.off();
  }
  processRoom(data) {
    let results = data.reduce((acc, value, i, arr) => {
      let {messages, playlist, settings } = value;
      if (!i) {
        // initialization conditions
        acc.totalRooms = 0;
        acc.playlistsPerRoom = {};
        acc.activityLocations = [];
        acc.messagesPerRoom = {};
        acc.hasLocation = 0;
        acc.locations = [];
        acc.createdAt = [];
      }

      // increment number of rooms
      acc.totalRooms = acc.totalRooms + 1;

      // distribution of number of playlists per room
      let numPlaylists = playlist ? Object.keys(playlist).length : 0;
      if (!acc.playlistsPerRoom[numPlaylists]) {
        acc.playlistsPerRoom[numPlaylists] = 1
      } else {
        acc.playlistsPerRoom[numPlaylists] = acc.playlistsPerRoom[numPlaylists] + 1
      }
      //activity locations
      if (playlist) {
        _.forEach(playlist, (activity) => {
          if (activity.lat) {
            acc.activityLocations.push([activity.lat, activity.lng])
          }
        })
      }
      // distribution of number of messages per room
      let numMessages = messages.length ? 1 : Object.keys(messages).length;
      if (!acc.messagesPerRoom[numMessages]) {
        acc.messagesPerRoom[numMessages] = 1
      } else {
        acc.messagesPerRoom[numMessages] = acc.messagesPerRoom[numMessages] + 1
      }

      // hasLocation
      if (settings.createdAt) {
        acc.hasLocation += 1;
        acc.locations.push(settings.location);
        acc.createdAt.push({createdAt: settings.createdAt, populatedRooms: acc.hasLocation, totalRooms: acc.totalRooms});
      }
      console.log('details')
      console.log('message')
      console.log(messages)
      console.log('playlist')
      console.log(playlist)
      console.log('setting')
      console.log(settings)

      return acc
    }, {})
    console.log('results');
    console.log(results);
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span> Analytics Dashboard </span>}
          iconElementRight={<FlatButton
          label="Logout"
          onClick={() => this.processRoom(this.state.rawData)}
           />}
          style={{
          maxHeight: '3vw'
          }}

        />
        <div style={{width: '100vw', height: '90vh', display: 'flex', flexWrap: 'wrap'}}>
          <DashboardWidgets data={this.state.items} />
          <DashboardWidgets data={this.state.items} />
        </div>
      </div>
    );
  }
}
