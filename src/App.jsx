import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import AiMessage from './pages/AiMessage/AiMessage';
import Community from './pages/Community/Community';
import DiaryCompare from './pages/DiaryCompare/DiaryCompare';
import DiaryReview from './pages/DiaryReview/DiaryReview';
import RecordSee from './pages/Community/RecordSee';


function App() {
  return (
    <Router>
      <div style={{
        width: '390px',
        height: '844px',
        margin: '0 auto',
        border: '1px solid #ccc', 
        overflow: 'hidden'
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ai-message" element={<AiMessage />} />
          <Route path="/community" element={<Community />} />
          <Route path="/record-see" element={<RecordSee />} />
          <Route path="/diary-compare" element={<DiaryCompare />} />
          <Route path="/diary-review" element={<DiaryReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
