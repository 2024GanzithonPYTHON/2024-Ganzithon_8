import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryCompare.css';
import BackButton from '../../components/BackButton/BackButton';
import HihiImage from '../../components/Images/hihi.png';

const DiaryCompare = () => {
  const [rating, setRating] = useState(1); // rating 상태 정의
  const [comment, setComment] = useState(''); // 텍스트 상태 정의
  const navigate = useNavigate();
 
  const handleRatingChange = (event) => {
    const value = event.target.value; // 현재 슬라이더 값 가져오기
    setRating(value); // 상태 업데이트

    // 슬라이더 배경 동적 업데이트
    const slider = event.target;
    slider.style.background = `linear-gradient(to right, #D2C5B2 ${(value - 1) * 25}%, #938A7E ${(value - 1) * 25}%)`;
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value); // 텍스트 상태 업데이트
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
          className={`rating-comment ${comment ? 'active' : ''}`} // 입력 상태에 따라 클래스 추가
          value={comment}
          onChange={handleCommentChange}
        />
      </div>

      <button className="submit-button" onClick={() => navigate('/ai-message')}>완료하기</button>
    </div>
  );
};

export default DiaryCompare;
