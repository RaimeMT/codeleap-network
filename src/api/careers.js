/**
 * Resposta do GET: { count, next, previous, results: [] }
 * Cada item em results tem: id, username, created_datetime, title, content (e talvez author_ip).
 */

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/** Busca todos os posts (lista paginada). */
export async function getPosts() {
  const { data } = await api.get('/');
  return data;
}

/** Cria um novo post. Campos obrigatórios: username, title, content. */
export async function createPost({ username, title, content }) {
  const { data } = await api.post('/', {
    username,
    title,
    content,
  });
  return data;
}

/** Atualiza um post existente (PATCH). */
export async function updatePost(id, { title, content }) {
  const { data } = await api.patch(`/${id}/`, { title, content });
  return data;
}

/** Remove um post. */
export async function deletePost(id) {
  await api.delete(`/${id}/`);
}
