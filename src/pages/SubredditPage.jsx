import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import Post from "../components/Post";
import "./SubredditPage.css";
import Navbar from "../components/Navbar";

const SubredditPage = () => {
  const { subredditName } = useParams(); // Get subreddit name from the URL
  const [posts, setPosts] = useState([]); // Store posts in this subreddit
  const [loading, setLoading] = useState(true); // Loading state
  const auth = getAuth();
  const currentUser = auth.currentUser; // Get the signed-in user
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const postsRef = collection(db, "posts");
        const snapshot = await getDocs(postsRef);
        const filteredPosts = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((post) => post.Subreddit === subredditName);
        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [subredditName]);

  const handleSubscribe = async () => {
    if (!currentUser) {
      alert("You need to be signed in to subscribe.");
      return;
    }

    try {
      const subscriptionsRef = doc(db, "users", currentUser.uid, "subscriptions", subredditName);
      await setDoc(subscriptionsRef, {
        subredditName,
      });
      alert(`Subscribed to ${subredditName}`);
    } catch (error) {
      console.error("Error subscribing to subreddit:", error);
      alert("Failed to subscribe. Please try again.");
    }
  };

  const handleAddPost = () => {
    navigate("/add-post");
  };

  return (
    <div className="subreddit-page">
        <Navbar />
      <h1>{subredditName}</h1>
      <button onClick={handleSubscribe} className="subscribe-button">
        Subscribe
      </button>
      <button onClick={handleAddPost} className="add-post-button">
        Add Post
      </button>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length > 0 ? (
        <div className="posts">
          {posts.map((post) => (
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
          ))}
        </div>
      ) : (
        <p>No posts in this subreddit.</p>
      )}
    </div>
  );
};

export default SubredditPage;