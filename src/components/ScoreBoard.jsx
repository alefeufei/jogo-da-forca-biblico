import React from 'react';
import { useGame } from '../context/GameContext';

const ScoreBoard = () => {
    const { playerName, score, lastScore, gameStatus, logout, difficulty } = useGame();

    if (gameStatus === 'login') return null;

    return (
        <div className="score-board">
            <p>Jogador: <span>{playerName}</span></p>
            <p>Nível: <span>{difficulty === 'hard' ? 'Difícil' : 'Fácil'}</span></p>
            <p>Pontuação Atual: <span>{score}</span></p>
            <p>Última Pontuação: <span>{lastScore ? `${lastScore.score} (${lastScore.date})` : '-'}</span></p>
            <button className="logout-btn" onClick={logout}>Sair / Trocar Usuário</button>
        </div>
    );
};

export default ScoreBoard;
