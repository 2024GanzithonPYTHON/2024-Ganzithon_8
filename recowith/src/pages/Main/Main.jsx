import styles from "./StyledMain.css";
import { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import Year from "react-calendar/dist/esm/DecadeView/Year.js";

function Main() {
  const [sliderValue, setSliderValue] = useState(1);

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
    const percentage =
      ((value - event.target.min) / (event.target.max - event.target.min)) *
      100;
    event.target.style.setProperty("--value", `${percentage}%`);
  };
  return (
    <div className="container">
      <img
        src={`${process.env.PUBLIC_URL}/img/main-bg.png`}
        alt="main background img"
        className="main-bg"
      />
      <div className="content">
        <div className="main-title">RECORD WITH</div>
        <div className="main-story">
          <div className="main-story-title">오늘의 둘러보기</div>
          <div className="main-stories">
            <div className="main-story-checkline">
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
        <div className="main-nav">
          <div className="main-nav-wp">
            <img
              src={`${process.env.PUBLIC_URL}/img/main-com.png`}
              alt="main"
              className="main-icon"
            />
            <img
              src={`${process.env.PUBLIC_URL}/img/main-write.png`}
              alt="write"
              className="main-icon"
            />
            <img
              src={`${process.env.PUBLIC_URL}/img/main-home.png`}
              alt="home"
              className="main-icon"
            />
            <img
              src={`${process.env.PUBLIC_URL}/img/main-chart.png`}
              alt="chart"
              className="main-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main;
