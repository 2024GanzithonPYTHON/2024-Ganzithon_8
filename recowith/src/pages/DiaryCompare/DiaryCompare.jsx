/* import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DiaryCompare.css";
import BackButton from "../../components/BackButton/BackButton";
import axios from "axios";
import HihiImage from "../../components/Images/hihi.png"; // 기본 이미지 가져오기

const DiaryCompare = () => {
  const [yesterdayDiary, setYesterdayDiary] = useState(null);
  const [todayDiary, setTodayDiary] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  // 날짜를 가져오는 함수
  const getDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split("T")[0];
  };

  // 특정 날짜의 일기를 불러오는 함수
  const fetchDiary = async (date, setDiary) => {
    try {
      const response = await axios.get(`/diary/date`, {
        params: { date }, // 서버에 날짜를 전달
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // 쿠키 전송 활성화
      });

      if (response.status === 200 && response.data.data) {
        const diary = response.data.data;
        setDiary(diary);
      } else {
        console.error(`No diary found for date ${date}`);
        setDiary(null);
      }
    } catch (error) {
      console.error(`Error fetching diary for date ${date}:`, error);
      setDiary(null); // 에러 발생 시에도 null 설정
    }
  };

  useEffect(() => {
    const yesterday = getDate(-1);
    const today = getDate(0);

    fetchDiary(yesterday, setYesterdayDiary); // 어제의 일기 불러오기
    fetchDiary(today, setTodayDiary); // 오늘의 일기 불러오기
  }, []);

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setRating(value);

    const slider = event.target;
    slider.style.background = `linear-gradient(to right, #D2C5B2 ${
      (value - 1) * 25
    }%, #938A7E ${(value - 1) * 25}%)`;
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
      score: parseInt(rating, 10),
      review: comment,
    };

    try {
      const diaryId = todayDiary.id;

      const response = await axios.post(
        `/score/${diaryId}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 쿠키 전송 활성화
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
              <img
                src={yesterdayDiary.diaryImage || HihiImage} // 기본 이미지 설정
                alt="Record"
                className="record-image"
              />
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
              <img
                src={todayDiary.diaryImage || HihiImage} // 기본 이미지 설정
                alt="Record"
                className="record-image"
              />
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

export default DiaryCompare;   */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DiaryCompare.css";
import BackButton from "../../components/BackButton/BackButton";
import axios from "axios";
import HihiImage from "../../components/Images/hihi.png"; // 기본 이미지 가져오기

const DiaryCompare = () => {
  const [yesterdayDiary, setYesterdayDiary] = useState(null);
  const [todayDiary, setTodayDiary] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  // 날짜를 가져오는 함수
  const getDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split("T")[0];
  };

  // 특정 날짜의 일기를 불러오는 함수
  const fetchDiary = async (date, setDiary) => {
    try {
      const response = await axios.get("/diary/date", {
        params: { date }, // 서버에 날짜를 전달
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // 쿠키 전송 활성화
      });

      if (response.status === 200 && response.data.data) {
        const diary = response.data.data;
        setDiary(diary);
      } else {
        console.error(`No diary found for date ${date}`);
        setDiary(null);
      }
    } catch (error) {
      console.error(`Error fetching diary for date ${date}:`, error);
      setDiary(null); // 에러 발생 시에도 null 설정
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const yesterday = getDate(-1);
      const today = getDate(0);
  
      await fetchDiary(yesterday, setYesterdayDiary); // 어제의 일기
      await fetchDiary(today, setTodayDiary); // 오늘의 일기
    };
  
    fetchData();
  }, []);

  const handleRatingChange = (event) => {
    const value = event.target.value;
    setRating(value);

    const slider = event.target;
    slider.style.background = `linear-gradient(to right, #D2C5B2 ${
      (value - 1) * 25
    }%, #938A7E ${(value - 1) * 25}%)`;
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (!todayDiary) {
      alert("오늘의 일기가 없습니다.");
      return;
    }
  
    if (!comment.trim()) {
      alert("코멘트를 입력해주세요.");
      return;
    }
  
    try {
      const diaryId = todayDiary.id;
  
      const postData = {
        score: parseInt(rating, 10),
        review: comment,
      };
  
      const response = await axios.post(`/score/${diaryId}`, postData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        navigate("/ai-message");
      } else {
        alert("점수 저장에 실패했습니다.");
      }
    } catch (error) {
      alert("저장 중 오류가 발생했습니다.");
      console.error(error);
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
              <img
                src={yesterdayDiary.diaryImage || HihiImage} // 기본 이미지 설정
                alt="Record"
                className="record-image"
              />
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
              <img
                src={todayDiary.diaryImage || HihiImage} // 기본 이미지 설정
                alt="Record"
                className="record-image"
              />
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