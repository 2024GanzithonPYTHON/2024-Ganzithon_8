import React, { useState } from "react";
import style from "./StyledWrite.css";

function Write() {
  const [isPublic, setIsPublic] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);
  const [wordCount, setWordCount] = useState(0);

  const togglePrivacy = () => {
    setIsPublic((prev) => {
      const newState = !prev;
      setIsVisible(newState);
      return newState;
    });
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length <= 5) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    } else {
      alert("이미지는 5개까지 업로드 가능합니다.");
    }
  };

  const handleContentChange = (event) => {
    const newContent = event.target.value;
    setContent(newContent);
    setWordCount(newContent.length);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !content) {
      alert("제목과 내용은 필수 입력 사항입니다.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("createdAt", date);
    formData.append("isVisible", isVisible);
    for (let i = 0; i < images.length; i++) {
      formData.append("diaryImage", images[i]);
    }

    try {
      const response = await fetch("/api/diary/save", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.status === 0) {
        alert("일기가 성공적으로 저장되었습니다!");
        setTitle("");
        setContent("");
        setDate("");
        setImages([]);
        setWordCount(0);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("저장을 실패했습니다. 다시 시도해주세요!");
    }
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
          <button className="write-completeBtn" onClick={handleSubmit}>
            <img
              src={`${process.env.PUBLIC_URL}/img/write-completeBtn.png`}
              alt="complete button"
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="write-date">
          <img
            src={`${process.env.PUBLIC_URL}/img/write-cal-icon.png`}
            alt="calendar icon"
            style={{ position: "absolute", top: "3px", left: "2px" }}
          />
          <input
            type="date"
            className="write-date-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
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
            value={content}
            onChange={handleContentChange}
          />
          <div className="write-word-count">{wordCount}/500</div>
        </div>
        <div className="write-addpic">
          <img
            src={`${process.env.PUBLIC_URL}/img/write-addPic.png`}
            alt="upload image"
            style={{ height: "110px" }}
          />
          <input
            type="file"
            name="file"
            accept="image/gif,image/jpeg,image/png"
            multiple
            className="write-addpic-btn"
            style={{ width: "110px", height: "110px" }}
            onChange={handleImageChange}
          />
        </div>
        <div className="write-img-count">{images.length}/5개</div>
        <div className="write-img-preview">
          {images.length > 0 &&
            images.map((image, index) => (
              <div key={index} className="write-img-item">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`preview-${index}`}
                  className="write-img-preview-item"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Write;  