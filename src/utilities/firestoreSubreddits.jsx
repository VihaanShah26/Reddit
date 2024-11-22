import { db } from "../firebase";
import { collection, addDoc, Timestamp, getDocs } from "firebase/firestore";

// Function to add a new subreddit
export const addSubreddit = async (name, description, createdBy) => {
  try {
    // Check for required fields
    if (!name || !description || !createdBy) {
      throw new Error("All fields are required.");
    }

    // Add the subreddit to Firestore
    const docRef = await addDoc(collection(db, "subreddits"), {
      Name: name,
      Description: description,
      CreatedBy: createdBy,
      CreatedAt: Timestamp.now(),
      Subscribers: 0, // Initialize with 0 subscribers
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error creating subreddit:", error);
    return { success: false, error: error.message };
  }
};

// Function to fetch all subreddits
export const fetchSubreddits = async () => {
  try {
    const subredditsSnapshot = await getDocs(collection(db, "subreddits"));
    return subredditsSnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((subreddit) => subreddit.Name.length > 2);
  } catch (error) {
    console.error("Error fetching subreddits:", error);
    return [];
  }
};