import React from 'react';
import { useGame } from '../context/GameContext';

const WordDisplay = () => {
    const { currentWord, guessedLetters, gameStatus } = useGame();

    return (
        <ul className="word-display">
            {currentWord.split("").map((letter, index) => {
                const isSpace = letter === ' ';
                return (
                    <li key={index} className={`letter ${isSpace ? "space" : ""} ${!isSpace && (guessedLetters.includes(letter) || gameStatus !== 'playing') ? "guessed" : ""}`}>
                        {isSpace || guessedLetters.includes(letter) || gameStatus !== 'playing' ? letter : ""}
                    </li>
                );
            })}
        </ul>
    );
};

export default WordDisplay;
