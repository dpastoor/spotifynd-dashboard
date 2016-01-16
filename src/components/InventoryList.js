import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Card, List, ListItem} from 'material-ui';
import InventoryItem from './InventoryItem';
import moment from 'moment';
export default class InventoryList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    console.log(data);
    let inventoryItems = _.map(data, (a, i) => (
      <div
        key={i}
      >
        <InventoryItem
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
            What items would you like to check out?
          </div>
          <div
            style={{
              margin: 'auto 5vw auto 5vw'
            }}
          >
            {inventoryItems}
          </div>
        </List>
      </Card>
    );
  }
}
