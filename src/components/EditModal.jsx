/**
 * PASSO 4 - Modal de edição (Edit item modal)
 *
 * O que faz:
 * - Abre quando o usuário clica em editar em um post que é dele.
 * - Mostra os campos Title e Content preenchidos com os dados atuais.
 * - Botão Cancel fecha sem salvar.
 * - Botão Save (verde) envia PATCH para a API e atualiza a lista.
 */

import { useState, useEffect } from 'react';
import './EditModal.css';

export default function EditModal({ post, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setTitle(post?.title ?? '');
    setContent(post?.content ?? '');
  }, [post]);

  const canSave = title.trim() && content.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSave) return;
    onSave(title.trim(), content.trim());
  };

  return (
    <div className="edit-overlay">
      <div className="edit-modal">
        <h2 className="edit-title">Edit item</h2>
        <form onSubmit={handleSubmit} className="edit-form">
          <label className="edit-label">Title</label>
          <input
            type="text"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-input"
          />
          <label className="edit-label">Content</label>
          <textarea
            placeholder="Content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="edit-textarea"
            rows={4}
          />
          <div className="edit-actions">
            <button type="button" className="edit-btn cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="edit-btn save" disabled={!canSave}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
