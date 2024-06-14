import './App.css';

import React, { useState } from 'react';
import Board from './components/Board/Board';
import Modal from './components/Modal/Modal';

function App() {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [isXNext, setIsXNext] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [winner, setWinner] = useState(null);

	const handleClick = (index) => {
		if (board[index] || winner) {
			return;
		}
		const newBoard = [...board];
		newBoard[index] = isXNext ? 'X' : 'O';

		setBoard(newBoard);
		setIsXNext(!isXNext);

		const playerWon = calculateWinner(newBoard);
		if (playerWon) {
			setWinner(playerWon);
			setShowModal(true);
		}
	};

	const handleReset = () => {
		setBoard(Array(9).fill(null));
		setIsXNext(true);
		setWinner(null);
		setShowModal(false);
	};

	const calculateWinner = (squares) => {
		const winningConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < winningConditions.length; i++) {
			const [a, b, c] = winningConditions[i];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a] === 'X' ? 'Player 1' : 'Player 2';
			}
		}
		
		return null;
	};

	const status = winner
		? `Winner: ${winner}`
		: `Next player: ${isXNext ? 'X' : 'O'}`;

	return (
		<div className="game">
			<h1>Tic-Tac-Toe Showdown</h1>
			<div className="game-board">
				<Board squares={board} onClick={handleClick} />
			</div>
			<div className="game-info">
				<div>
					{status}
					<div className="player-info">
						<p>Player 1: X</p>
						<p>Player 2: O</p>
					</div>
				</div>
				<button className="reset-button" onClick={handleReset}>
					Reset Game
				</button>
			</div>
			{showModal && <Modal winner={winner} onClose={handleReset} />}
		</div>
	);
}

export default App;
