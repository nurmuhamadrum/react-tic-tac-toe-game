import React, { useState } from "react";
import { Typography, Button, Modal } from 'antd';
import { squareStyle, boardStyle, containerStyle, instructionsStyle, buttonStyle } from './style';

const { Title, Text } = Typography;

function LandingPage() {
  const [turn, setTurn] = useState('X');
  const [cell, setCell] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const checkForWin = (square) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ]
    }

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          square[pattern[0]] === '' ||
          square[pattern[1]] === '' ||
          square[pattern[2]] === ''
        ) {
          // do nothing
        } else if (
          square[pattern[0]] === square[pattern[1]] &&
          square[pattern[1]] === square[pattern[2]]
        ) {
          setWinner(square[pattern[0]])
          showModal()
        }
      })
    }
  }

  const HandleClick = (num) => {
    if (cell[num] !== '') {
      alert('already clicked!')
      return
    }

    const square = [...cell];

    if (turn === 'X') {
      square[num] = 'X'
      setTurn('O');
    } else {
      square[num] = 'O'
      setTurn('X');
    }

    checkForWin(square)
    setCell(square)
  }

  const Square = ({ num }) => {
    return (
      <div
        className="square"
        style={squareStyle}
        onClick={() => HandleClick(num)}
      >
        <Title>{cell[num]}</Title>
      </div>
    );
  }

  return (
    <div className="game">
      <div className="game-board">
        <div style={containerStyle} className="gameBoard">
          <Title id="statusArea" className="status" level={2}>TIC TAC TOE GAME</Title>
          <Text id="statusArea" style={instructionsStyle} className="status">NEXT PLAYER : <span>{turn}</span></Text>
          <Text id="winnerArea" className="winner" style={instructionsStyle}>Winner: <Text type="success">{winner ? 'THE WINNER IS ' + winner : ''}</Text></Text>
          <Button style={buttonStyle} onClick={() => {
            setCell(Array(9).fill(''))
            setWinner()
          }}>Reset</Button>
          <div style={boardStyle}>
            <div className="board-row" style={rowStyle}>
              <Square num={0} />
              <Square num={1} />
              <Square num={2} />
            </div>
            <div className="board-row" style={rowStyle}>
              <Square num={3} />
              <Square num={4} />
              <Square num={5} />
            </div>
            <div className="board-row" style={rowStyle}>
              <Square num={6} />
              <Square num={7} />
              <Square num={8} />
            </div>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h2>{`THE GAME WINNER IS ${winner}!`}</h2>
        <Text>Let's play again</Text>
      </Modal>
    </div>
  );
}

const rowStyle = {
  display: 'flex'
}

export default LandingPage;
