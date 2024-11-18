import React, { useState, useEffect } from 'react';
import './DiaryReview.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import HihiImage from '../../components/Images/hihi.png';

const DiaryReview = () => {
  const [viewMode, setViewMode] = useState('monthly'); // 'monthly' 또는 'yearly'
  const [selectedDate, setSelectedDate] = useState(''); // 선택된 월/연도
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');

  // 현재 날짜를 가져와 초기 값 설정
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript의 월은 0부터 시작
    setSelectedDate(`${currentYear}년 ${currentMonth}월`); // 기본값 설정
  }, []);

  const handleViewChange = (mode) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (mode === 'monthly') {
      setSelectedDate(`${currentYear}년 ${currentMonth}월`);
    } else if (mode === 'yearly') {
      setSelectedDate(`${currentYear}년`);
    }

    setViewMode(mode);
  };

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // 팝업 열고 닫기
  };

  const selectDate = (date) => {
    setSelectedDate(date);
    setIsPopupOpen(false); // 선택 후 팝업 닫기
  };

  return (
    <div className="diary-review-container">
      {/* 상단 영역 */}
      <h1 className="diary-review-title">돌아보기</h1>
      <div className="diary-review-view-mode">
        <button
          className={`diary-review-view-button ${viewMode === 'monthly' ? 'active' : ''}`}
          onClick={() => handleViewChange('monthly')}
        >
          월간
        </button>
        <button
          className={`diary-review-view-button ${viewMode === 'yearly' ? 'active' : ''}`}
          onClick={() => handleViewChange('yearly')}
        >
          연간
        </button>
      </div>

      {/* 그래프 제목 및 선택 버튼 */}
      <div className="graph-title-container">
        <h2 className="graph-title">{selectedDate}</h2>
        <button className="svg-button" onClick={togglePopup}>
          <svg
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L13 1"
              stroke="#6E6E6E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="diary-review-content">
        {/* 그래프 카드 */}
        <div className="graph-card">
          <img src={HihiImage} alt="Graph" className="graph-image" />
        </div>

        {/* 최고의 날 하이라이트 */}
        <h2 className="best-day-title">최고의 날 하이라이트</h2>
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
          <textarea
            placeholder="점수에 담긴 오늘의 이야기를 들려주세요."
            className={`rating-comment ${comment ? 'active' : ''}`}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
      </div>

      {/* 팝업 창 */}
      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <h2>{viewMode === 'monthly' ? '월 선택하기' : '연도 선택하기'}</h2>
            <button className="popup-close-button" onClick={togglePopup}>
              ✕
            </button>
            <ul className="popup-list">
              {viewMode === 'monthly'
                ? Array.from({ length: 12 }, (_, i) => `${i + 1}월`).map((month) => (
                    <li
                      key={month}
                      className="popup-item"
                      onClick={() => selectDate(`2024년 ${month}`)}
                    >
                      2024년 {month}
                    </li>
                  ))
                : ['2020년', '2021년', '2022년', '2023년', '2024년'].map((year) => (
                    <li
                      key={year}
                      className="popup-item"
                      onClick={() => selectDate(year)}
                    >
                      {year}
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      )}

      <NavigationBar />
    </div>
  );
};

export default DiaryReview;
