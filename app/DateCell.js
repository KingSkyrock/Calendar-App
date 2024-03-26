import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import EventCell from './EventCell.js';
import HolidayCell from './HolidayCell.js';
import Modal from 'react-modal';
import styles from './DateCell.css';

Modal.setAppElement('#root');

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: '30%',
    minWidth: '30%',
    height: '40%',
    minWidth: '325px'
  }
};

export default class DateCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventModalOpen: false
    }

    this.openEventModal = this.openEventModal.bind(this);
    this.afterOpenEventModal = this.afterOpenEventModal.bind(this);
    this.closeEventModal = this.closeEventModal.bind(this);
  };

  openEventModal() {
    this.setState({eventModalOpen: true});
  }

  afterOpenEventModal() {
    console.log("open")
  }

  closeEventModal() {
    this.setState({eventModalOpen: false});
  }


  render() {
    return (
      <React.Fragment>
        {this.props.isToday ?
          <div className={styles.day}><span className={styles.today} style={{backgroundColor: "#2E97F5", borderRadius: "100px", padding: '5px'}}>{this.props.dateDisplay}</span></div>
        :
          <div className={styles.day}>{this.props.dateDisplay}</div>
        }
        <div style={{height: '25%'}}></div>
        {this.renderHolidays()}
        {this.renderEvents(false)}
        <Modal
          isOpen={this.state.eventModalOpen}
          onAfterOpen={this.afterOpenEventModal}
          onRequestClose={this.closeEventModal}
          style={customStyles}
          contentLabel="All Events Modal"
        >
          <div>
            <h1 style={{fontSize: '25px', marginBottom: '30px'}}>All Events</h1>
            {this.renderEvents(true)}
          </div>
        </Modal>
      </React.Fragment>
    );
  }

  renderEvents(modal) {
    var output = [];
    var eventsList = [];
    if (this.props.events != null) {
      var sortedEvents = this.props.events.sort((a, b) => {
        if (a.eventDate < b.eventDate)
           return -1;
        if (a.eventDate > b.eventDate)
          return 1;
        return 0;
      });
      for (var i = 0; i < sortedEvents.length; i++) {
        if (sortedEvents[i] != undefined && sortedEvents[i]) {
          eventsList.push(<EventCell key={`event-${i}`} updateEvents={() => {this.props.updateEvents()}} event={sortedEvents[i]}/>)
          output.push(<EventCell key={`event-${i}`} updateEvents={() => {this.props.updateEvents()}} event={sortedEvents[i]}/>)
        }
      }
      if (!modal) {
        if (eventsList.length > 4) {
          output.splice(3)
          console.log(eventsList.length)
          output.push(<div onClick={this.openEventModal} className={styles.moreEvt}>{eventsList.length - 3} more events...</div>)
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

DateCell.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    eventId: PropTypes.number,
    eventName: PropTypes.string,
    eventDescription: PropTypes.string,
    eventDate: PropTypes.string,
    eventDuration: PropTypes.number
  }))
};
