import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import EventCell from './EventCell.js';
import HolidayCell from './HolidayCell.js';

export default class DateCell extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        {this.props.isToday ?
          <div style={{backgroundColor: "lightblue", borderRadius: "100px", width: '50%', display: 'inline-block', textAlign: 'center'}}>{this.props.dateDisplay}</div>
        :
          <div>{this.props.dateDisplay}</div>
        }
        {this.renderHolidays()}
        {this.renderEvents()}
      </React.Fragment>
    );
  }

  renderEvents() {
    var output = [];
    if (this.props.events != null) {
      for (var i = 0; i < this.props.events.length; i++) {
        if (this.props.events[i] != undefined) {
          output.push(<EventCell key={`event-${i}`} updateEvents={() => {this.props.updateEvents()}} event={this.props.events[i]}/>)
        }
      }
    }
    return <div>{output}</div>;
  }

  renderHolidays() {
    var output = [];
    if (this.props.holidays != null) {
      for (var i = 0; i < this.props.holidays.length; i++) {
        if (this.props.holidays[i] != undefined) {
          output.push(<HolidayCell key={`holiday-${i}`} holiday={this.props.holidays[i]}/>)
        }
      }
    }
    return <div>{output}</div>;
  }
}
