import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./StyledMain.css";
import Calendar from "react-calendar";
import Modal from "./../../components/Modal/StoryModal";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const [sliderValue, setSliderValue] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [score, setScore] = useState(1);
  const [watchedStories, setWatchedStories] = useState([]); // watched stories state
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    axios
      .get("/diary")
      .then((response) => {
        setStories(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching stories:", error);
      });

    const percentage = ((sliderValue - 1) / (5 - 1)) * 100;
    document
      .querySelector(".main-score-range")
      .style.setProperty("--value", `${percentage}%`);
  }, [sliderValue]);

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
    setScore(value);
    const percentage =
      ((value - event.target.min) / (event.target.max - event.target.min)) *
      100;
    event.target.style.setProperty("--value", `${percentage}%`);
  };

  const handleOpenModal = (storyId) => {
    const story = stories.find((story) => story.id === storyId);
    setSelectedStory(story);
    setIsModalOpen(true);

    // Add storyId to watchedStories array when opened
    setWatchedStories((prev) => [...prev, storyId]);
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
          <div
            className="main-stories"
            style={{ display: "flex", gap: "11px" }}
          >
            {stories.map((story) => (
              <div
                key={story.id}
                className="main-story-checkline"
                onClick={() => handleOpenModal(story.id)}
                style={{
                  background: watchedStories.includes(story.id)
                    ? "#D9D9D9"
                    : "null", // Change background color only for watched stories
                  borderColor: watchedStories.includes(story.id)
                    ? "#D9D9D9"
                    : "initial", // Change border color only for watched stories
                  borderWidth: watchedStories.includes(story.id)
                    ? "2px"
                    : "initial", // Optional: adjust border thickness
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/img/prof.png`}
                  alt="profile img"
                  className="main-story-profImg"
                />
                <div
                  className="main-story-innerCircle"
                  style={{
                    backgroundImage: watchedStories.includes(story.id)
                      ? "linear-gradient(#fff, #fff), #D9D9D9 100%"
                      : "null", // Change inner circle style for watched stories
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="main-score-wp">
          <div className="main-date">2024년 11월 2일 점수</div>
          <div className="main-score">
            <span className="main-yes-score">{score}/</span>5
          </div>
          <div className="rangescroller">
            <input
              className="main-score-range"
              type="range"
              min="1"
              max="5"
              value={sliderValue}
              onChange={handleSliderChange}
              style={{
                "--value": `${((sliderValue - 1) / (5 - 1)) * 100}%`,
              }}
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
              navigate("/diary-review");
            }}
          />
        </div>
      </div>
      {isModalOpen && selectedStory && (
        <Modal
          onClose={handleCloseModal}
          date={moment(selectedStory.createdAt).format("YYYY.MM.DD")}
          title={selectedStory.title}
          content={selectedStory.content}
          diaryImage={selectedStory.diaryImage}
        />
      )}
    </div>
  );
}

export default Main;
