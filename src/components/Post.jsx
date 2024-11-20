import React from "react";
import './Post.css';

const Post = ({ title, content, upvotes, authorId, timestamp, subreddit }) => {
  return (
    <div className="post">
      <div className="post-header">
        <span className="subreddit">{subreddit}</span>
        <span className="post-author">Posted by: {authorId}</span>
      </div>
      <h3 className="post-title">{title}</h3>
      <p className="post-content">{content}</p>
      <div className="post-footer">
        <span className="post-timestamp">
          {new Date(timestamp.seconds * 1000).toLocaleString()}
        </span>
        <span className="post-upvotes">Upvotes: {upvotes}</span>
      </div>
    </div>
  );
};

export default Post;