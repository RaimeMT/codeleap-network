/**
 * PASSO 2 - Tela principal (Main screen)
 *
 * O que faz:
 * - Header "CodeLeap Network" (barra azul).
 * - Formulário "What's on your mind?" com Title, Content e botão CREATE.
 * - Botão CREATE desabilitado se Title ou Content estiverem vazios.
 * - Lista de posts buscada da API, ordenada do mais recente no topo.
 * - Ícones de editar e excluir só aparecem nos posts do usuário logado (comparação de string username).
 * - Ao criar um post, a lista atualiza sozinha (refetch).
 */

import { useState, useEffect } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../api/careers';
import { CreatePostForm } from "../components/cards/CreatePostForm";
import { CardList} from "../components/cards/CardList";
import DeleteModal from '../components/DeleteModal';
import EditModal from '../components/EditModal';
import './MainScreen.css';

function formatTimeAgo(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
}

export default function MainScreen({ username }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [deletePostId, setDeletePostId] = useState(null);
  const [editPost, setEditPost] = useState(null);

  const canCreate = title.trim() && content.trim();

  const loadPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts();
      const list = data.results || [];
      setPosts([...list].sort((a, b) => new Date(b.created_datetime) - new Date(a.created_datetime)));
    } catch (err) {
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!canCreate || !username) return;
    try {
      await createPost({ username, title: title.trim(), content: content.trim() });
      setTitle('');
      setContent('');
      await loadPosts();
    } catch (err) {
      setError(err.message || 'Failed to create post');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletePostId) return;
    try {
      await deletePost(deletePostId);
      setDeletePostId(null);
      await loadPosts();
    } catch (err) {
      setError(err.message || 'Failed to delete');
    }
  };

  const handleEditSave = async (newTitle, newContent) => {
    if (!editPost?.id) return;
    try {
      await updatePost(editPost.id, { title: newTitle, content: newContent });
      setEditPost(null);
      await loadPosts();
    } catch (err) {
      setError(err.message || 'Failed to update');
    }
  };

  const isOwnPost = (post) => String(post.username || '').trim() === String(username || '').trim();

  return (
    <div className="main-screen">
      <header className="main-header">
        <h1 className="main-header-title">CodeLeap Network</h1>
      </header>

      <div className="main-content">
       <CreatePostForm
          title={title}
          content={content}
          canCreate={canCreate}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSubmit={handleCreate}
        />

        {error && <div className="main-error">{error}</div>}
        {loading && <div className="main-loading">Loading posts...</div>}

        {!loading && posts.length === 0 && !error && (
          <p className="main-empty">No posts yet. Create the first one!</p>
        )}

        <CardList
          posts={posts}
          isOwnPost={isOwnPost}
          onEdit={setEditPost}
          onDelete={setDeletePostId}
          formatTimeAgo={formatTimeAgo}
        />
      </div>

      {deletePostId && (
        <DeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletePostId(null)}
        />
      )}

      {editPost && (
        <EditModal
          post={editPost}
          onSave={handleEditSave}
          onCancel={() => setEditPost(null)}
        />
      )}
    </div>
  );
}
