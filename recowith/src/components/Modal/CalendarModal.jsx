// Modal.js
import React from "react";
import "./StyledCModal.css";
function Modal({
  onClose,
  date,
  title,
  content,
  score,
  sliderValue,
  onSliderChange,
}) {
  return (
    <div className="c-modal-overlay">
      <div className="c-modal-prof-wp">
        <div className="c-modal-close" onClick={onClose}>
          <img src={`${process.env.PUBLIC_URL}/img/closeBtn.png`} alt="Close" />
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
          <div className="c-modal-profDate">{date}</div>
          <div className="c-modal-profTitle">{title}</div>
        </div>
        <div className="c-modal-content">{content}</div>
        <div className="c-modal-score-wp">
          <span className="c-modal-score">{score}</span>
          <div className="c-modal-rangescroller">
            <input
              className="c-modal-score-range"
              type="range"
              min="1"
              max="5"
              value={sliderValue}
              onChange={onSliderChange}
            />
          </div>
        </div>
        <div className="c-modal-evaluate">
          오늘은 아침부터 자습 시간 덕분에 친구들과 웃을 일도 많았고, 가고
          싶었던 카페에 가서 맛있는 음료도 마셨고, 시험 점수까지 잘 나와서
          기분이 최고 였어서 어제의 고생이 보상받는 느낌이라 오늘은 망설임 없이
          5점을 주고 싶다!
        </div>
      </div>
    </div>
  );
}

export default Modal;
