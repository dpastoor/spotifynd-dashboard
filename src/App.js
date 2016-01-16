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
      let {message, playlist, settings } = value;
      if (!i) {
        // initialization conditions
        acc.totalRooms = 0;
      } else {
        acc.totalRooms = acc.totalRooms + 1;
      }
      console.log('details')
      console.log('message')
      console.log(message)
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
