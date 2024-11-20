/* import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryCompare.css';
import BackButton from '../../components/BackButton/BackButton';
import HihiImage from '../../components/Images/hihi.png';

const DiaryCompare = () => {
  const [rating, setRating] = useState(1); 
  const [comment, setComment] = useState(''); 
  const navigate = useNavigate();
 
  const handleRatingChange = (event) => {
    const value = event.target.value; 
    setRating(value); 

    
    const slider = event.target;
    slider.style.background = `linear-gradient(to right, #D2C5B2 ${(value - 1) * 25}%, #938A7E ${(value - 1) * 25}%)`;
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value); 
  };

  return (
    <div className="diary-compare-container">
      <BackButton />
      <h2 className="diary-compare-title">어제와 오늘</h2>
      <p className="diary-compare-subtitle">어제의 나와 오늘의 나를 비교해 보세요.</p>
      
      <div className="diary-card">
  <div className="diary-header">
    <div className="record-image-wrapper">
      <img src={HihiImage} alt="Record" className="record-image" />
    </div>
    <div className="diary-title-section">
      <h3 className="diary-date">2024.11.05</h3>
      <h4 className="diary-title">작은 위로, 큰 힘</h4>
    </div>
  </div>
  <p className="diary-content">
    어제는 기분이 참 이상한 날이었다. 작지만 소중한 위로를 받으면서
    큰 힘을 얻었던 기억이 난다. 오늘의 나도 더 좋은 기분으로 하루를 시작할 수 있기를...
  </p>
</div>


<div className="diary-card">
  <div className="diary-header">
    <div className="record-image-wrapper">
      <img src={HihiImage} alt="Record" className="record-image" />
    </div>
    <div className="diary-title-section">
      <h3 className="diary-date">2024.11.05</h3>
      <h4 className="diary-title">작은 위로, 큰 힘</h4>
    </div>
  </div>
  <p className="diary-content">
    어제는 기분이 참 이상한 날이었다. 작지만 소중한 위로를 받으면서
    큰 힘을 얻었던 기억이 난다. 오늘의 나도 더 좋은 기분으로 하루를 시작할 수 있기를...
  </p>
</div>

      <div className="rating-section">
        <label htmlFor="rating">오늘의 점수를 매겨보세요.</label>
        <div className="rating-value">
          <span className="rating-number">{rating}</span>
          <span className="rating-slash">/</span>
          <span className="rating-total">5</span>
        </div>
        <input
          type="range"
          id="rating"
          min="1"
          max="5"
          step="1"
          value={rating}
          onChange={handleRatingChange}
          className="rating-slider"
        />
        <div className="rating-labels">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        <textarea
          placeholder="점수에 담긴 오늘의 이야기를 들려주세요."
          className={`rating-comment ${comment ? 'active' : ''}`} 
          value={comment}
          onChange={handleCommentChange}
        />
      </div>

      <button className="submit-button" onClick={() => navigate('/ai-message')}>완료하기</button>
    </div>
  );
};

export default DiaryCompare;
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryCompare.css';
import BackButton from '../../components/BackButton/BackButton';
import HihiImage from '../../components/Images/hihi.png';

const DiaryCompare = () => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const diaryId = 1; // diaryId를 적절히 설정하거나 동적으로 변경하세요.

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setRating(value);

    const slider = event.target;
    slider.style.background = `linear-gradient(to right, #D2C5B2 ${(value - 1) * 25}%, #938A7E ${(value - 1) * 25}%)`;
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/score/${diaryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });
  
      if (response.ok) {
        console.log('Score saved successfully');
      } else {
        console.error('Failed to save score');
      }
    } catch (error) {
      console.error('Error while saving score:', error);
    } finally {
      navigate('/ai-message'); // 백엔드 연동 시 이부분은 지워도 될거같음 
    }
  };
  

  return (
    <div className="diary-compare-container">
      <BackButton />
      <h2 className="diary-compare-title">어제와 오늘</h2>
      <p className="diary-compare-subtitle">어제의 나와 오늘의 나를 비교해 보세요.</p>
      
      <div className="diary-card">
        <div className="diary-header">
          <div className="record-image-wrapper">
            <img src={HihiImage} alt="Record" className="record-image" />
          </div>
          <div className="diary-title-section">
            <h3 className="diary-date">2024.11.05</h3>
            <h4 className="diary-title">작은 위로, 큰 힘</h4>
          </div>
        </div>
        <p className="diary-content">
          어제는 기분이 참 이상한 날이었다. 작지만 소중한 위로를 받으면서 큰 힘을 얻었던 기억이 난다. 오늘의 나도 더 좋은 기분으로 하루를 시작할 수 있기를...
        </p>
      </div>

      <div className="diary-card">
        <div className="diary-header">
          <div className="record-image-wrapper">
            <img src={HihiImage} alt="Record" className="record-image" />
          </div>
          <div className="diary-title-section">
            <h3 className="diary-date">2024.11.05</h3>
            <h4 className="diary-title">작은 위로, 큰 힘</h4>
          </div>
        </div>
        <p className="diary-content">
          어제는 기분이 참 이상한 날이었다. 작지만 소중한 위로를 받으면서 큰 힘을 얻었던 기억이 난다. 오늘의 나도 더 좋은 기분으로 하루를 시작할 수 있기를...
        </p>
      </div>

      <div className="rating-section">
        <label htmlFor="rating">오늘의 점수를 매겨보세요.</label>
        <div className="rating-value">
          <span className="rating-number">{rating}</span>
          <span className="rating-slash">/</span>
          <span className="rating-total">5</span>
        </div>
        <input
          type="range"
          id="rating"
          min="1"
          max="5"
          step="1"
          value={rating}
          onChange={handleRatingChange}
          className="rating-slider"
        />
        <div className="rating-labels">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        <textarea
          placeholder="점수에 담긴 오늘의 이야기를 들려주세요."
          className={`rating-comment ${comment ? 'active' : ''}`} 
          value={comment}
          onChange={handleCommentChange}
        />
      </div>

      <button className="submit-button" onClick={handleSubmit}>완료하기</button>
    </div>
  );
};

export default DiaryCompare;
