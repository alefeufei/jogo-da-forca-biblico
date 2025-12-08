import React, { createContext, useState, useEffect, useContext } from 'react';
import { wordList } from '../data/wordList';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [playerName, setPlayerName] = useState("");
    const [score, setScore] = useState(0);
    const [lastScore, setLastScore] = useState(null);
    const [gameStatus, setGameStatus] = useState('login'); // login, playing, won, lost
    const [currentWord, setCurrentWord] = useState("");
    const [currentHint, setCurrentHint] = useState("");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuessCount, setWrongGuessCount] = useState(0);
    const [backgroundUrl, setBackgroundUrl] = useState("/images/bg-1.png");
    const maxGuesses = 6;

    const backgroundImages = [
        "/images/bg-1.png",
        "/images/bg-2.png",
        "/images/bg-3.png"
    ];

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("hangman_last_score"));
        if (savedData) {
            setLastScore(savedData);
        }
    }, []);

    const login = (name) => {
        setPlayerName(name);
        setGameStatus('playing');
        startNewGame();
    };

    const startNewGame = () => {
        const randomItem = wordList[Math.floor(Math.random() * wordList.length)];
        setCurrentWord(randomItem.word);
        setCurrentHint(randomItem.hint);
        setGuessedLetters([]);
        setWrongGuessCount(0);
        setGameStatus('playing');
        
        const randomBg = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
        setBackgroundUrl(randomBg);
    };

    const guessLetter = (letter) => {
        if (gameStatus !== 'playing' || guessedLetters.includes(letter)) return;

        setGuessedLetters(prev => [...prev, letter]);

        if (currentWord.includes(letter)) {
            const isWordComplete = currentWord.split('').every(char => 
                guessedLetters.includes(char) || char === letter
            );
            if (isWordComplete) {
                setGameStatus('won');
                setScore(prev => prev + 1);
            }
        } else {
            const newCount = wrongGuessCount + 1;
            setWrongGuessCount(newCount);
            if (newCount >= maxGuesses) {
                setGameStatus('lost');
                saveScore();
                setScore(0);
            }
        }
    };

    const saveScore = () => {
        const now = new Date();
        const dateString = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
        const scoreData = {
            score: score,
            date: dateString
        };
        localStorage.setItem("hangman_last_score", JSON.stringify(scoreData));
        setLastScore(scoreData);
    };

    const playAgain = () => {
        startNewGame();
    };

    return (
        <GameContext.Provider value={{
            playerName,
            score,
            lastScore,
            gameStatus,
            currentWord,
            currentHint,
            guessedLetters,
            wrongGuessCount,
            maxGuesses,
            backgroundUrl,
            login,
            guessLetter,
            playAgain
        }}>
            {children}
        </GameContext.Provider>
    );
};
