import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from "./HolidayCell.css";
import Modal from 'react-modal';

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
    height: '30%'
  }
};

export default class HolidayCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      holidayModalOpen: false
    }

    this.openHolidayModal = this.openHolidayModal.bind(this);
    this.afterOpenHolidayModal = this.afterOpenHolidayModal.bind(this);
    this.closeHolidayModal = this.closeHolidayModal.bind(this);
  };

  openHolidayModal() {
    this.setState({holidayModalOpen: true});
  }

  afterOpenHolidayModal() {
    console.log("open")
  }

  closeHolidayModal() {
    this.setState({holidayModalOpen: false});
  }

  render() {
    return (
      <div>
        <div onClick={this.openHolidayModal} className={styles.holiday}>
          {this.props.holiday &&
            <div>
              {this.props.holiday.holidayName}
            </div>
          }
        </div>

        {this.props.holiday &&
          <div>
            <Modal
              isOpen={this.state.holidayModalOpen}
              onAfterOpen={this.afterOpenHolidayModal}
              onRequestClose={this.closeHolidayModal}
              style={customStyles}
              contentLabel="Holiday Modal"
            >
              <div>
                <h2>{this.props.holiday.holidayName}</h2>
                <span>{new Date(this.props.holiday.holidayDate).toLocaleDateString()}</span>
                <br />
                <span>{this.props.holiday.holidayDescription}</span>
                <br />
                <span>Holiday lasts for {this.props.holiday.holidayDuration / 1440} day.</span>
              </div>
            </Modal>
          </div>
        }
      </div>
    );
  }
}

HolidayCell.propTypes = {
  holiday: PropTypes.object,
};
