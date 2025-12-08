import React from 'react';
import { useGame } from '../context/GameContext';

const WordDisplay = () => {
    const { currentWord, guessedLetters, gameStatus } = useGame();

    return (
        <ul className="word-display">
            {currentWord.split("").map((letter, index) => (
                <li key={index} className={`letter ${guessedLetters.includes(letter) || gameStatus !== 'playing' ? "guessed" : ""}`}>
                    {guessedLetters.includes(letter) || gameStatus !== 'playing' ? letter : ""}
                </li>
            ))}
        </ul>
    );
};

export default WordDisplay;
