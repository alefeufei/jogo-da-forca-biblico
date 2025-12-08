import React from 'react';
import { useGame } from '../context/GameContext';

const ScoreBoard = () => {
    const { playerName, score, lastScore, gameStatus } = useGame();

    if (gameStatus === 'login') return null;

    return (
        <div className="score-board">
            <p>Jogador: <span>{playerName}</span></p>
            <p>Pontuação Atual: <span>{score}</span></p>
            <p>Última Pontuação: <span>{lastScore ? `${lastScore.score} (${lastScore.date})` : '-'}</span></p>
        </div>
    );
};

export default ScoreBoard;
