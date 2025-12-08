import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const LoginModal = () => {
    const { login, gameStatus } = useGame();
    const [name, setName] = useState("");

    if (gameStatus !== 'login') return null;

    const handleSubmit = () => {
        if (name.trim()) {
            login(name.trim());
        } else {
            alert("Por favor, digite seu nome!");
        }
    };

    return (
        <div className="login-modal show">
            <div className="content">
                <h3>Bem-vindo ao Jogo da Forca!</h3>
                <p>Digite seu nome para começar:</p>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Seu nome" 
                    maxLength="15" 
                />
                <button onClick={handleSubmit}>Começar Jogo</button>
            </div>
        </div>
    );
};

export default LoginModal;
