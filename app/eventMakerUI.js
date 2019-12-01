import React from 'react';
import ReactDOM from 'react-dom';
import styles from './App.css';
import PropTypes from 'prop-types';
import axios from 'axios';

export default class EventUI extends React.Component {
  constructor(props) {
    super(props);

    this.createEvent = this.createEvent.bind(this);
  };

  createEvent(event) {
    event.preventDefault();
    event.stopPropagation();

    var eventName = document.getElementById('name').value;
    var eventDescription = document.getElementById('description').value;
    var eventHour = document.getElementById('hour').value;
    var eventMinutes = document.getElementById('minutes').value;

    var dataObj = {};
    dataObj[this.props.date] = {name: eventName, description: eventDescription, hour: eventHour, minutes: eventMinutes}

    axios.post('/saveEvent', dataObj).then((res) => {
      alert("Event added!")
    });

  }

  render() {
    return (
      <div>
        {this.props.showing &&
          <div style={{border: '0.5px solid black', borderRadius: '10px', position: 'relative'}}>
            <h1>Create Event</h1>
            <button onClick={this.props.closing} style={{backgroundColor:'red', top: 1, right: 2, position: 'absolute', borderRadius: '10px'}}>X</button>
            <form onSubmit={(event) => this.createEvent(event)}>
              <span>Date: &nbsp;{this.props.date}</span>
              <br />
              <br />
              <lable>Event Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</lable>
              <input type="text" id="name"></input>
              <br />
              <lable>Event Description: </lable>
              <input type="text" id="description"></input>
              <br />
              <h3>Event Time: </h3>
              <lable>Hour: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</lable>
              <select id="hour">
                <option value="1">1 AM</option>
                <option value="2">2 AM</option>
                <option value="3">3 AM</option>
                <option value="4">4 AM</option>
                <option value="5">5 AM</option>
                <option value="6">6 AM</option>
                <option value="7">7 AM</option>
                <option value="8">8 AM</option>
                <option value="9">9 AM</option>
                <option value="10">10 AM</option>
                <option value="11">11 AM</option>
                <option value="12">12 AM</option>
                <option value="13">1 PM</option>
                <option value="14">2 PM</option>
                <option value="15">3 PM</option>
                <option value="16">4 PM</option>
                <option value="17">5 PM</option>
                <option value="18">6 PM</option>
                <option value="19">7 PM</option>
                <option value="20">8 PM</option>
                <option value="21">9 PM</option>
                <option value="22">10 PM</option>
                <option value="23">11 PM</option>
                <option value="24">12 PM</option>
              </select>
              <br />
              <lable> Minutes: </lable>
              <input type="number" min="0" max="59" id="minutes"></input>
              <br />
              <br />
              <input type="submit" value="Create!"></input>
            </form>
            <br />
          </div>
        }
      </div>
    );
  };
};

EventUI.propTypes = {
  date: PropTypes.string.isRequired,
  closing: PropTypes.func.isRequired
};
