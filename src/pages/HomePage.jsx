import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PostList from '../components/PostList';
import AddPost from '../components/AddPost';
import { fetchSubreddits } from '../utilities/firestoreSubreddits';
import './HomePage.css';
import { getAuth } from 'firebase/auth';

const HomePage = () => {
  const [subreddits, setSubreddits] = useState([]); // Currently displayed subreddits
  const [allSubreddits, setAllSubreddits] = useState([]); // Complete list of subreddits
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [isSearching, setIsSearching] = useState(false); // Track if user is searching
  const navigate = useNavigate();

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleAddPost = () => {
    if (!currentUser) {
      alert('You must be signed in to add a post.');
      return;
    }
    navigate('/add-post');
  };

  useEffect(() => {
    const getSubreddits = async () => {
      const fetchedSubreddits = await fetchSubreddits();
      setSubreddits(fetchedSubreddits.slice(0, 8)); // Show 8 most recent subreddits by default
      setAllSubreddits(fetchedSubreddits); // Save the complete list for searching
    };
    getSubreddits();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true); // Indicate that a search is in progress
  
    if (searchTerm.trim()) {
      // Filter subreddits by search term with null checks
      const searchResults = allSubreddits.filter((subreddit) =>
        subreddit.Name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSubreddits(searchResults);
    } else {
      // Reset to 8 most recent subreddits if the search term is empty
      setSubreddits(allSubreddits.slice(0, 8));
      setIsSearching(false); // Reset search state
    }
  };

  const handleClearSearch = () => {
    setSearchTerm(''); // Clear the search term
    setSubreddits(allSubreddits.slice(0, 8)); // Reset to 8 most recent subreddits
    setIsSearching(false); // Reset search state
  };

  const handleCreateSubreddit = () => {
    if (!currentUser) {
      alert('You must be signed in to create a subreddit.');
      return;
    }
    navigate('/create-subreddit');
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="main-content">
        <div className="sidebar">
          <div className="sidebar-header">
            <form onSubmit={handleSearch} className="sidebar-search-form">
              <input
                type="text"
                placeholder="Search Subreddits"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sidebar-search-input"
              />
              <button type="submit" className="sidebar-search-button">Search</button>
              {isSearching && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="sidebar-clear-button"
                >
                  Clear
                </button>
              )}
            </form>
            <button
              onClick={handleCreateSubreddit}
              className="create-subreddit-button"
            >
              Create Subreddit
            </button>
          </div>
          <ul className="subreddit-list">
            {subreddits.length > 0 ? (
              subreddits.map((subreddit) => (
                <li key={subreddit.id} className="subreddit-item">
                  <p className="subreddit-name"><a href={`/subreddits/${subreddit.Name}`}>r/{subreddit.Name}</a></p>
                  <p className="subreddit-description">{subreddit.Description}</p>
                </li>
              ))
            ) : (
              <p className="no-results">No subreddits found</p>
            )}
          </ul>
        </div>
        <PostList />
        <button onClick={handleAddPost} className="add-post-button">
          Add Post
        </button>
      </div>
    </div>
  );
};

export default HomePage;