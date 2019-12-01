import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from "./DateCell.css"


export default class DateCell extends React.PureComponent {
  render() {
    return this.props.dateDisplay;
  }
}
