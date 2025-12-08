import React from 'react';
import { useGame } from '../context/GameContext';

const Keyboard = () => {
    const { guessLetter, guessedLetters, gameStatus } = useGame();

    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameStatus !== 'playing') return;
            
            const letter = e.key.toLowerCase();
            if (/^[a-z]$/.test(letter)) {
                guessLetter(letter);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [guessLetter, gameStatus]);

    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

    return (
        <div className="keyboard">
            {alphabet.map((letter) => (
                <button
                    key={letter}
                    disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
                    onClick={() => guessLetter(letter)}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default Keyboard;
