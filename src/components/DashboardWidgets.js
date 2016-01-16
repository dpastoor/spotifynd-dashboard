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
      <Card
        key={i}
        style={{
        flex: 1,
        width: '40vw',
        margin: 10,
        height: '40vh'
        }}
      >
        <MessageDistribution
          val={i}
        />
      </Card>
      )
    );

    return (

          <div style={{
                display: 'flex',
                flexFlow: 'row wrap',
                maxWidth: 1200,
                width: '100%',
                margin: '30px auto 30px'
                }}>
            {dashboardWidgets}
          </div>
    );
  }
}
