import React from 'react';
import ReactDOM from 'react-dom';
import styles from './month.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-modal'
import EventUI from './eventMakerUI.js';
import DateCell from './DateCell.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: '20px',
    paddingLeft: '50px',
    height: '65%',
    width: '22%',
    minWidth: '350px'
  }
};
Modal.setAppElement('#root');

export default class Month extends React.Component {
  constructor(props) {
    super(props);

    this.firstDay = null;
    this.lastDay = null;
    this.date = new Date();
    this.titleInput = React.createRef();

    this.state = {
      events: this.events,
      eventModalOpen: false,
      eventDate: null
    }

    this.openEventModal = this.openEventModal.bind(this);
    this.afterOpenEventModal = this.afterOpenEventModal.bind(this);
    this.closeEventModal = this.closeEventModal.bind(this);
  };

  openEventModal() {
    this.setState({eventModalOpen: true});
  }

  afterOpenEventModal() {
    this.titleInput.focus();
  }

  closeEventModal() {
    this.setState({eventModalOpen: false});
  }

  month() {
    var date = new Date();
    this.firstDay = new Date(this.props.wantedYear, this.props.wantedMonth, 1).getDay();
    this.lastDay = new Date(this.props.wantedYear, this.props.wantedMonth+1, 0).getDate();
    var arr = [];

    for (var i = 0; i < this.firstDay; i++) {
      arr.push(<DateCell dateDisplay={""} events={null} holidays={null}/>)
    }

    for (var i = 1; i <= this.lastDay; i++) {
      var cellEvents = [];
      var cellHolidays = [];
      var todayBool = false;

      if (new Date().getDate() == i && new Date().getMonth() == this.props.wantedMonth && new Date().getFullYear() == this.props.wantedYear) {
        todayBool = true;
      }

      if (this.props.events != null) {
        for (var eventIndex in this.props.events) {
          var eventDate = new Date(this.props.events[eventIndex].eventDate);
          if (eventDate.getDate() == i && eventDate.getMonth() == this.props.wantedMonth && eventDate.getFullYear() == this.props.wantedYear) {
            cellEvents.push(this.props.events[eventIndex]);
          }
        }
      }
      if (this.props.holidays != null) {
        for (var holidayIndex in this.props.holidays) {
          var holidayDate = new Date(this.props.holidays[holidayIndex].holidayDate);
          if (holidayDate.getDate() == i && holidayDate.getMonth() == this.props.wantedMonth) {
            cellHolidays.push(this.props.holidays[holidayIndex]);
          }
        }
      }
      arr.push(<DateCell dateDisplay={i} updateEvents={() => {this.props.updateEvents()}} events={cellEvents} holidays={cellHolidays} isToday={todayBool} wantedYear={this.props.wantedYear} />)
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
    var eventDate = day - this.firstDay + 1
    if (eventDate >= 1 && eventDate < this.lastDay + 1) {
      var date = new Date();
      this.setState({eventModalOpen: true, eventDate: new Date(this.props.wantedYear, this.props.wantedMonth, eventDate).toString()})
    } else {
      alert("You can't add an event on that day.")
    }
  }

  createEvent(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({eventModalOpen: false})

    var eventName = document.getElementById('name').value;
    var eventDescription = document.getElementById('description').value;
    var eventHour = document.getElementById('hour').value;
    var eventMinutes = document.getElementById('minutes').value;
    var eventDuration = document.getElementById('duration').value;
    var eventDate = new Date(this.state.eventDate);
    eventDate.setHours(eventHour);
    eventDate.setMinutes(eventMinutes);
    var dataObj = {};
    dataObj[eventDate.toISOString()] = {name: eventName, description: eventDescription, duration: eventDuration}
    console.log(dataObj)

    axios.post('/saveEvent', dataObj).then((res) => {
      this.props.updateEvents();
      alert("Event added!")
    });
  }

  render() {
    return (
      <React.Fragment style={{height: '100%'}}>
        <Modal
          isOpen={this.state.eventModalOpen}
          onAfterOpen={this.afterOpenEventModal}
          onRequestClose={this.closeEventModal}
          style={customStyles}
          contentLabel="Event Modal"
        >
          <div style={{position: 'relative'}}>
            <h1 style={{fontSize: '25px', marginBottom: '30px'}}>Create Event</h1>
            <button onClick={() => this.setState({eventModalOpen: false})} className={styles["exit-button"]}>X</button>
            <form style={{fontSize: '15px'}} onSubmit={(event) => this.createEvent(event)}>
              <label style={{fontSize: '19px'}}>Title: </label>
              <br />
              <input style={{fontSize: '17px', width: "250px"}} ref={(el) => { this.titleInput = el }} type="text" id="name"></input>
              <br />
              <br />
              <label>Description: </label>
              <br />
              <textarea style={{width: "250px"}} type="text" id="description"></textarea>
              <br />
              <br />
              <span>Date: {new Date(this.state.eventDate).toLocaleDateString()}</span>
              <br />
              <br />
              <h3>Event Time: </h3>
              <label>Hour: </label>
              <select id="hour" className={styles["hour-select"]}>
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
              <label> Minutes: </label>
              <input type="number" min="0" max="59" id="minutes"></input>
              <br />
              <br />
              <label> Duration (minutes): </label>
              <input style={{width: "30px"}} min="0" id="duration"></input>
              <br />
              <br />
              <input className={styles["submit-button"]} type="submit" value="Create!"></input>
            </form>
            <br />
          </div>
        </Modal>
        <div className={styles["month-name"]}>
          <div onClick={this.props.backMonth} className={styles["left-arrow"]}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
          <button onClick={this.props.todayMonth} className={styles["today-button"]}>Today</button>
          {this.getMonthName(this.props.wantedMonth)} {this.props.wantedYear}
          <div onClick={this.props.forwardMonth} className={styles["right-arrow"]}>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
        <div className={styles["table-wrapper"]}>
          <table className={styles["calendar-table"]}>
            <tbody style={{height: '100%'}}>
              <tr>
                  {/*firstweek is special because the first day of the month can start on any day in the first week.*/}
                <th> Sun </th> <th> Mon </th> <th> Tue </th> <th> Wed </th> <th> Thu </th> <th> Fri </th> <th> Sat </th>
              </tr>
              <tr >
                <td onDoubleClick={() => this.addEvent(0)}> {this.month()[0]} </td> <td onDoubleClick={() => this.addEvent(1)}> {this.month()[1]}  </td> <td onDoubleClick={() => this.addEvent(2)}> {this.month()[2]} </td> <td onDoubleClick={() => this.addEvent(3)}> {this.month()[3]} </td> <td onDoubleClick={() => this.addEvent(4)}> {this.month()[4]} </td> <td onDoubleClick={() => this.addEvent(5)}> {this.month()[5]} </td> <td onDoubleClick={() => this.addEvent(6)}> {this.month()[6]} </td>
              </tr>
              <tr>
                <td onDoubleClick={() => this.addEvent(7)}> {this.month()[7]} </td> <td onDoubleClick={() => this.addEvent(8)}> {this.month()[8]}  </td> <td onDoubleClick={() => this.addEvent(9)}> {this.month()[9]} </td> <td onDoubleClick={() => this.addEvent(10)}> {this.month()[10]} </td> <td onDoubleClick={() => this.addEvent(11)}> {this.month()[11]} </td> <td onDoubleClick={() => this.addEvent(12)}> {this.month()[12]} </td> <td onDoubleClick={() => this.addEvent(13)}> {this.month()[13]} </td>
              </tr>
              <tr>
                <td onDoubleClick={() => this.addEvent(14)}> {this.month()[14]} </td> <td onDoubleClick={() => this.addEvent(15)}> {this.month()[15]}  </td> <td onDoubleClick={() => this.addEvent(16)}> {this.month()[16]} </td> <td onDoubleClick={() => this.addEvent(17)}> {this.month()[17]} </td> <td onDoubleClick={() => this.addEvent(18)}> {this.month()[18]} </td> <td onDoubleClick={() => this.addEvent(19)}> {this.month()[19]} </td> <td onDoubleClick={() => this.addEvent(20)}> {this.month()[20]} </td>
              </tr>
              <tr>
                <td onDoubleClick={() => this.addEvent(21)}> {this.month()[21]} </td> <td onDoubleClick={() => this.addEvent(22)}> {this.month()[22]}  </td> <td onDoubleClick={() => this.addEvent(23)}> {this.month()[23]} </td> <td onDoubleClick={() => this.addEvent(24)}> {this.month()[24]} </td> <td onDoubleClick={() => this.addEvent(25)}> {this.month()[25]} </td> <td onDoubleClick={() => this.addEvent(26)}> {this.month()[26]} </td> <td onDoubleClick={() => this.addEvent(27)}> {this.month()[27]} </td>
              </tr>
              <tr>
                <td onDoubleClick={() => this.addEvent(28)}> {this.month()[28]} </td> <td onDoubleClick={() => this.addEvent(29)}> {this.month()[29]}  </td> <td onDoubleClick={() => this.addEvent(30)}> {this.month()[30]} </td> <td onDoubleClick={() => this.addEvent(31)}> {this.month()[31]} </td> <td onDoubleClick={() => this.addEvent(32)}> {this.month()[32]} </td> <td onDoubleClick={() => this.addEvent(33)}> {this.month()[33]} </td> <td onDoubleClick={() => this.addEvent(34)}> {this.month()[34]} </td>
              </tr>
              { (this.firstDay == 5 && this.lastDay >= 31 || this.firstDay == 6 && this.lastDay >= 30) &&
                <tr>
                  <td onDoubleClick={() => this.addEvent(35)}> {this.month()[35]} </td> <td onDoubleClick={() => this.addEvent(36)}> {this.month()[36]}  </td> <td onDoubleClick={() => this.addEvent(37)}> {this.month()[37]} </td> <td onDoubleClick={() => this.addEvent(38)}> {this.month()[38]} </td> <td onDoubleClick={() => this.addEvent(39)}> {this.month()[39]} </td> <td onDoubleClick={() => this.addEvent(40)}> {this.month()[40]} </td> <td onDoubleClick={() => this.addEvent(41)}> {this.month()[41]} </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

Month.propTypes = {
  wantedMonth: PropTypes.number.isRequired,
  wantedYear: PropTypes.number.isRequired,
  updateEvents: PropTypes.func.isRequired,
  backMonth: PropTypes.func.isRequired,
  forwardMonth: PropTypes.func.isRequired,
  todayMonth: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    eventId: PropTypes.number,
    eventName: PropTypes.string,
    eventDescription: PropTypes.string,
    eventDate: PropTypes.string,
    eventDuration: PropTypes.number
  })),
  holidays: PropTypes.arrayOf(PropTypes.shape({
    holidayName: PropTypes.string,
    holidayDescription: PropTypes.string,
    holidayDate: PropTypes.string,
    holidayDuration: PropTypes.number
  }))
};
