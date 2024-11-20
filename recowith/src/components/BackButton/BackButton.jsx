import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back-button" onClick={() => navigate(-1)}>
      <svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 1L2 9.5L10 18" stroke="#938A7E" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default BackButton;

