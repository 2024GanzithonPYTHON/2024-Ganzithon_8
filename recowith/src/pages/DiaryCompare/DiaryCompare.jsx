/* import React, { useState } from 'react';
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
            <h3 className="diary-date">2024.11.19</h3>
            <h4 className="diary-title">행복한 하루</h4>
          </div>
        </div>
        <p className="diary-content">
          친구들이랑 오늘은 수업끝나고 다같이 삼겹살을 먹으러 갔다. 너무 배부르게 먹어서 집오는 길이 행복했다. 
        </p>
      </div>

      <div className="diary-card">
        <div className="diary-header">
          <div className="record-image-wrapper">
            <img src={HihiImage} alt="Record" className="record-image" />
          </div>
          <div className="diary-title-section">
            <h3 className="diary-date">2024.11.20</h3>
            <h4 className="diary-title">바쁜 하루</h4>
          </div>
        </div>
        <p className="diary-content">
          하루종일 졸업작품만들고 논문 정리하고 했는데 교수님은 또 새로운 과제를 내주신다. 내가 그 교수님 수업만 듣는줄 아시나보다 .. 
        </p>
      </div>

      <div className="rating-section">
      <p className="rating-title">오늘의 점수를 매겨보세요.</p>
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
==============================================================================================
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DiaryCompare.css";
import BackButton from "../../components/BackButton/BackButton";
import axios from "axios";

const DiaryCompare = () => {
  const [yesterdayDiary, setYesterdayDiary] = useState(null);
  const [todayDiary, setTodayDiary] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const userId = 1; // 유저 ID는 실제로 동적으로 설정

  const getDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split("T")[0];
  };

  const fetchDiary = async (date, setDiary) => {
    try {
      const response = await axios.get( `${process.env.REACT_APP_API_URL}/diary/${userId}/${date}`, 
        {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setDiary(response.data.data.diaries[0]);
      } else {
        console.error(`Failed to fetch diary for date ${date}`);
      }
    } catch (error) {
      console.error(`Error fetching diary for date ${date}:`, error);
    }
  };

  useEffect(() => {
    const yesterday = getDate(-1);
    const today = getDate(0);

    fetchDiary(yesterday, setYesterdayDiary);
    fetchDiary(today, setTodayDiary);
  }, []);

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
    if (!todayDiary) {
      console.error("No diary found for today.");
      return;
    }

    const postData = {
      score: parseInt(rating), 
      review: comment,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/score/${todayDiary.id}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Score and review saved successfully:", response.data);
        navigate("/ai-message");
      } else {
        console.error("Failed to save score and review.");
      }
    } catch (error) {
      console.error("Error while saving score and review:", error);
    }
  };

  return (
    <div className="diary-compare-container">
      <BackButton />
      <h2 className="diary-compare-title">어제와 오늘</h2>
      <p className="diary-compare-subtitle">어제의 나와 오늘의 나를 비교해 보세요.</p>

      {yesterdayDiary ? (
        <div className="diary-card">
          <div className="diary-header">
            <div className="record-image-wrapper">
              <img src={yesterdayDiary.diaryImage} alt="Record" className="record-image" />
            </div>
            <div className="diary-title-section">
              <h3 className="diary-date">{yesterdayDiary.createdAt}</h3>
              <h4 className="diary-title">{yesterdayDiary.title}</h4>
            </div>
          </div>
          <p className="diary-content">{yesterdayDiary.content}</p>
        </div>
      ) : (
        <p>어제의 일기를 불러오는 중...</p>
      )}

      {todayDiary ? (
        <div className="diary-card">
          <div className="diary-header">
            <div className="record-image-wrapper">
              <img src={todayDiary.diaryImage} alt="Record" className="record-image" />
            </div>
            <div className="diary-title-section">
              <h3 className="diary-date">{todayDiary.createdAt}</h3>
              <h4 className="diary-title">{todayDiary.title}</h4>
            </div>
          </div>
          <p className="diary-content">{todayDiary.content}</p>
        </div>
      ) : (
        <p>오늘의 일기를 불러오는 중...</p>
      )}

      <div className="rating-section">
        <p className="rating-title">오늘의 점수를 매겨보세요.</p>
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
          className={`rating-comment ${comment ? "active" : ""}`}
          value={comment}
          onChange={handleCommentChange}
        />
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        저장하기
      </button>
    </div>
  );
};

export default DiaryCompare;


