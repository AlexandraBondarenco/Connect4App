import React, { Component } from "react";
import Board from "../Board/Board";
import Player from "../Player/Player";

import "./Game.css";

export default class Game extends Component {
  state = {
    playerTurn: "Player1"
  };

  changePlayerTurn = () => {
    if (this.state.playerTurn === "Player1") {
      this.setState({ playerTurn: "Player2" });
    } else {
      this.setState({ playerTurn: "Player1" });
    }
  };

  setPlayerTurnOnInit = () => {
    this.setState({ playerTurn: "Player1" });
  };

  render() {
    return (
      <div>
        <div className="header">4 in a Row</div>
        <div className="game-container">
          <Player
            turn={this.state.playerTurn === "Player1"}
            name={"Player1"}
            color={"red"}
          />
          <Board
            playerTurn={this.state.playerTurn}
            handlePlayersClickTurn={this.changePlayerTurn}
            setPlayerTurnOnInit={this.setPlayerTurnOnInit}
          />
          <Player
            turn={this.state.playerTurn === "Player2"}
            name={"Player2"}
            color={"blue"}
          />
        </div>
      </div>
    );
  }
}
