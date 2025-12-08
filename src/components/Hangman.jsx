import React from 'react';
import { useGame } from '../context/GameContext';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';

const Hangman = () => {
    const { wrongGuessCount, currentHint, gameStatus, playAgain, currentWord } = useGame();

    return (
        <div className="container">
            <div className="hangman-box">
                <img src={`/images/hangman-${wrongGuessCount}.svg`} draggable="false" alt="hangman-img" />
                <h1>Jogo da Forca</h1>
            </div>
            <div className="game-box">
                <WordDisplay />
                <h4 className="hint-text">Dica: <b>{currentHint}</b></h4>
                <h4 className="guesses-text">Erros: <b>{wrongGuessCount} / 6</b></h4>
                <Keyboard />
            </div>

            <div className={`game-modal ${gameStatus === 'won' || gameStatus === 'lost' ? 'show' : ''}`}>
                <div className="content">
                    <img src={gameStatus === 'won' ? '/images/victory.gif' : '/images/lost.gif'} alt="gif" />
                    <h4>{gameStatus === 'won' ? 'Tu Ganhou!' : 'Tu Perdeu!'}</h4>
                    <p>{gameStatus === 'won' ? 'Você encontrou a palavra:' : 'A palavra correta era:'} <b>{currentWord}</b></p>
                    <button className="play-again" onClick={playAgain}>Jogue de novo</button>
                </div>
            </div>
        </div>
    );
};

export default Hangman;
