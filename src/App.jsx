import React, { useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import LoginModal from './components/LoginModal';
import ScoreBoard from './components/ScoreBoard';
import Hangman from './components/Hangman';

const GameContent = () => {
    const { backgroundUrl } = useGame();

    useEffect(() => {
        document.body.style.backgroundImage = `url('${backgroundUrl}')`;
    }, [backgroundUrl]);

    return (
        <>
            <LoginModal />
            <ScoreBoard />
            <Hangman />
        </>
    );
};

function App() {
    return (
        <GameProvider>
            <GameContent />
        </GameProvider>
    );
}

export default App;
