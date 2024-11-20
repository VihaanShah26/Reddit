import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const topics = ['Internet Culture', 'Games', 'Q&As', 'Technology', 'Pop Culture', 'Movies & TV'];

  return (
    <div className="sidebar">
      <h2>Topics</h2>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
      <hr />
      <p>Resources</p>
      <ul>
        <li>About Reddit</li>
        <li>Advertise</li>
        <li>Help</li>
      </ul>
    </div>
  );
};

export default Sidebar;