/**
 * App principal - fluxo como um júnior faria:
 *
 * 1. Se não tem username → mostra o modal de Signup.
 * 2. Usuário digita o nome e clica ENTER → guardamos no state e escondemos o modal.
 * 3. Mostramos a tela principal (MainScreen) com o username guardado.
 *
 * O username fica só no React state (não tem backend de usuários).
 * Ao criar um post, enviamos esse username na requisição para a API.
 */

import { useState } from 'react';
import SignupModal from './components/SignupModal';
import MainScreen from './components/MainScreen';
import './App.css';

function App() {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('codeleap_username') || '';
  });

  const handleSignup = (name) => {
    setUsername(name);
    localStorage.setItem('codeleap_username', name);
  };

  return (
    <>
      {!username ? (
        <SignupModal onEnter={handleSignup} />
      ) : (
        <MainScreen username={username} />
      )}
    </>
  );
}

export default App;
