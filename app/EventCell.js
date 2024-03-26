import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from "./EventCell.css";
import Modal from 'react-modal';
import axios from 'axios';

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
    width: '50px',
    minWidth: '300px',
    height: '25%'
  }
};

const customStyles2 = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: '0px',
    height: '65%',
    width: '350px',
    minWidth: '50px'
  }
};

export default class EventCell extends React.Component {
  constructor(props) {
    super(props);

    this.titleInput = React.createRef();

    this.state = {
      eventModalOpen: false
    }

    this.openEventModal = this.openEventModal.bind(this);
    this.afterOpenEventModal = this.afterOpenEventModal.bind(this);
    this.closeEventModal = this.closeEventModal.bind(this);

    this.openEditModal = this.openEditModal.bind(this);
    this.afterOpenEditModal = this.afterOpenEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
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

  openEditModal() {
    this.setState({editModalOpen: true});
  }

  afterOpenEditModal() {
    this.titleInput.focus();
  }

  closeEditModal() {
    this.setState({editModalOpen: false});
  }

  editEvent() {
    this.setState({eventModalOpen: false, editModalOpen: true});
  }

  submitEventEdits(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({editModalOpen: false});

    var eventName = document.getElementById('name').value;
    var eventDescription = document.getElementById('description').value;
    var eventHour = document.getElementById('hour').value;
    var eventMinutes = document.getElementById('minutes').value;
    var eventDuration = document.getElementById('duration').value;
    var eventDate = new Date(this.props.event.eventDate);
    eventDate.setHours(eventHour);
    eventDate.setMinutes(eventMinutes);
    var dataObj = {};
    dataObj[eventDate.toISOString()] = {name: eventName, description: eventDescription, duration: eventDuration, id: this.props.event.id}
    console.log(dataObj)

    axios.post('/editEvent', dataObj).then((res) => {
      this.props.updateEvents();
      alert("Event successfuly edited!");
    });
  }

  deleteEvent() {
    this.setState({eventModalOpen: false, editModalOpen: false });

    if (confirm('Are you sure you want to delete this event?')) {
      axios.post('/deleteEvent', this.props.event.id).then((res) => {
        this.props.updateEvents();
        alert("Event successfuly deleted!");
      });
    }
  }

  zeroAdd(n) {
    return (n < 10 ? '0' : '') + n;
  }


  render() {
    return (
      <React.Fragment>
        <div onClick={this.openEventModal} className={styles.event}>
          {this.props.event &&
            <React.Fragment>
              {this.props.event.eventName}
            </React.Fragment>
          }
        </div>

        {this.props.event &&
          <div>
            <Modal
              isOpen={this.state.eventModalOpen}
              onAfterOpen={this.afterOpenEventModal}
              onRequestClose={this.closeEventModal}
              style={customStyles}
              contentLabel="Event Modal"
            >
              <div>
                <button onClick={() => this.editEvent()} className={styles.button} style={{ top: 3, left: 2, position: 'absolute', borderRadius: '10px'}}>Edit</button>
                <button onClick={() => this.deleteEvent()} className={styles.button} style={{ top: 3, left: 50, position: 'absolute', borderRadius: '10px'}}>Delete</button>
                <h2>{this.props.event.eventName}</h2>
                <span>On {new Date(this.props.event.eventDate).toLocaleDateString()}</span>
                <br />
                <span>Event takes place at {new Date(this.props.event.eventDate).getHours() > 12 ? new Date(this.props.event.eventDate).getHours() - 12 : new Date(this.props.event.eventDate).getHours()}:{this.zeroAdd(new Date(this.props.event.eventDate).getMinutes())} {new Date(this.props.event.eventDate).getHours() > 12 ? 'PM' : 'AM'}</span>
                <br />
                <br />
                <span>{this.props.event.eventDescription}</span>
                <br />
                <br />
                <span>Event lasts for {this.props.event.eventDuration} minutes.</span>
              </div>
            </Modal>

            <Modal
              isOpen={this.state.editModalOpen}
              onAfterOpen={this.afterOpenEditModal}
              onRequestClose={this.closeEditModal}
              style={customStyles2}
              contentLabel="Edit Modal"
            >
              <div style={{position: 'relative'}}>
                <h1 style={{fontSize: '25px', marginBottom: '30px'}}>Edit Event</h1>
                <button onClick={() => this.setState({editModalOpen: false})} className={styles["exit-button"]}>X</button>
                <form style={{fontSize: '15px'}} onSubmit={(event) => this.submitEventEdits(event)}>
                  <label style={{fontSize: '19px'}}>Title: </label>
                  <br />
                  <input style={{fontSize: '17px', width: "250px"}} ref={(el) => { this.titleInput = el }} defaultValue={this.props.event.eventName} type="text" id="name"></input>
                  <br />
                  <br />
                  <label>Description: </label>
                  <br />
                  <textarea style={{width: "250px"}} defaultValue={this.props.event.eventDescription} type="text" id="description"></textarea>
                  <br />
                  <br />
                  <span style={{fontSize: '15px'}}>Date: {new Date(this.props.event.eventDate).toLocaleDateString()}</span>
                  <br />
                  <h3>Event Time: </h3>
                  <label>Hour: </label>
                  <select className={styles["hour-select"]} defaultValue={new Date(this.props.event.eventDate).getHours().toString()} id="hour">
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
                  <input defaultValue={new Date(this.props.event.eventDate).getMinutes()} type="number" min="0" max="59" id="minutes"></input>
                  <br />
                  <br />
                  <label>Duration (minutes): </label>
                  <input style={{width: "30px"}} defaultValue={this.props.event.eventDuration} min="0" id="duration"></input>
                  <br />
                  <br />
                  <input className={styles["submit-button"]} type="submit" value="Submit edits"></input>
                </form>
                <br />
              </div>
            </Modal>
          </div>
        }
      </React.Fragment>
    );
  }
}

EventCell.propTypes = {
  event: PropTypes.object,
  updateEvents: PropTypes.func.isRequired
};
