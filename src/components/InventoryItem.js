import React from 'react';
import {List, ListItem, Avatar, Card, CardText, RaisedButton, CardActions, DatePicker, TextField, DropDownMenu} from 'material-ui';
import moment from 'moment';
import RangePicker from 'react-daterange-picker';
import DRPicker from './DateRangePicker';
import axios from 'axios';
import NumberItems from './NumberItems';
export default class InventoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props, {showing: false, isCheckingOut: false, dates: [], name: "", email: "", numItems: 0, gotItem: false})
  }
  handleDetailsClick() {
    this.setState({
      showing: !this.state.showing
    })
  }
  handleCheckingOutClick() {
    this.setState({
      isCheckingOut: !this.state.isCheckingOut
    })
  }
  setDates(dates) {
    this.setState({
      dates: dates
    })
  }

  checkout() {
    axios.post('/api/messages', {
      name: this.state.name,
      email: this.state.email,
      dates: this.state.dates,
      items: [this.state._id],
      businessId: this.state.businessId
    }).then(function(res) {
      console.log('checked out item');
      console.log(res);
      this.setState({
        gotItem: true
      })
    }.bind(this))
  }

  onBlurOrEnterEmail(event) {
   this.setState({
     email: event.target.value
   })
  }
  onBlurOrEnterName(event) {
    this.setState({
      name: event.target.value}
    )
  }

  onNumItemChange(event) {
    this.setState({
      numItems: event.target.value}
    )
  }


  render() {
    let {gotItem, item, price, img, desc, showing, isCheckingOut, dates, name, email, numItems} = this.state;
    console.log("dates selected for inventory item" + dates);
    let checkingOut = isCheckingOut ? (
      <div
      style={{
      display: 'flex',
      flexFlow: 'row',
      backgroundColor: gotItem ? 'green' : null
      }}
      >
        <DRPicker handleDates={this.setDates.bind(this)} />
        <div>
          <TextField
            hintText="Enter your name"
            onBlur={this.onBlurOrEnterName.bind(this)}
            onEnterKeyDown={this.onBlurOrEnterName.bind(this)}
          />
          <TextField
            hintText="Enter your email"
            type="email"
            onBlur={this.onBlurOrEnterEmail.bind(this)}
            onEnterKeyDown={this.onBlurOrEnterEmail.bind(this)}
          />
          <TextField
            hintText="Enter number you'd like to rent"
            onBlur={this.onNumItemChange.bind(this)}
            onChange={this.onNumItemChange.bind(this)}
          />
        </div>
      </div>
    ) : '';

    let allowedToCheckout= !(name.length && email.length && dates.length && numItems);
    let customizing = dates.length ? (
      <div>
        <RaisedButton
          label="Checkout"
          secondary={true}
          onClick={this.checkout.bind(this)}
          disabled={allowedToCheckout}
        />
      </div>
    ) : (
      <RaisedButton
        label="Select Dates to Rent Item"
        onClick={this.handleCheckingOutClick.bind(this)}
      />
    )
    return (
      <Card
        style={{
      margin: '2vh 2vh 2vh 2vh'
    }}
      >
        <div>
          <ListItem
            primaryText= {item}
            secondaryText= {'$' + price + ' per day'}
            rightAvatar ={<Avatar src={img} />}
            onClick={this.handleDetailsClick.bind(this)}
          >
        </ListItem>
        </div>
        { showing ?
          <div>
            <CardText>
            {desc}

            </CardText>
            <CardActions>
              {customizing}
            </CardActions>
            {checkingOut}
            </div>
          : ''
        }
      </Card>
    )
  }
}
