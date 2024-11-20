import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const addPost = async (title, content, userId) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      title,
      content,
      authorId: userId,
      timestamp: Timestamp.now(),
      upvotes: 0,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};