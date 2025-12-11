import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

const LoginModal = () => {
    const { login, gameStatus, users } = useGame();
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("easy");

    if (gameStatus !== 'login') return null;

    const handleSubmit = () => {
        if (name.trim()) {
            login(name.trim(), difficulty);
        } else {
            alert("Por favor, digite seu nome!");
        }
    };

    const handleKeypress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    // Sort users by score (descending)
    const sortedUsers = [...users].sort((a, b) => b.score - a.score);

    return (
        <div className="login-modal show">
            <div className="content">
                <h3>Bem-vindo ao Jogo da Forca Bíblico!</h3>
                
                {sortedUsers.length > 0 && (
                    <div className="user-list-container">
                        <div className="user-list-title">Jogadores Anteriores:</div>
                        {sortedUsers.map((user, index) => (
                            <div key={index} className="user-item">
                                <span>{user.name}</span>
                                <div>
                                    <span className="score">{user.score} pts</span>
                                    <button onClick={() => login(user.name, difficulty)}>Jogar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {sortedUsers.length > 0 && (
                    <div className="divider">
                        <span>OU Novo Jogador</span>
                    </div>
                )}

                <p>Escolha a dificuldade:</p>
                <div className="difficulty-selection">
                    <label>
                        <input 
                            type="radio" 
                            name="difficulty" 
                            value="easy" 
                            checked={difficulty === 'easy'} 
                            onChange={(e) => setDifficulty(e.target.value)} 
                        />
                        Fácil
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="difficulty" 
                            value="hard" 
                            checked={difficulty === 'hard'} 
                            onChange={(e) => setDifficulty(e.target.value)} 
                        />
                        Difícil
                    </label>
                </div>

                <p>Digite seu nome para começar:</p>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    onKeyPress={handleKeypress}
                    placeholder="Seu nome" 
                    maxLength="15" 
                />
                <button onClick={handleSubmit}>Começar Jogo</button>
            </div>
        </div>
    );
};

export default LoginModal;
