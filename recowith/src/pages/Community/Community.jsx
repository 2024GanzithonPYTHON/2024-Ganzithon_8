import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import BackButton from "../../components/BackButton/BackButton";
import "./Community.css";
import HihiImage from "../../components/Images/hihi.png";

const Community = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/diary/community`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();

          const mappedData = result.data.map((item) => ({
            id: item.id,
            title: item.title,
            date: item.createdAt, 
            content: item.content,
            imageUrl: item.diaryImage || HihiImage, 
            isLiked: false, 
          }));

          setCardsData(mappedData); 
        } else {
          throw new Error("Failed to fetch community data.");
        }
      } catch (error) {
        console.error("Error fetching community data:", error);
        setError("커뮤니티 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, []);

  return (
    <div className="community-container">
      <BackButton />
      <div className="top-right-button" onClick={() => navigate("/record-see")}>
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

      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="scrollable-cards-container">
          <div className="cards-container">
            {cardsData.map((card, index) => (
              <Card key={card.id} card={card} delay={index * 0.2} />
            ))}
          </div>
        </div>
      )}
      <NavigationBar />
    </div>
  );
};

const Card = ({ card, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(card.isLiked); 
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleLike = async (e) => {
    e.stopPropagation(); 
    const url = isLiked
      ? `${process.env.REACT_APP_API_URL}/unlike/${card.id}`
      : `${process.env.REACT_APP_API_URL}/like/${card.id}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsLiked(!isLiked); 
      } else {
        console.error(`Failed to ${isLiked ? "unlike" : "like"} the post.`);
      }
    } catch (error) {
      console.error(`Error during ${isLiked ? "unlike" : "like"} API call:`, error);
    }
  };

  return (
    <div
      className={`card ${isExpanded ? "expanded" : ""}`}
      onClick={toggleExpand}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="card-content-wrapper">
        <div className="record-image-wrapper1">
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

export default Community;
