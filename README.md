# Jogo da Forca Biblico (Hangman Game) 🎮

Bem-vindo ao **Jogo da Forca**! Este projeto é uma versão moderna e interativa do clássico jogo de palavras, agora reconstruído com **ReactJS** e **Vite** para oferecer uma experiência de usuário superior, responsiva e visualmente atraente.

## ✨ Funcionalidades e Melhorias

Este projeto passou por uma refatoração completa e ganhou diversas novas funcionalidades:

### 🚀 Tecnologia Moderna
- **ReactJS + Vite**: Migração completa de Vanilla JS para React, garantindo melhor performance, modularidade e facilidade de manutenção.
- **Componentização**: Código organizado em componentes reutilizáveis (`LoginModal`, `ScoreBoard`, `Hangman`, etc.).
- **Context API**: Gerenciamento de estado global eficiente para controlar o fluxo do jogo.

### 👤 Experiência do Usuário
- **Sistema de Login**: Identifique-se antes de começar a jogar.
- **Placar Persistente**:
    - Acompanhe sua pontuação atual (vitórias consecutivas).
    - **Histórico**: Sua última pontuação é salva automaticamente (com data) e recuperada quando você volta ao jogo.
- **Imagens de Fundo Dinâmicas**: A cada nova partida, uma imagem de fundo diferente é carregada para manter o visual fresco.

### ⌨️ Jogabilidade Aprimorada
- **Suporte a Teclado Físico**: Jogue usando as teclas do seu computador (A-Z) ou clique no teclado virtual na tela.
- **Design Responsivo**: O jogo se adapta perfeitamente a qualquer dispositivo:
    - 📱 Celulares
    - 💻 Tablets
    - 🖥️ Desktops

## 🛠️ Como Rodar o Projeto

1.  **Instale as dependências**:
    ```bash
    npm install
    ```

2.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

3.  **Acesse o jogo**:
    Abra o navegador no link exibido no terminal (geralmente `http://localhost:5173`).

## 📂 Estrutura do Projeto

- `src/components/`: Componentes de UI (Modal, Placar, Teclado, etc.).
- `src/context/`: Lógica de estado global (`GameContext`).
- `src/data/`: Lista de palavras e dicas.
- `public/images/`: Assets estáticos.

---

Desenvolvido com 💙 e React.
