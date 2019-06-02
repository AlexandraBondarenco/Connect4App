import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Player.css";

export default class Player extends Component {
  getPlayerClass() {
    if (this.props.turn) {
      return this.props.color;
    }
  }

  render() {
    return (
      <div
        className="player"
        style={{ backgroundColor: this.getPlayerClass() }}
      >
        {this.props.name}
      </div>
    );
  }
}

Player.propTypes = {
  turn: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired, 
  color: PropTypes.string.isRequired
};
