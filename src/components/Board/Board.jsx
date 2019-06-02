import React, { Component } from "react";
import Cell from "../Cell/Cell";
import "./Board.css";
import PropTypes from "prop-types";

const COL = 7;
const ROW = 6;
var FLAG = false;

export default class Board extends Component {
  state = {
    board: [],
    winingCombination: []
  };

  componentDidMount() {
    this.initBoard();
  }

  initBoard = () => {
    const newBoard = [];
    const winingCombination = [];
    for (let i = 0; i < ROW; i++) {
      newBoard[i] = [];
      winingCombination[i] = [];
      for (let j = 0; j < COL; j++) {
        newBoard[i][j] = "free";
        winingCombination[i][j] = false;
      }
    }
    this.setState({ winingCombination, board: newBoard });
  };

  handlePlayerClick = pos => {
    const updatedBoard = [...this.state.board];

    for (let i = 5; i >= 0; i--) {
      if (updatedBoard[i][pos.col] === "free") {
        updatedBoard[i][pos.col] = this.props.playerTurn;
        if (FLAG === false) {
          this.setState({ board: updatedBoard });
          this.checkWin(i, pos.col);
          this.props.handlePlayersClickTurn();
        }
        break;
      }
    }
  };

  checkWin = (row, col) => {
    const { board } = this.state;
    const result = {
      left_diag: {
        sum: 0,
        posArr: []
      },
      right_diag: {
        sum: 0,
        posArr: []
      },
      horizontal: {
        sum: 0,
        posArr: []
      },
      vertical: {
        sum: 0,
        posArr: []
      }
    };

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (
          Math.abs(i - row) < 4 &&
          Math.abs(j - col) < 4 &&
          this.props.playerTurn === board[i][j]
        ) {
          if (j === col) {
            result.vertical.sum += 1;
            result.vertical.posArr.push({ row: i, col: j });
          }
          if (i - row === j - col) {
            result.left_diag.sum += 1;
            result.left_diag.posArr.push({ row: i, col: j });
          }
          if (i === row) {
            result.horizontal.sum += 1;
            result.horizontal.posArr.push({ row: i, col: j });
          }
          if (i - row === Math.abs(j - col)) {
            result.right_diag.sum += 1;
            result.right_diag.posArr.push({ row: i, col: j });
          }
        }
      }
    }

    if (result.left_diag.sum > 3) {
      this.lightWinCombination(result.left_diag.posArr);
      FLAG = true;
    } else if (result.right_diag.sum > 3) {
      this.lightWinCombination(result.right_diag.posArr);
      FLAG = true;
    } else if (result.horizontal.sum > 3) {
      this.lightWinCombination(result.horizontal.posArr);
      FLAG = true;
    } else if (result.vertical.sum > 3) {
      this.lightWinCombination(result.vertical.posArr);
      FLAG = true;
    }
  };

  lightWinCombination = posArr => {
    const updateWinCombination = [...this.state.winingCombination];
    for (let i = 0; i < posArr.length; i++) {
      updateWinCombination[posArr[i].row][posArr[i].col] = true;
    }
    this.setState({ winingCombination: updateWinCombination }, () => {
      setTimeout(() => {
        this.props.handlePlayersClickTurn();
        alert(this.props.playerTurn + " WON");
      }, 300);
    });
  };

  drawBoard = () => {
    const { board, winingCombination } = this.state;
    return board.map((row, i) => (
      <div key={`ROW_${i}`} className="row">
        {row.map((cell, j) => (
          <Cell
            key={`COLUMN_${j}`}
            color={cell}
            isWinCell={winingCombination[i][j]}
            pos={{ row: i, col: j }}
            handlePlayerClick={this.handlePlayerClick} 
          />
        ))}
      </div>
    ));
  };

  newGame = () => {
    this.initBoard();
    this.props.setPlayerTurnOnInit();
    FLAG = false;
  };

  render() {
    return (
      <div className="board">
        {this.drawBoard()}

        <div className="new-game" onClick={this.newGame}>
          New Game
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  playerTurn: PropTypes.string.isRequired,
  handlePlayersClickTurn: PropTypes.any.isRequired,
  setPlayerTurnOnInit: PropTypes.any.isRequired
};
