import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link to="/ai-message">AI Message</Link></li>
          <li><Link to="/community">Community</Link></li>
          <li><Link to="/diary-compare">Diary Compare</Link></li>
          <li><Link to="/diary-review">Diary Review</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
