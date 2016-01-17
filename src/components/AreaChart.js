/**
 * Created by devin on 1/16/16.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Paper} from 'material-ui';
import moment from 'moment';
import {AreaChart} from 'react-d3';
export default class AreaChartWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //want the createdAt array
    // each object has createdAt, populatedRooms, totalRooms
    // TODO: much better error checking needed
    let data = this.props.data || {createdAt: new Date(), populatedRooms: 0, totalRooms: 0};
    let processedData = [
      {name: 'populated', values: []},
      {name: 'total', values: []}
    ];
    _.forEach(data, (d) => {
      let date = new Date(d.createdAt);
      processedData[0].values.push({x: date , y: d.populatedRooms });
      processedData[1].values.push({x: date, y: d.totalRooms});
    });

    return (
      <Paper style={{
      padding: 10
      }}>
        <AreaChart
          data={processedData}
          width="100%"
          height={300}
          viewBoxObject={{
              x: 0,
              y: 0,
              height: 300,
              width: 600
            }}
          xAxisLabel="Time"
          yAxisLabel="Trips Planned and Total Rooms"
          xAxisTickInterval={{unit: 'hour', interval: 2}}
        />
      </Paper>
    );
  }
}
