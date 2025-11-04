export default function PostForm({ newPost, handleChange, handleSubmit }) {
  return (
    <div className="form-container">
      <h2>Post Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleChange}
        />
        <br />
        <label>Body:</label>
        <input
          type="text"
          name="body"
          value={newPost.body}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
