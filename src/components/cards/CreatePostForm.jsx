export function CreatePostForm({
  title,
  content,
  canCreate,
  onTitleChange,
  onContentChange,
  onSubmit,
}) {
  return (
    <section className="create-section">
      <h2 className="create-title">What&apos;s on your mind?</h2>

      <form onSubmit={onSubmit} className="create-form">
        <label className="create-label">Title</label>
        <input
          type="text"
          placeholder="Hello world"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="create-input"
        />

        <label className="create-label">Content</label>
        <textarea
          placeholder="Content here"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="create-textarea"
          rows={4}
        />

        <button type="submit" className="create-btn" disabled={!canCreate}>
          Create
        </button>
      </form>
    </section>
  );
}