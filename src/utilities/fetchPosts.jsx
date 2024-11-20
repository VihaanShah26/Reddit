import { db } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

export const fetchPosts = async () => {
  try {
    const q = query(collection(db, "posts"), orderBy("Timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(posts); 
    return posts;
  } catch (e) {
    console.error("Error fetching posts: ", e);
    return [];
  }
};