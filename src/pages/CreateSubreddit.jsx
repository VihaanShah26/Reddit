import React, { useState } from 'react';
import { addSubreddit } from '../utilities/firestoreSubreddits';
import './CreateSubreddit.css';
import Navbar from '../components/Navbar';

const CreateSubreddit = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addSubreddit(name, description, 'user123'); 
    if (result.success) {
      setName('');
      setDescription('');
      window.location.href = '/';
    } else {
      window.alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className="create-subreddit-page">
        <Navbar />
      <h2>Create a New Subreddit</h2>
      <form onSubmit={handleSubmit} className="create-subreddit-form">
        <input
          type="text"
          placeholder="Subreddit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateSubreddit;