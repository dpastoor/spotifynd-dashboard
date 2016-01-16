/**
 * Created by devin on 1/11/16.
 */

import React, { Component } from 'react';
import { DateRange } from 'react-date-range';
import moment from 'moment';
import 'moment-range';
export default class DateRangePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: []
    }
  }
  handleSelect(date){
    if (date.startDate === date.endDate) {
      this.props.handleDates([]);
      //do nothing for now as in the middle of picking
    } else {
      var dates = [];
      moment.range(date.startDate, date.endDate).by('days', (day) => {
        dates.push(day.toDate());
      });
      this.props.handleDates(dates);
    }
  }

  render(){
    return (
      <div>
        <DateRange
          onChange={this.handleSelect.bind(this)}
          calendars={1}
        />
      </div>
    )
  }
}

