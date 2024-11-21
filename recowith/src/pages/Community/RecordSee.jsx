/* import React, { useState } from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import BackButton from '../../components/BackButton/BackButton';
import './RecordSee.css';
import HihiImage from '../../components/Images/hihi.png';

const cardsData = [
  { id: 1, title: "소소한 행복, 작은 성장", date: "2024.11.06", content: "오늘은 평범하면서도 특별한 하루였다...ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ" },
  { id: 2, title: "새로운 땅, 새로운 이야기", date: "2024.11.06", content: "새로운 환경에서 새로운 사람들을 만났다..." },
  { id: 3, title: "작은 행복 찾기", date: "2024.11.06", content: "행복은 멀리 있지 않다. 오늘 느낀 작은 행복은..." },
  { id: 4, title: "마음의 날씨", date: "2024.11.06", content: "오늘의 마음은 맑음. 그러나 바람이 조금..." },
  { id: 5, title: "여행의 기록", date: "2024.11.06", content: "여행 중 느낀 생각들을 정리하고 싶었다..." },
  { id: 6, title: "가을의 끝자락", date: "2024.11.07", content: "가을의 끝에서 느낀 감정을 기록하고 싶었다..." },
  { id: 7, title: "새로운 하루", date: "2024.11.08", content: "오늘은 어제와는 또 다른 하루였다..." },
  { id: 8, title: "추억의 한 페이지", date: "2024.11.09", content: "오랜만에 추억을 되돌아보는 시간을 가졌다..." },
];

const RecordSee = () => {
  return (
    <div className="recordsee-container">
      <BackButton />
      <h1 className="record-see">레코드 모아보기</h1>
      <div className="scrollable-cards-container">
        <div className="cards-container">
          {cardsData.map((card, index) => (
            <Card key={card.id} card={card} delay={index * 0.2} />
          ))}
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

const Card = ({ card, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div
      className={`card ${isExpanded ? "expanded" : ""}`}
      onClick={toggleExpand}
      style={{ animationDelay: `${delay}s` }} 
    >
      <div className="card-content-wrapper">
        <div className="record-image-wrapper">
          <img src={HihiImage} alt="Record" className="record-image" />
        </div>
        <div className="card-text">
          <div className="card-header">
            <p className="card-date">{card.date}</p>
            <p className="card-title">{card.title}</p>
          </div>
        </div>
      </div>
      <div
        className="card-content"
        style={{
          maxHeight: isExpanded ? "500px" : "0",
          opacity: "1",
          overflow: "hidden",
          transition: "max-height 1.0s ease",
        }}
      >
        {card.content}
      </div>
      <div className="card-actions">
        <div className="card-line"></div>
        {isExpanded && (
          <button
            className={`heart-button ${isLiked ? "active" : ""}`}
            onClick={toggleLike}
          >
            ❤
          </button>
        )}
      </div>
    </div>
  );
};

export default RecordSee;    
*/

import React, { useState, useEffect } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import BackButton from "../../components/BackButton/BackButton";
import "./RecordSee.css";
import HihiImage from "../../components/Images/hihi.png";

const RecordSee = () => {
  const [likedCards, setLikedCards] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

 
  const fetchLikedCards = async () => {
    try {
      setLoading(true); 
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/diary/user/like`, 
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        const mappedData = result.data.map((item) => ({
          id: item.id,
          title: item.title,
          date: item.createdAt, 
          content: item.content,
          imageUrl: item.diaryImage || HihiImage, 
        }));
        setLikedCards(mappedData); 
      } else {
        throw new Error("Failed to fetch liked cards.");
      }
    } catch (error) {
      console.error("Error fetching liked cards:", error);
      setError("좋아요한 게시물을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchLikedCards(); 
  }, []);


  const handleUnlike = async (cardId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/unlike/${cardId}`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setLikedCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
      } else {
        console.error("Failed to unlike the card.");
      }
    } catch (error) {
      console.error("Error unliking the card:", error);
    }
  };

  return (
    <div className="recordsee-container">
      <BackButton />
      <h1 className="record-see">레코드 모아보기</h1>
      <div className="scrollable-cards-container">
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : likedCards.length > 0 ? (
          <div className="cards-container">
            {likedCards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                delay={index * 0.2}
                onUnlike={handleUnlike}
              />
            ))}
          </div>
        ) : (
          <p className="no-liked-cards">좋아요한 게시물이 없습니다.</p>
        )}
      </div>
      <NavigationBar />
    </div>
  );
};

const Card = ({ card, delay, onUnlike }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(true); 

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      onUnlike(card.id); 
    }
    setIsLiked(!isLiked); 
  };

  return (
    <div
      className={`card ${isExpanded ? "expanded" : ""}`}
      onClick={toggleExpand}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="card-content-wrapper">
        <div className="record-image-wrapper">
          <img src={card.imageUrl || HihiImage} alt="Record" className="record-image" />
        </div>
        <div className="card-text">
          <div className="card-header">
            <p className="card-date">{card.date}</p>
            <p className="card-title">{card.title}</p>
          </div>
        </div>
      </div>
      <div
        className="card-content"
        style={{
          maxHeight: isExpanded ? "500px" : "0",
          opacity: "1",
          overflow: "hidden",
          transition: "max-height 1.0s ease",
        }}
      >
        {card.content}
      </div>
      <div className="card-actions">
        <div className="card-line"></div>
        {isExpanded && (
          <button
            className={`heart-button ${isLiked ? "active" : ""}`}
            onClick={toggleLike}
          >
            ❤
          </button>
        )}
      </div>
    </div>
  );
};

export default RecordSee;


