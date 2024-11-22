import React, { useState, useEffect } from "react";
import { fetchComments, addComment, upvotePost } from "../utilities/firestorePosts";
import { getAuth } from "firebase/auth";
import "./Post.css";

const Post = ({ id, title, content, initialUpvotes, subreddit }) => {
  const [expanded, setExpanded] = useState(false); // State to toggle expanded view
  const [comments, setComments] = useState([]); // Comments list
  const [newComment, setNewComment] = useState(""); // New comment input
  const [upvotes, setUpvotes] = useState(initialUpvotes); // Local state for upvotes
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Toggle the expanded state and fetch comments if expanded
  const toggleExpanded = async () => {
    setExpanded(!expanded); // Toggle expanded state
    if (!expanded) {
      const fetchedComments = await fetchComments(id); // Fetch comments on expand
      setComments(fetchedComments);
    }
  };

  // Handle upvote functionality
  const handleUpvote = async () => {
    if (!currentUser) {
      alert("You need to be signed in to upvote.");
      return;
    }

    const result = await upvotePost(id, currentUser.uid);
    if (result.success) {
      setUpvotes((prevUpvotes) => prevUpvotes + 1); // Increment upvotes locally
    } else {
      alert(result.error);
    }
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!currentUser) {
      alert("You need to be signed in to comment.");
      return;
    }

    if (newComment.trim() === "") {
      alert("Comment cannot be empty.");
      return;
    }

    const result = await addComment(id, currentUser.displayName, newComment);
    if (result.success) {
      setComments([
        ...comments,
        { AuthorID: currentUser.displayName, Content: newComment, Timestamp: new Date() },
      ]);
      setNewComment("");
    } else {
      alert(result.error);
    }
  };

  return (
    <div className={`post ${expanded ? "expanded" : ""}`}>
      <p className="post-header">{subreddit}</p>
      <h3 className="post-title">{title}</h3>
      <p className="post-content">{content}</p>
      <div className="post-footer">
        <span>Upvotes: {upvotes}</span>
        <button onClick={handleUpvote} className="upvote-button">Upvote</button>
        <button onClick={toggleExpanded}>
          {expanded ? "Hide Comments" : "View Comments"}
        </button>
      </div>
      {expanded && (
        <div className="post-comments">
          <h4>Comments:</h4>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.AuthorID}:</strong> {comment.Content}
              </li>
            ))}
          </ul>
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button onClick={handleAddComment}>Post Comment</button>
        </div>
      )}
    </div>
  );
};

export default Post;