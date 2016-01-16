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
    let data = [1, 2 ];
    let dashboardWidgets = _.map(data, (a, i) => (
      <div
        style={{
        flex: 1,
        width: '100%',
        height: '95%',
        padding: '2vh'
        }}
      >
        <Card
          key={i}
          style={{
          width: '100%',
          height: '100%'
          }}
        >
          <MessageDistribution
            val={i}
          />
        </Card>
      </div>
      )
    );

    return (

          <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                height: '50%'
                }}>
            {dashboardWidgets}
          </div>
    );
  }
}
