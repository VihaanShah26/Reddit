import React, { useState } from "react";
import { addSubreddit } from "../utilities/firestoreSubreddits";
import './CreateSubreddit.css';

const CreateSubreddit = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const createdBy = "user123"; // Replace with the actual user ID from authentication

    const result = await addSubreddit(name, description, createdBy);
    if (result.success) {
      setSuccess("Subreddit created successfully!");
      setName("");
      setDescription("");
    } else {
      setError(result.error || "Failed to create subreddit.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-subreddit-form">
      <h2>Create a Subreddit</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <input
        type="text"
        placeholder="Subreddit Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Subreddit Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit">Create Subreddit</button>
    </form>
  );
};

export default CreateSubreddit;