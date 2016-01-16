import React from 'react';
import {List, ListItem, Avatar, Card, CardText, RaisedButton, CardActions, DatePicker, TextField, DropDownMenu} from 'material-ui';
import moment from 'moment';
export default class MessageDistribution extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div> data {this.props.val} </div>
    )
  }
}
