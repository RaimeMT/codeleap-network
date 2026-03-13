# Explicação do Projeto

Projeto de teste frontend: rede social simples onde o usuário entra com um **username**, cria, edita e exclui **posts**, usando a API em `https://dev.codeleap.co.uk/careers/`.

---

## Passo a passo técnico

1. **Modal de Signup** – Primeira tela: pede só o username botão ENTER desabilitado se o campo estiver vazio.
2. **Tela principal** – Header "CodeLeap Network", formulário "What's on your mind?" (Title + Content), botão Create desabilitado se algum campo estiver vazio.
3. **Lista de posts** – Busca da API, ordenada do mais recente no topo; ícones de editar e excluir só nos posts do usuário logado (comparação por string do username).
4. **Modal de delete** – Ao clicar em excluir: "Are you sure you want to delete this item?" com Cancel e Delete (vermelho).
5. **Modal de edição** – Ao clicar em editar: modal com Title e Content e botões Cancel e Save (verde).

### 1. Modal de Signup (`SignupModal.jsx`)

- **Estado:** `username` no `useState` (string).
- **Regra:** botão ENTER fica `disabled` quando `username.trim() === ''` e com estilo “cinza”.
- **Ao enviar:** chama `onEnter(username)`; o `App` guarda no state e no `localStorage` (para “persistir” o login no refresh).
- Não chama backend de usuários; o username fica só no frontend.

### 2. Tela principal (`MainScreen.jsx`)

- **Header:** barra azul com "CodeLeap Network".
- **Formulário de criar post:**
  - Campos: Title, Content.
  - Botão Create: `disabled` se `title.trim() === ''` ou `content.trim() === ''`.
  - Ao enviar: `createPost({ username, title, content })` e depois `loadPosts()` para atualizar a lista.
- **Lista:** vem de `getPosts()`; `results` ordenados por `created_datetime` (mais recente primeiro).
- **Quem pode editar/excluir:** só se `post.username === username` (comparação de string), então os ícones de editar e excluir só aparecem nos “seus” posts.

### 3. API (`src/api/careers.js`)

- Base: `https://dev.codeleap.co.uk/careers`.
- **GET /** – lista (resposta: `{ count, next, previous, results }`).
- **POST /** – criar: body `{ username, title, content }`.
- **PATCH /:id/** – editar: body `{ title, content }`.
- **DELETE /:id/** – excluir.

Tudo com `axios` e `Content-Type: application/json`.

### 4. Modal de Delete (`DeleteModal.jsx`)

- Overlay escuro; modal com a pergunta e dois botões.
- **Cancel:** fecha o modal (só chama `onCancel`).
- **Delete:** chama `onConfirm`; no `MainScreen`, isso chama `deletePost(id)` e depois `loadPosts()`.

### 5. Modal de Edição (`EditModal.jsx`)

- Recebe o `post` a editar; preenche Title e Content no state.
- **Cancel:** fecha sem salvar (`onCancel`).
- **Save:** chama `onSave(newTitle, newContent)`; no `MainScreen`, chama `updatePost(id, { title, content })` e depois `loadPosts()`.
- Botão Save pode ficar `disabled` se título ou conteúdo estiverem vazios.

### 6. Fluxo no `App.jsx`

- State: `username` (inicializado com `localStorage.getItem('codeleap_username')` se existir).
- Se **não** tem username → renderiza só `<SignupModal onEnter={handleSignup} />`.
- Se **tem** username → renderiza só `<MainScreen username={username} />`.
- Assim a “primeira tela” é realmente o modal de signup; depois só a tela principal.


Abre em `http://localhost:5173` (ou a porta que o Vite mostrar).

---

## Critérios do teste

- Signup: modal, só username, botão desabilitado quando vazio.
- Main: criar post, buscar lista da API, ordenar mais recente no topo, lista atualiza ao criar.
- Editar/excluir: apenas nos próprios posts (comparação de username).
- Delete: modal de confirmação antes de excluir.
- Edit: modal para editar título e conteúdo.
- Layout e textos alinhados aos designs (header azul, cards brancos, botões Cancel/Delete/Save nos modais).

Se a API devolver outros campos (por exemplo `created_datetime` em outro formato), basta ajustar `formatTimeAgo` e o mapeamento em `MainScreen.jsx`.
