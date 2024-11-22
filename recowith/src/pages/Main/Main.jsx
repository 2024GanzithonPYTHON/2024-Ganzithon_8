import React, { useState } from "react";
import axios from "axios";
import styles from "./StyledMain.css";
import Calendar from "react-calendar";
import Modal from "./../../components/Modal/CalendarModal";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [score, setScore] = useState(1);

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
    const percentage =
      ((value - event.target.min) / (event.target.max - event.target.min)) *
      100;
    event.target.style.setProperty("--value", `${percentage}%`);
  };

  const handleOpenModal = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setScore(Math.floor(Math.random() * 5) + 1);
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("로그아웃하시겠습니까?");
    if (confirmLogout) {
      try {
        await axios.post("/api/logout");
        localStorage.removeItem("userToken");
        sessionStorage.removeItem("userToken");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        alert("로그아웃 실패");
      }
    }
  };

  return (
    <div className="container">
      <img
        src={`${process.env.PUBLIC_URL}/img/main-bg.png`}
        alt="main background img"
        className="main-bg"
      />
      <div className="content">
        <div className="fx">
          <div className="main-title">RECORD WITH</div>
          <button className="main-logout" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
        <div className="main-story">
          <div className="main-story-title">오늘의 둘러보기</div>
          <div className="main-stories">
            <div className="main-story-checkline" onClick={handleOpenModal}>
              <img
                src={`${process.env.PUBLIC_URL}/img/prof.png`}
                alt="profile img"
                className="main-story-profImg"
              />
              <div className="main-story-innerCircle"></div>
            </div>
          </div>
        </div>
        <div className="main-score-wp">
          <div className="main-date">2024년 11월 2일 점수</div>
          <div className="main-score">
            <span className="main-yes-score">4/</span>5
          </div>
          <div className="rangescroller">
            <input
              className="main-score-range"
              type="range"
              min="1"
              max="5"
              value={sliderValue}
              onChange={handleSliderChange}
            />
          </div>
        </div>
        <div>
          <Calendar
            locale="en"
            next2Label={null}
            prev2Label={null}
            formatDay={(locale, date) => moment(date).format("D")}
            formatYear={(locale, date) => moment(date).format("YYYY")}
            formatMonthYear={(locale, date) => moment(date).format("YYYY MM월")}
            calendarType="gregory"
            minDetail="year"
          />
        </div>
      </div>
      <div className="main-nav">
        <div className="main-nav-wp">
          <img
            src={`${process.env.PUBLIC_URL}/img/main-com.png`}
            alt="main"
            className="main-icon"
            onClick={() => {
              navigate("/community");
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/img/main-write.png`}
            alt="write"
            className="main-icon"
            onClick={() => {
              navigate("/write");
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/img/main-home.png`}
            alt="home"
            className="main-icon"
            onClick={() => {
              navigate("/");
            }}
          />
          <img
            src={`${process.env.PUBLIC_URL}/img/main-chart.png`}
            alt="chart"
            className="main-icon"
            onClick={() => {
              navigate("/record-see");
            }}
          />
        </div>
      </div>
      {isModalOpen && selectedDate && (
        <Modal
          onClose={handleCloseModal}
          date={moment(selectedDate).format("YYYY.MM.DD")}
          title="숙제 지옥 속 작은 행복"
          content="오늘 진짜 힘들었다. 학교에서 숙제가 왜 이렇게 많은지 모르겠어. 특히 수학 숙제... 이해 안 되는 문제들이 너무 많아서 거의 두 시간 넘게 붙잡고 있었는데, 아직도 다 못 풀었어..."
          score={score}
          sliderValue={sliderValue}
          onSliderChange={handleSliderChange}
        />
      )}
    </div>
  );
}

export default Main;
