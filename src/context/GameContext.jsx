import React, { createContext, useState, useEffect, useContext } from 'react';
import { wordList } from '../data/wordList';
import { wordListHard } from '../data/wordListHard';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    const [playerName, setPlayerName] = useState("");
    const [score, setScore] = useState(0);
    const [scoreHistory, setScoreHistory] = useState([]); // Array of last 3 scores with date/time
    const [gameStatus, setGameStatus] = useState('login'); // login, playing, won, lost
    const [currentWord, setCurrentWord] = useState("");
    const [currentHint, setCurrentHint] = useState("");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuessCount, setWrongGuessCount] = useState(0);
    const [backgroundUrl, setBackgroundUrl] = useState("/images/bg-1.png");
    const [difficulty, setDifficulty] = useState('easy'); // easy, hard
    const [users, setUsers] = useState([]);

    const maxGuesses = 6;

    const backgroundImages = [
        "/images/bg-1.png",
        "/images/bg-2.png",
        "/images/bg-3.png"
    ];

    useEffect(() => {
        // Load users from local storage
        const savedUsers = JSON.parse(localStorage.getItem("hangman_users")) || [];
        setUsers(savedUsers);

        // Check for active session
        const activeUser = localStorage.getItem("hangman_active_user");
        if (activeUser) {
            const user = savedUsers.find(u => u.name === activeUser);
            if (user) {
                setPlayerName(user.name);
                setScore(user.score || 0);
                setScoreHistory(user.scoreHistory || []);
                setGameStatus('playing');
                startNewGame(user.lastDifficulty || 'easy'); // Pass difficulty to startNewGame if needed, or set state first
                setDifficulty(user.lastDifficulty || 'easy');
            }
        }
    }, []);

    // Effect to persist users whenever they change (optional, but safer to do in specific actions)
    useEffect(() => {
        if (users.length > 0) {
            localStorage.setItem("hangman_users", JSON.stringify(users));
        }
    }, [users]);

    // Slideshow effect for login screen to rotate backgrounds
    useEffect(() => {
        let interval;
        if (gameStatus === 'login') {
            interval = setInterval(() => {
                const randomBg = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
                setBackgroundUrl(randomBg);
            }, 3000); // Rotate every 3 seconds
        }
        return () => clearInterval(interval);
    }, [gameStatus]);

    // [FIX] Sync current score to user list whenever score changes (if logged in)
    useEffect(() => {
        if (playerName && users.length > 0) {
            setUsers(prevUsers => prevUsers.map(user => {
                if (user.name === playerName) {
                    // Update score if it's different. 
                    // Note: This updates the "current accumulated score" in the user list.
                    // If the game resets score on loss, the user list score will also reset if we do this directly.
                    // If the user wants a "cumulative high score", we should only update if new score > old score.
                    // BUT, the user said "creating a list with the points of other users". Usually this means "current score" or "total points".
                    // Given the game loop (reset on loss), if we want to KEEP points, we shouldn't reset on loss?
                    // OR, we reset the 'current interactive session' score but keep a 'totalScore' in user profile?
                    // Let's assume 'score' in context is 'current streak'.
                    // If user wants "points of other users", they probably mean "High Score".
                    // So we should only update if score > user.score.
                    // BUT, `score` state is currently just "current streak".
                    // Let's implement High Score logic for the user list.
                    return { ...user, score: Math.max(user.score || 0, score) };
                }
                return user;
            }));
        }
    }, [score, playerName]);

    const login = (name, preferredDifficulty) => {
        const trimmedName = name.trim();
        if (!trimmedName) return;

        setPlayerName(trimmedName);
        
        let currentUser = users.find(u => u.name === trimmedName);
        let currentDifficulty = preferredDifficulty || (currentUser ? currentUser.lastDifficulty : 'easy');
        // If preferredDifficulty is provided, it overrides stored preference. 
        // If not (e.g. quick resume?), use stored.
        // Actually, if we pass it from LoginModal, it will always be provided if we default it there.
        // Let's rely on LoginModal passing the state.
        if (!currentDifficulty) currentDifficulty = 'easy';

        if (currentUser) {
            setScore(currentUser.score || 0);
            setScoreHistory(currentUser.scoreHistory || []);
        } else {
            // New user
            const newUser = { name: trimmedName, score: 0, scoreHistory: [], lastDifficulty: currentDifficulty };
            setUsers(prev => [...prev, newUser]);
            setScore(0);
            setScoreHistory([]);
        }

        setDifficulty(currentDifficulty);
        localStorage.setItem("hangman_active_user", trimmedName);
        setGameStatus('playing');
        startNewGame(currentDifficulty);
    };

    const logout = () => {
        // Force save current state one last time before clearing
        // (Actually useEffect [score] handles the user list update, but lets be safe)
        setPlayerName("");
        setScore(0);
        setScoreHistory([]);
        setGameStatus('login');
        localStorage.removeItem("hangman_active_user");
    };

    const startNewGame = (diff = difficulty) => {
        const list = diff === 'hard' ? wordListHard : wordList;
        const randomItem = list[Math.floor(Math.random() * list.length)];
        setCurrentWord(randomItem.word);
        setCurrentHint(randomItem.hint);
        setGuessedLetters([]);
        setWrongGuessCount(0);
        setGameStatus('playing');
        
        let randomBg;
        do {
            randomBg = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
        } while (randomBg === backgroundUrl && backgroundImages.length > 1);
        
        setBackgroundUrl(randomBg);
    };

    const changeDifficulty = (newDifficulty) => {
        setDifficulty(newDifficulty);
        // Update user preference immediately
        setUsers(prev => prev.map(u => 
            u.name === playerName ? { ...u, lastDifficulty: newDifficulty } : u
        ));
        startNewGame(newDifficulty);
    };

    const guessLetter = (letter) => {
        if (gameStatus !== 'playing' || guessedLetters.includes(letter)) return;

        setGuessedLetters(prev => [...prev, letter]);

        if (currentWord.includes(letter)) {
            const isWordComplete = currentWord.split('').every(char => 
                char === ' ' || guessedLetters.includes(char) || char === letter
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
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const scoreData = {
            score: score,
            date: dateString,
            time: timeString
        };
        
        // Add new score to history and keep only last 3
        const newHistory = [scoreData, ...scoreHistory].slice(0, 3);
        setScoreHistory(newHistory);

        // Update user data
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.map(user => {
                if (user.name === playerName) {
                    return { ...user, scoreHistory: newHistory, score: score };
                }
                return user;
            });
            // If for some reason user wasn't found (shouldn't happen), add them
            if (!updatedUsers.find(u => u.name === playerName)) {
                updatedUsers.push({ name: playerName, score: score, scoreHistory: newHistory, lastDifficulty: difficulty });
            }
            return updatedUsers;
        });
    };

    const playAgain = () => {
        startNewGame();
    };

    return (
        <GameContext.Provider value={{
            playerName,
            score,
            scoreHistory,
            gameStatus,
            currentWord,
            currentHint,
            guessedLetters,
            wrongGuessCount,
            maxGuesses,
            difficulty,
            users,
            backgroundUrl,
            login,
            logout,
            guessLetter,
            playAgain,
            changeDifficulty
        }}>
            {children}
        </GameContext.Provider>
    );
};
