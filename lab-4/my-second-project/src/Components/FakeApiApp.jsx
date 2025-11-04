import { useState, useEffect } from "react";
import PostForm from "./PostForm";
import PostsContainer from "./PostsContainer";

export default function FakeApiApp() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch(URL);
    const posts = await response.json();
    setData(posts.reverse());
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

 //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.title.trim() === "" || newPost.body.trim() === "") return;

    const newPostObj = {
      id: Date.now(),
      title: newPost.title,
      body: newPost.body,
    };

    setData([newPostObj, ...data]);
    setNewPost({ title: "", body: "" });
  };
//

  return (
    <div className="app">
      {isLoading && <h1>Loading...</h1>}
      <h1>Fake API App</h1>
      <PostForm
        newPost={newPost}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <PostsContainer posts={data} />
    </div>
  );
}
