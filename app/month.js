import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import EventUI from './eventMakerUI.js';
import DateCell from './DateCell.js';

export default class Month extends React.Component {
  constructor(props) {
    super(props);

    this.firstDay = null;
    this.lastDay = null;
    this.date = new Date();

    this.state = {
      events: this.events,
      addingEvent: false,
      eventDate: ''
    }
  };

  month() {
    var date = new Date();
    this.firstDay = new Date(date.getFullYear(), this.props.wantedMonth, 1).getDay();
    this.lastDay = new Date(date.getFullYear(), this.props.wantedMonth+1, 0).getDate();
    var arr = [];

    for (var i = 0; i < this.firstDay; i++) {
      arr.push(<DateCell dateDisplay={""} />)
    }

    for (var i = 1; i <= this.lastDay; i++) {
      var cellEvents = [];

      for (var eventIndex in this.props.events) {
        var eventDate = new Date(this.props.events[eventIndex].eventDate);
        if (eventDate.getDate() == i && eventDate.getMonth() == this.props.wantedMonth) {
          cellEvents.push(this.props.events[eventIndex]);
        }
      }
      arr.push(<DateCell dateDisplay={i} events={cellEvents} />)
    }

    return arr;
  }

  getMonthName(num) {
    var output;
    switch(num) {
      case 0:
        output = 'January';
      break;
      case 1:
        output = 'February';
      break;
      case 2:
        output = 'March';
      break;
      case 3:
        output = 'April';
      break;
      case 4:
        output = 'May';
      break;
      case 5:
        output = 'June';
      break;
      case 6:
        output = 'July';
      break;
      case 7:
        output = 'August';
      break;
      case 8:
        output = 'September';
      break;
      case 9:
        output = 'October';
      break;
      case 10:
        output = 'November';
      break;
      case 11:
        output = 'December';
      break;
    }
    return output;
  }

  addEvent(day) {
    if (this.month()[day] != '') {
      var date = new Date();
      this.setState({addingEvent: true, eventDate: new Date(date.getFullYear(), this.props.wantedMonth, this.month()[day]).toLocaleDateString('day').toString()})
      /*
      var date = new Date()
      var key = new Date(date.getFullYear(), this.props.wantedMonth, this.month()[day]).toLocaleDateString('day').toString();
      var eventName = prompt("Event Name: ")
      if (this.events[key] == undefined) {
        this.events[key] = [];
      }
      this.events[key].push(eventName);
      this.setState({events: this.events});
      var data = {}
      data[key] = eventName
      axios.post('/saveEvent', data).then((res) => {
        alert("Event added!")
      })
      */
    } else {
      alert("You can't add an event on that day.")
    }
  }

  getDate(day) {
    return new Date(date.getFullYear(), this.props.wantedMonth, this.month()[day]).toLocaleDateString('day').toString();
  }

  render() {
    return (
      <div>
        <div>
          <br />
          <EventUI date={this.state.eventDate} showing={this.state.addingEvent} closing={() => {
            this.setState({addingEvent: false});
          }} />
        </div>
        <div style={{fontSize: '75px'}}>
          { this.getMonthName(this.props.wantedMonth) }
        </div>
        <br />
        <table style={{margin: 'auto', border: '1px solid black'}}>
          <tbody>
            <tr style={{border: '1px solid black'}}>
                {/*firstweek is special because the first day of the month can start on any day in the first week.*/}
              <th> Sunday </th> <th> Monday </th> <th> Tuesday </th> <th> Wednesday </th> <th> Thursday </th> <th> Friday </th> <th> Saturday </th>
            </tr>
            <tr >
              <td onClick={() => this.addEvent(0)}> {this.month()[0]} </td> <td onClick={() => this.addEvent(1)}> {this.month()[1]}  </td> <td onClick={() => this.addEvent(2)}> {this.month()[2]} </td> <td onClick={() => this.addEvent(3)}> {this.month()[3]} </td> <td onClick={() => this.addEvent(4)}> {this.month()[4]} </td> <td onClick={() => this.addEvent(5)}> {this.month()[5]} </td> <td onClick={() => this.addEvent(6)}> {this.month()[6]} </td>
            </tr>
            <tr>
              <td onClick={() => this.addEvent(7)}> {this.month()[7]} </td> <td onClick={() => this.addEvent(8)}> {this.month()[8]}  </td> <td onClick={() => this.addEvent(9)}> {this.month()[9]} </td> <td onClick={() => this.addEvent(10)}> {this.month()[10]} </td> <td onClick={() => this.addEvent(11)}> {this.month()[11]} </td> <td onClick={() => this.addEvent(12)}> {this.month()[12]} </td> <td onClick={() => this.addEvent(13)}> {this.month()[13]} </td>
            </tr>
            <tr>
              <td onClick={() => this.addEvent(14)}> {this.month()[14]} </td> <td onClick={() => this.addEvent(15)}> {this.month()[15]}  </td> <td onClick={() => this.addEvent(16)}> {this.month()[16]} </td> <td onClick={() => this.addEvent(17)}> {this.month()[17]} </td> <td onClick={() => this.addEvent(18)}> {this.month()[18]} </td> <td onClick={() => this.addEvent(19)}> {this.month()[19]} </td> <td onClick={() => this.addEvent(20)}> {this.month()[20]} </td>
            </tr>
            <tr>
              <td onClick={() => this.addEvent(21)}> {this.month()[21]} </td> <td onClick={() => this.addEvent(22)}> {this.month()[22]}  </td> <td onClick={() => this.addEvent(23)}> {this.month()[23]} </td> <td onClick={() => this.addEvent(24)}> {this.month()[24]} </td> <td onClick={() => this.addEvent(25)}> {this.month()[25]} </td> <td onClick={() => this.addEvent(26)}> {this.month()[26]} </td> <td onClick={() => this.addEvent(27)}> {this.month()[27]} </td>
            </tr>
            <tr>
              <td onClick={() => this.addEvent(28)}> {this.month()[28]} </td> <td onClick={() => this.addEvent(29)}> {this.month()[29]}  </td> <td onClick={() => this.addEvent(30)}> {this.month()[30]} </td> <td onClick={() => this.addEvent(31)}> {this.month()[31]} </td> <td onClick={() => this.addEvent(32)}> {this.month()[32]} </td> <td onClick={() => this.addEvent(33)}> {this.month()[33]} </td> <td onClick={() => this.addEvent(34)}> {this.month()[34]} </td>
            </tr>
            { (this.firstDay == 5 && this.lastDay >= 31 || this.firstDay == 6) &&
              <tr>
                <td onClick={() => this.addEvent(35)}> {this.month()[35]} </td> <td onClick={() => this.addEvent(36)}> {this.month()[36]}  </td> <td onClick={() => this.addEvent(37)}> {this.month()[37]} </td> <td onClick={() => this.addEvent(38)}> {this.month()[38]} </td> <td onClick={() => this.addEvent(39)}> {this.month()[39]} </td> <td onClick={() => this.addEvent(40)}> {this.month()[40]} </td> <td onClick={() => this.addEvent(41)}> {this.month()[41]} </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Month.propTypes = {
  wantedMonth: PropTypes.number.isRequired,
  loadedEvents: PropTypes.arrayOf(PropTypes.shape({
    eventName: PropTypes.string,
    eventDescription: PropTypes.string,
    eventDate: PropTypes.string,
    eventDuration: PropTypes.number
  }))
};
