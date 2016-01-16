import React from 'react';
import {List, ListItem, Avatar, Card, CardText, RaisedButton, CardActions, DatePicker, TextField, DropDownMenu} from 'material-ui';
import moment from 'moment';
import _ from 'lodash';
import {BarChart} from 'react-d3';
export default class MessageDistribution extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.val || {'0': 5, '3': 2};
    let barData = [];
    let keys = Object.keys(data);
    let accumulator = _.range(0, parseInt(keys[keys.length -1 ])+1);

    let barDataValues = _.reduce(accumulator, (acc, val, i, obj) => {
      if (data[val]) {
        return acc.concat({x: val, y: data[val]})
      } else {
        return acc.concat({x: val, y: 0})
      }
    }, []);
    barData.push({
      "name": "Data",
      "values": barDataValues
    });
    return (

      <div style={{
      padding: 5
      }}>
        <BarChart
          data={barData}
          width={window.innerWidth/2.2}
          height={window.innerHeight/3}
          yAxisLabel="Count"
          xAxisLabel={this.props.title + " created per room"}
        />
      </div>
    )
  }
}

