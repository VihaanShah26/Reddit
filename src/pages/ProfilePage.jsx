import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import "./ProfilePage.css";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [subscriptions, setSubscriptions] = useState([]); // Store subscribed subreddits
  const [upvotedPosts, setUpvotedPosts] = useState([]); // Store user's posts with >= 1 upvote
  const [loading, setLoading] = useState(true); // Loading state
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        // Fetch subscriptions
        if (currentUser) {
          const subscriptionsRef = collection(db, "users", currentUser.uid, "subscriptions");
          const subscriptionsSnapshot = await getDocs(subscriptionsRef);
          const fetchedSubscriptions = subscriptionsSnapshot.docs.map((doc) => doc.data().subredditName);

          setSubscriptions(fetchedSubscriptions);

          // Fetch user's posts with >= 1 upvote
          const postsRef = collection(db, "posts");
          const q = query(postsRef, where("AuthorID", "==", currentUser.uid), where("Upvotes", ">=", 1));
          const postsSnapshot = await getDocs(q);
          const fetchedPosts = postsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setUpvotedPosts(fetchedPosts);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser]);

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-page">
      <h1>{currentUser.displayName}'s Profile</h1>
      {loading ? (
        <p>Loading profile data...</p>
      ) : (
        <>
        <Navbar></Navbar>
          <section>
            <h2>Subscribed Subreddits</h2>
            {subscriptions.length > 0 ? (
              <ul className="subscriptions-list">
                {subscriptions.map((subreddit, index) => (
                  <li key={index} className="subscription-item">
                    {subreddit}
                  </li>
                ))}
              </ul>
            ) : (
              <p>You have not subscribed to any subreddits.</p>
            )}
          </section>
          <section>
            <h2>Your Posts with Upvotes</h2>
            {upvotedPosts.length > 0 ? (
              <div className="upvoted-posts">
                {upvotedPosts.map((post) => (
                  <div key={post.id} className="post-card">
                    <h3>{post.Title}</h3>
                    <p>{post.Content}</p>
                    <span>Upvotes: {post.Upvotes}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>You have no posts with upvotes.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default ProfilePage;