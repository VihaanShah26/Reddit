import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import './AddPost.css'; // Reuse styling similar to CreateSubreddit.css

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subreddit, setSubreddit] = useState("");
  const [subreddits, setSubreddits] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth
  const currentUser = auth.currentUser; // Get the current signed-in user

  // Fetch subreddits from Firestore
  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const subredditsSnapshot = await getDocs(collection(db, "subreddits"));
        const fetchedSubreddits = subredditsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSubreddits(fetchedSubreddits);
      } catch (err) {
        console.error("Error fetching subreddits:", err);
        setError("Failed to load subreddits. Please try again.");
      }
    };

    fetchSubreddits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!currentUser) {
        setError("You must be signed in to create a post.");
        return;
      }

      if (!subreddit) {
        setError("Please select a subreddit.");
        return;
      }

      // Add the new post to Firestore
      await addDoc(collection(db, "posts"), {
        Title: title,
        Content: content,
        Subreddit: subreddit,
        Upvotes: 0,
        usersWhoUpvoted: [],
        AuthorID: currentUser.uid, 
        Timestamp: Timestamp.now(),
        commentCount: 0,
      });

      // Redirect to the home page
      navigate('/');
    } catch (err) {
      console.error("Error adding post:", err);
      setError("Failed to add post. Please try again.");
    }
  };

  return (
    <div className="add-post-page">
      <h2>Add New Post</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="add-post-form">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <select
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
          required
        >
          <option value="" disabled>Select Subreddit</option>
          {subreddits.map((sub) => (
            <option key={sub.id} value={sub.Name}>
              {sub.Name}
            </option>
          ))}
        </select>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;