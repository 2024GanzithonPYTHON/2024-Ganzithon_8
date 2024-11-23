import style from "./StyledCModal.css";
import React from "react";
import "./StyledCModal.css";

function StoryModal({ onClose, date, title, content }) {
  return (
    <div className="c-modal-overlay">
      <div className="c-modal-prof-wp" style={{ height: "auto", top: "35%" }}>
        <div className="c-modal-close" onClick={onClose}>
          <img src={`${process.env.PUBLIC_URL}/img/closeBtn.png`} alt="Close" />
        </div>
        <div className="c-modal-profImg-wp">
          <img
            src={`${process.env.PUBLIC_URL}/img/prof.png`}
            alt="profile img"
            className="c-modal-profImg"
            style={{ marginTop: "20px" }}
          />
          <div className="c-modal-innerCircle"></div>
        </div>
        <div className="c-modal-date-wp">
          <div className="c-modal-profDate">{date}</div>
          <div className="c-modal-profTitle">{title}</div>
        </div>
        <div className="c-modal-content">{content}</div>
        <div className="c-modal-score-wp"></div>
      </div>
    </div>
  );
}

export default StoryModal;
