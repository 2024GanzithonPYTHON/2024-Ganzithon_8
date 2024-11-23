import React, { useState, useEffect } from 'react';
import './DiaryReview.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import LineChart from "./LineChart";
import HihiImage from '../../components/Images/hihi.png';

const DiaryReview = () => {
  const [viewMode, setViewMode] = useState('monthly'); 
  const [selectedDate, setSelectedDate] = useState(''); 
  const [labels, setLabels] = useState([]); 
  const [data, setData] = useState([]); 
  const [startIndex, setStartIndex] = useState(0); 
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');

  useEffect(() => {
    initializeGraph();
  }, []);

  const initializeGraph = () => {
    const currentDate = new Date();
    if (viewMode === 'monthly') {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      setSelectedDate(`${year}년 ${month}월`);
      updateGraphData('monthly', new Date(year, month - 1, 1), 0);
    } else {
      const year = currentDate.getFullYear();
      setSelectedDate(`${year}년`);
      updateGraphData('yearly', new Date(year, 0, 1), 0);
    }
  };

  const updateGraphData = (mode, baseDate, index) => {
    const currentDate = new Date();

    if (mode === 'monthly') {
      const days = [];
      const ratings = [];
      const year = baseDate.getFullYear();
      const month = baseDate.getMonth();
      const targetDate = new Date(year, month, 1 + index * 6);
      const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < 6; i++) {
        const day = targetDate.getDate() + i;
        if (day > lastDayOfMonth || targetDate > currentDate) break; 
        days.push(`${month + 1}/${day}`);
        ratings.push(Math.floor(Math.random() * 5) + 1); 
      }
      setLabels(days);
      setData(ratings);
    } else if (mode === 'yearly') {
      const months = [];
      const ratings = [];
      const year = baseDate.getFullYear();
      const targetMonth = index * 6;

      for (let i = 0; i < 6; i++) {
        const month = targetMonth + i;
        if (month > 11 || new Date(year, month, 1) > currentDate) break;
        months.push(`${month + 1}`);
        ratings.push(Math.floor(Math.random() * 5) + 1); 
      }
      setLabels(months);
      setData(ratings);
    }
  };

  const handlePrevious = () => {
    if (viewMode === 'monthly') {
      if (startIndex > 0) {
        setStartIndex(startIndex - 1);
        const [year, month] = selectedDate.replace('년', '').replace('월', '').split(' ').map(Number);
        updateGraphData('monthly', new Date(year, month - 1, 1), startIndex - 1);
      }
    } else if (viewMode === 'yearly') {
      if (startIndex > 0) {
        setStartIndex(startIndex - 1);
        const [year] = selectedDate.replace('년', '').split(' ').map(Number);
        updateGraphData('yearly', new Date(year, 0, 1), startIndex - 1);
      }
    }
  };

  const handleNext = () => {
    const currentDate = new Date();
    if (viewMode === 'monthly') {
      const [year, month] = selectedDate.replace('년', '').replace('월', '').split(' ').map(Number);
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      if (startIndex * 6 + 6 < lastDayOfMonth) {
        setStartIndex(startIndex + 1);
        updateGraphData('monthly', new Date(year, month - 1, 1), startIndex + 1);
      }
    } else if (viewMode === 'yearly') {
      const [year] = selectedDate.replace('년', '').split(' ').map(Number);
      if (startIndex < 1) {
        setStartIndex(startIndex + 1);
        updateGraphData('yearly', new Date(year, 0, 1), startIndex + 1);
      }
    }
  };

  const handleViewChange = (mode) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
  
    if (mode === 'monthly') {
      setSelectedDate(`${year}년 ${month}월`);
      setStartIndex(0);
      updateGraphData('monthly', new Date(year, month - 1, 1), 0);
    } else if (mode === 'yearly') {
      setSelectedDate(`${year}년`);
      setStartIndex(0);
      updateGraphData('yearly', new Date(year, 0, 1), 0);
    }
  
    setViewMode(mode);
  };
  

  const selectDate = (date) => {
    const [year, month] = date.replace('년', '').replace('월', '').split(' ').map(Number);
  
    if (viewMode === 'monthly') {
      setSelectedDate(`${year}년 ${month}월`);
      setStartIndex(0);
      updateGraphData('monthly', new Date(year, month - 1, 1), 0);
    } else if (viewMode === 'yearly') {
      setSelectedDate(`${year}년`);
      setStartIndex(0);
      updateGraphData('yearly', new Date(year, 0, 1), 0);
    }
  
    setIsPopupOpen(false);
  };
  

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="diary-review-container">
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
        
        <div className="graph-card">
        <button className="svg-button" onClick={handlePrevious}>
        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 1L2 7L8 13" stroke="#938A7E" stroke-width="2" stroke-linecap="round"/>
</svg>

        </button>
          <LineChart labels={labels} data={data} />
          <button className="svg-button" onClick={handleNext}>
          <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 13L7 7L0.999999 1" stroke="#938A7E" stroke-width="2" stroke-linecap="round"/>
</svg>

        </button>
        </div>
        

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
            어제는 기분이 참 이상한 날이었다. 작지만 소중한 위로를 받으면서 큰 힘을 얻었던 기억이 난다.
            오늘의 나도 더 좋은 기분으로 하루를 시작할 수 있기를...
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
            onChange={(e) => setRating(e.target.value)}
            className="rating-slider"
          />
          <textarea
            placeholder="점수에 담긴 오늘의 이야기를 들려주세요."
            className={`rating-comment ${comment ? 'active' : ''}`}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
      </div>
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

