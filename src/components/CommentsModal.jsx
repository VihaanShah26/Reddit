import React, { useState, useEffect } from "react";
import { fetchComments, addComment } from "../utilities/firestorePosts";
import { getAuth } from "firebase/auth";
import "./CommentsModal.css"; // Style the modal

const CommentsModal = ({ postId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Fetch comments when the modal opens
  useEffect(() => {
    const loadComments = async () => {
      const fetchedComments = await fetchComments(postId);
      setComments(fetchedComments);
    };

    loadComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!currentUser) {
      alert("You need to be signed in to comment.");
      return;
    }

    if (newComment.trim() === "") {
      alert("Comment cannot be empty.");
      return;
    }

    const result = await addComment(postId, currentUser.displayName, newComment);
    if (result.success) {
      setComments([
        ...comments,
        { AuthorID: currentUser.uid, Content: newComment, Timestamp: new Date() },
      ]);
      setNewComment("");
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="comments-modal">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">X</button>
        <h2>Comments</h2>
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
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
    </div>
  );
};

export default CommentsModal;