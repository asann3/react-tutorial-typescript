import React, { useState } from 'react';
import { ISquare, History } from '../interface';
import Board from './Board';

// useState関数は、Genericsに定義したいstateの型、引数に定義したいstateの初期値を渡すと、[stateの値, stateを更新する関数]という形の配列を返す
// useState関数のGenericsで型を制約しているため、GameState型を使わなくて良い
const Game: React.FC = () => {
    const [history, setHistory] = useState<History[]>([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState<number>(0);
    const [xIsNext, setXIsNext] = useState<boolean>(true);

	const handleClick = (i: number) => {
		const _history = history.slice(0, stepNumber + 1);
		const current = _history[_history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = xIsNext ? "X" : "O";
        setHistory(_history.concat([ { squares: squares }]));
        setStepNumber(_history.length);
        setXIsNext(!xIsNext);
	}
	const jumpTo = (step: number) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
	}
	// render() {
		// const history = this.state.history;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
        const desc = move ? "Go to move #" + move : "Go to game start";
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i: number) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
    // }
}
function calculateWinner(squares: Array<ISquare>) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
export default Game;
