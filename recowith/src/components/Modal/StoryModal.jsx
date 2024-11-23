import React, { useState } from "react";
import axios from "axios";
import "./StyledCModal.css";

function StoryModal({ onClose, date, title, content, image, id }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    try {
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);

      const endpoint = newLikedState ? `/like/${id}` : `/unlike/${id}`;
      const response = newLikedState
        ? await axios.post(endpoint)
        : await axios.delete(endpoint);

      if (response.status !== 200) {
        throw new Error(`Failed to ${newLikedState ? "like" : "unlike"}`);
      }

      console.log(
        `Successfully ${newLikedState ? "liked" : "unliked"} diary ${id}`
      );
    } catch (error) {
      console.error(error);
      setIsLiked((prevState) => !prevState);
    }
  };

  return (
    <div className="c-modal-overlay">
      <div className="c-modal-prof-wp" style={{ height: "auto", top: "35%" }}>
        <div className="c-modal-close" onClick={onClose}>
          <img src={`${process.env.PUBLIC_URL}/img/closeBtn.png`} alt="Close" />
        </div>
        <div className="c-modal-profImg-wp">
          <img
            src={
              image === null ? `${process.env.PUBLIC_URL}/img/prof.png` : image
            }
            alt="profile img"
            className="c-modal-profImg"
            style={{ marginTop: "20px" }}
          />
          <div className="c-modal-innerCircle" style={{ top: "18px" }}></div>
        </div>
        <div className="c-modal-date-wp">
          <div className="c-modal-profDate">{date}</div>
          <div className="c-modal-profTitle">{title}</div>
        </div>
        <div className="c-modal-content">{content}</div>
        <div className="c-modal-score-wp"></div>
        <div className="likeBtn" onClick={handleLikeClick}>
          <img
            src={`${process.env.PUBLIC_URL}/img/${
              isLiked ? "clickedlikeBtn.png" : "likeBtn.png"
            }`}
            alt="like button"
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}

export default StoryModal;
