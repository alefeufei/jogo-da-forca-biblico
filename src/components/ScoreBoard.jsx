import React from 'react';
import { useGame } from '../context/GameContext';

const ScoreBoard = () => {
    const { playerName, score, scoreHistory, gameStatus, logout, difficulty } = useGame();

    if (gameStatus === 'login') return null;

    return (
        <div className="score-board">
            <p>Jogador: <span>{playerName}</span></p>
            <p>Nível: <span>{difficulty === 'hard' ? 'Difícil' : 'Fácil'}</span></p>
            <p>Pontuação Atual: <span>{score}</span></p>
            
            <div style={{ marginTop: '10px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
                <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>Últimas Pontuações:</p>
                {scoreHistory.length > 0 ? (
                    scoreHistory.map((item, index) => (
                        <p key={index} style={{ fontSize: '0.85rem', margin: '3px 0' }}>
                            <span>{item.score} pts</span> - {item.date} às {item.time}
                        </p>
                    ))
                ) : (
                    <p style={{ fontSize: '0.85rem', color: '#999' }}>Nenhuma pontuação registrada</p>
                )}
            </div>
            
            <button className="logout-btn" onClick={logout}>Sair / Trocar Usuário</button>
        </div>
    );
};

export default ScoreBoard;
