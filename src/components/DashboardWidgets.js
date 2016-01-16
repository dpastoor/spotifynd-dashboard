import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Card, List, ListItem} from 'material-ui';
import MessageDistribution from './MessageDistribution';
import moment from 'moment';
export default class DashboardWidgets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = [1, 2, 3, 4]
    let dashboardWidgets = _.map(data, (a, i) => (
      <div
        key={i}
      >
        <MessageDistribution
          {...a}
        />
      </div>
      )
    );

    return (

    <Card style={{
        flexGrow: 3,
        minWidth: '10vw',
        overflowY: 'auto'
      }} >
        <List>
          <div style={{
        color: 'black',
        fontSize: 20,
        textAlign: 'center'
           }}>
            Check out these stats
          </div>
          <div
            style={{
              margin: 'auto 5vw auto 5vw'
            }}
          >
            {dashboardWidgets}
          </div>
        </List>
      </Card>
    );
  }
}
