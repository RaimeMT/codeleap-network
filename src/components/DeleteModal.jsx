/**
 * PASSO 3 - Modal de confirmação de exclusão (Delete alert)
 *
 * O que faz:
 * - Quando o usuário clica em excluir em um post, mostramos este modal.
 * - Pergunta: "Are you sure you want to delete this item?"
 * - Botão Cancel (cinza) fecha o modal sem excluir.
 * - Botão Delete (vermelho) confirma e chama onConfirm (que chama a API e atualiza a lista).
 */

import './DeleteModal.css';

export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="delete-overlay">
      <div className="delete-modal">
        <h2 className="delete-title">Are you sure you want to delete this item?</h2>
        <div className="delete-actions">
          <button type="button" className="delete-btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="delete-btn confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
