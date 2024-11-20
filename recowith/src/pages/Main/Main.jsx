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
        <div className="fx">
          <div className="main-title">RECORD WITH</div>
          <button className="main-logout">LOGOUT</button>
        </div>
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
      <div className="main-calendar-modal">
        <div className="c-modal-prof-wp">
          <div className="c-modal-close">
            <img src={`${process.env.PUBLIC_URL}/img/closeBtn.png`} alt="" />
          </div>
          <div className="c-modal-profImg-wp">
            <img
              src={`${process.env.PUBLIC_URL}/img/prof.png`}
              alt="profile img"
              className="c-modal-profImg"
            />
            <div className="c-modal-innerCircle"></div>
          </div>
          <div className="c-modal-date-wp">
            <div className="c-modal-profDate">2024.11.07</div>
            <div className="c-modal-profTitle">숙제 지옥 속 작은 행복</div>
          </div>
          <div className="c-modal-content">
            오늘 진짜 힘들었다. 학교에서 숙제가 왜 이렇게 많은지 모르겠어. 특히
            수학 숙제... 이해 안 되는 문제들이 너무 많아서 거의 두 시간 넘게
            붙잡고 있었는데, 아직도 다 못 풀었어. 그냥 포기하고 싶은데, 이러면
            또 다음에 더 힘들어지겠지? 그래도 오늘 좋은 일도 있었어! 친구들이랑
            점심시간에 빵집 갔는데, 거기서 새로 나온 초코 크림빵이 진짜
            맛있더라. 조금이라도 기분이 나아진 것 같아. 나중에 다시 가서 더
            먹어야지! 오늘은 여기까지. 내일은 제발 더 나은 하루였으면 좋겠다. 
          </div>{" "}
          <div className="c-modal-score-wp">
            <span className="c-modal-score">4/</span>5
            <div className="c-modal-rangescroller">
              <input
                className="c-modal-score-range"
                type="range"
                min="1"
                max="5"
                value={sliderValue}
                onChange={handleSliderChange}
              />
            </div>{" "}
          </div>{" "}
          <div className="c-modal-evaluate">
            오늘은 아침부터 자습 시간 덕분에 친구들과 웃을 일도 많았고, 가고
            싶었던 카페에 가서 맛있는 음료도 마셨고, 시험 점수까지 잘 나와서
            기분이 최고 였어서 어제의 고생이 보상받는 느낌이라 오늘은 망설임
            없이 5점을 주고 싶다!
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main;
