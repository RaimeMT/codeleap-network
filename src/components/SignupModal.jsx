/**
 * PASSO 1 - Modal de Cadastro (Signup)
 *
 * O que faz:
 * - Mostra a primeira tela do app: um modal pedindo só o username.
 * - Não cria usuário no backend; guardamos o username só no frontend.
 * - O botão ENTER fica desabilitado (cinza) quando o campo está vazio.
 *
 * Quando o usuário clica em ENTER com um nome preenchido, chamamos onEnter(username)
 * e o App guarda esse nome para usar ao criar posts.
 */

import { useState } from 'react';
import './SignupModal.css';

export default function SignupModal({ onEnter }) {
  const [username, setUsername] = useState('');

  const isEmpty = !username.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty) return;
    onEnter(username.trim());
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal">
        <h2 className="signup-title">Welcome to CodeLeap network!</h2>
        <p className="signup-subtitle">Please enter your username</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="john doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-input"
            autoFocus
          />
          <button
            type="submit"
            className="signup-btn"
            disabled={isEmpty}
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
}
