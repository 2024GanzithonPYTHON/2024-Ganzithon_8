import React, { useState } from "react";
import style from "./StyledWrite.css";

function Write() {
  const [isPublic, setIsPublic] = useState(false);

  const togglePrivacy = () => {
    setIsPublic((prev) => !prev);
  };

  return (
    <>
      <div className="container">
        <div className="write-nav">
          <button className="write-backBtn">
            <img
              src={`${process.env.PUBLIC_URL}/img/write-backBtn.png`}
              alt="back button"
            />
          </button>
          RECORD WITH
          <button className="write-completeBtn">
            <img
              src={`${process.env.PUBLIC_URL}/img/write-completeBtn.png`}
              alt="back button"
            />
          </button>
          <div className="toggleBtn">
            <input
              type="checkbox"
              id="toggleBtn"
              checked={isPublic}
              onChange={togglePrivacy}
            />
            <label htmlFor="toggleBtn"></label>
          </div>
        </div>
        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          className="write-title-input"
        />
        <div className="write-date">
          <img
            src={`${process.env.PUBLIC_URL}/img/write-cal-icon.png`}
            alt="calendar icon"
            style={{ position: "absolute", top: "3px", left: "2px" }}
          />
          <input type="date" className="write-date-input" />
        </div>
        <div className="write-content">
          <img
            src={`${process.env.PUBLIC_URL}/img/write-record-icon.png`}
            alt="record icon"
            style={{ position: "absolute", top: "6px" }}
          />
          <textarea
            className="write-content-input"
            placeholder="오늘 하루를 기록하세요."
          />
          <div className="write-word-count">0/500</div>
        </div>
        <div className="write-addpic">
          <img
            src={`${process.env.PUBLIC_URL}/img/write-addPic.png`}
            alt=""
            style={{ height: "110px" }}
          />
          <input
            type="file"
            name="file"
            accept="image/gif,image/jpeg,image/png"
            multiple
            className="write-addpic-btn"
            style={{ width: "110px", height: "110px" }}
            for="uploadImg"
          />
        </div>
        <div className="write-img-count">0/5개</div>
      </div>
    </>
  );
}

export default Write;
