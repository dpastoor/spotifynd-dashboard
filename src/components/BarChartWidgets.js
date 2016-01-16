import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Card, List, ListItem} from 'material-ui';
import MessageDistribution from './MessageDistribution';
import moment from 'moment';
import {BarChart} from 'react-d3';
export default class BarChartWidgets extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    let {messagesPerRoom, playlistsPerRoom} = data;
    let dashboardWidgets = _.map([{data:messagesPerRoom, title: 'messages'}, {data:playlistsPerRoom, title: 'playlists'}], (a, i) => (
      <div
        style={{
        flex: 1,
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
            val={a.data}
            title={a.title}
          />
        </Card>
      </div>
      )
    );

    return (
          <div style={{
                display: 'flex'
                }}>
            {dashboardWidgets}
          </div>
    );
  }
}
