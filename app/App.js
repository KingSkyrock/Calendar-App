import React from 'react';
import styles from './App.css';
import datejs from 'datejs'
import Month from './month.js';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.date = new Date();

    this.state = {
      started: false,
      currentSelectedMonth: new Date().getMonth(),
      loadedEvents: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentSelectedMonth != this.state.currentSelectedMonth || prevState.started != this.state.started) {
      this._fetchEvents();
    }
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.state.started ?
          <div>
            <button onClick={() => {this._changeMonth(false)}}>Back</button>
            <button onClick={() => {this._changeMonth(true)}}>Next</button>
            <Month
              wantedMonth={this.state.currentSelectedMonth}
              events={this.state.loadedEvents}
            />
            <lable>Click on a day to add an event!</lable>
          </div>
        :
          <div>
            <button onClick={() => this._start()}>Start the Calendar (this will be replaced with logging in)</button>
          </div>
        }
      </div>
    );
  }

  _start() {
    this.setState({started: true});
  }

  _changeMonth(up) {
    if (up && this.state.currentSelectedMonth != 11) {
      this.setState({
        currentSelectedMonth: this.state.currentSelectedMonth + 1
      });
    } else if (!up && this.state.currentSelectedMonth != 0) {
      this.setState({currentSelectedMonth: this.state.currentSelectedMonth - 1});
    } else if (!up && this.state.currentSelectedMonth == 0) {
      this.setState({currentSelectedMonth: 11});
    } else if (up && this.state.currentSelectedMonth == 11) {
      this.setState({currentSelectedMonth: 0});
    }
  }

  _fetchEvents() {
    axios.get('/events').then((res) => {
      this.setState({
        loadedEvents: res.data
      })
    });
  }
}
