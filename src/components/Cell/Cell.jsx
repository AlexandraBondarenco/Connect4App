import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Cell.css";

export default class Cell extends Component {
  handlePlayersMove = () => {
    const { handlePlayerClick, pos } = this.props;
    handlePlayerClick(pos);
  };

  getCellColor() {
    if (this.props.isWinCell) {
      return "cell green-glow cell-" + this.props.color;
    } else {
      return "cell cell-" + this.props.color;
    }
  }

  render() {
    return (
      <div className={this.getCellColor()} onClick={this.handlePlayersMove} />
    );
  }
}

Cell.propTypes = {
  color: PropTypes.string.isRequired,
  pos: PropTypes.object.isRequired,
  handlePlayerClick: PropTypes.any.isRequired,
  isWinCell: PropTypes.bool.isRequired
};
