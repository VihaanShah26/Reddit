import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion, increment, collection, addDoc, Timestamp, getDocs } from "firebase/firestore";

// Function to handle upvoting
export const upvotePost = async (postId, userId) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      throw new Error("Post does not exist.");
    }

    const postData = postSnap.data();

    // Initialize usersWhoUpvoted as an empty array if undefined
    const usersWhoUpvoted = postData.usersWhoUpvoted || [];

    // Check if the user has already upvoted
    if (usersWhoUpvoted.includes(userId)) {
      throw new Error("You have already upvoted this post.");
    }
    console.log(userId);
    // Update the upvotes and usersWhoUpvoted array
    await updateDoc(postRef, {
      Upvotes: increment(1),
      usersWhoUpvoted: arrayUnion(userId),
    });

    return { success: true };
  } catch (error) {
    console.error("Error upvoting post:", error);
    return { success: false, error: error.message };
  }
};

// Fetch comments for a specific post
export const fetchComments = async (postId) => {
  try {
    const commentsRef = collection(db, "posts", postId, "Comments");
    const snapshot = await getDocs(commentsRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

  // Add a comment to a specific post
  export const addComment = async (postId, authorId, content) => {
    try {
      const commentsRef = collection(db, "posts", postId, "Comments");
      await addDoc(commentsRef, {
        AuthorID: authorId,
        Content: content,
        Timestamp: Timestamp.now(),
      });
      return { success: true };
    } catch (error) {
      console.error("Error adding comment:", error);
      return { success: false, error: error.message };
    }
  };