import React, { useEffect, useState } from "react";
import { fetchPosts } from "../utilities/fetchPosts";
import Post from "./Post";
import { getAuth } from "firebase/auth";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts(); // Fetch all posts
        setPosts(fetchedPosts); // Store posts in the state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getPosts();
  }, []);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  return (
    <div className="post-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id} // Ensure each post has a unique key
            id={post.id}
            title={post.Title}
            content={post.Content}
            initialUpvotes={post.Upvotes}
            userId={currentUser ? currentUser.displayName : ""} // Pass the AuthorID correctly as userId
            timestamp={post.Timestamp}
            subreddit={post.Subreddit} // Pass subreddit as is
            commentCount={post.commentCount || 0} // Default comment count to 0 if undefined
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default PostList;