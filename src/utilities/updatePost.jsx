import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export const upvotePost = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      upvotes: increment(1), // Increment by 1
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};