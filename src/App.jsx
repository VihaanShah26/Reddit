import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateSubreddit from "./pages/CreateSubreddit";
import AddPost from "./components/AddPost";
import SubredditPage from "./pages/SubredditPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-subreddit" element={<CreateSubreddit />} />
        <Route path="/add-post" element={<AddPost />} /> 
        <Route path="/subreddits/:subredditName" element={<SubredditPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;