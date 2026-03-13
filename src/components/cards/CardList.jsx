export function CardList({
  posts,
  isOwnPost,
  onEdit,
  onDelete,
  formatTimeAgo,
}) {
  return (
    <div className="posts-list">
      {posts.map((post) => (
        <article key={post.id} className="post-card">
          <div className="post-header">
            <h3 className="post-title">{post.title}</h3>

            {isOwnPost(post) && (
              <div className="post-actions">
                <button
                  type="button"
                  className="post-action-btn"
                  onClick={() => onEdit(post)}
                  title="Edit"
                  aria-label="Edit post"
                >
                  ✏️
                </button>

                <button
                  type="button"
                  className="post-action-btn"
                  onClick={() => onDelete(post.id)}
                  title="Delete"
                  aria-label="Delete post"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>

          <div className="post-meta">
            <span className="post-author">@{post.username}</span>
            <span className="post-time">
              {formatTimeAgo(post.created_datetime)}
            </span>
          </div>

          <p className="post-content">{post.content}</p>
        </article>
      ))}
    </div>
  );
}