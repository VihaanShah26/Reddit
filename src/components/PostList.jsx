import React, { useEffect, useState } from "react";
import { fetchPosts } from "../utilities/fetchPosts";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };
    getPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            title={post.Title}
            content={post.Content}
            upvotes={post.Upvotes}
            authorId={post.AuthorID}
            timestamp={post.Timestamp}
            subreddit={`r/${post.Subreddit}`}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default PostList;