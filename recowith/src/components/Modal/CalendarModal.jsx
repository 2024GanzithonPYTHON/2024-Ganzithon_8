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
  console.log(score);
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
          <span className="c-modal-score" style={{ fontSize: "20px" }}>
            {score === null ? "아직 입력된 평가가 없습니다." : { score }}
          </span>
        </div>
        <div className="c-modal-evaluate"></div>
      </div>
    </div>
  );
}

export default Modal;
