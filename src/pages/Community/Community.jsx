import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import BackButton from '../../components/BackButton/BackButton';
import './Community.css';
import HihiImage from '../../components/Images/hihi.png';
import '../../components/Fonts/Fonts.css';


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

const Community = () => {
  const navigate = useNavigate();
  return (
    <div className="community-container">
      <BackButton />
      <div className="top-right-button" onClick={() => navigate('/record-see')} >
        <svg
          width="23"
          height="19"
          viewBox="0 0 23 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1.5H22" stroke="#938A7E" strokeWidth="2" strokeLinecap="round" />
          <path d="M1 9.5H22" stroke="#938A7E" strokeWidth="2" strokeLinecap="round" />
          <path d="M1 17.5H22" stroke="#938A7E" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h1 className="on-the-record">ON THE RECORD</h1>
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

  const toggleLike = async (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked); // 하트버튼 강제 업데이트인데 나중에 api 백엔드랑 연동되면 지워도 될듯

    const url = isLiked ? `/unlike/${card.id}` : `/like/${card.id}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsLiked(!isLiked); // 상태 변경
      } else {
        console.error(`Failed to ${isLiked ? 'unlike' : 'like'} the post.`);
      }
    } catch (error) {
      console.error(`Error during ${isLiked ? 'unlike' : 'like'} API call:`, error);
    }
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

export default Community;    