import React from 'react';
import styles from './App.css';
import Month from './month.js';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.date = new Date();

    this.state = {
      started: false,
      selectedMonth: new Date().getMonth(),
      selectedYear: new Date().getFullYear(),
      loadedEvents: null,
      loadedHolidays: null
    };
  }

  componentDidMount() {
    this.setState({started: true});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedMonth != this.state.selectedMonth || prevState.started != this.state.started) {
      this._fetchEvents();
      this._fetchHolidays();
    }
  }

  render() {
    return (
      <div id={styles.layout}>
        <Month
          wantedMonth={this.state.selectedMonth}
          wantedYear={this.state.selectedYear}
          updateEvents={() => {
            this._fetchEvents()
          }}
          backMonth={(evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            this._changeMonth(false);
          }}
          forwardMonth={(evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            this._changeMonth(true)
          }}
          todayMonth={() => {
            this.setState({
              selectedMonth: new Date().getMonth(),
              selectedYear: new Date().getFullYear()
            });
          }}
          holidays={this.state.loadedHolidays}
          events={this.state.loadedEvents}
        />
      </div>
    );
  }
  _changeMonth(up) {
    if (up && this.state.selectedMonth != 11) {
      this.setState({
        selectedMonth: this.state.selectedMonth + 1
      });
    } else if (!up && this.state.selectedMonth != 0) {
      this.setState({
        selectedMonth: this.state.selectedMonth - 1
      });
    } else if (!up && this.state.selectedMonth == 0) {
      this.setState({
        selectedMonth: 11, selectedYear: this.state.selectedYear - 1
      });
    } else if (up && this.state.selectedMonth == 11) {
      this.setState({
        selectedMonth: 0, selectedYear: this.state.selectedYear + 1
      });
    }
  }

  _fetchEvents() {
    axios.get('/events').then((res) => {
      this.setState({
        loadedEvents: res.data
      })
    });
  }

  _fetchHolidays() {
    axios.get('/holidays', { params: { year: this.state.selectedYear} }).then((res) => {
      this.setState({
        loadedHolidays: res.data
      })
    });
  }
}
