import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import BackButton from "../../components/BackButton/BackButton";
import "./Community.css";
import HihiImage from "../../components/Images/hihi.png";

const Community = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const observer = useRef(); 

  // 커뮤니티 데이터 가져오기
  const fetchCommunityData = async () => {
    if (loading || !hasMore) return; 

    try {
      setLoading(true);
      const response = await axios.get( `${process.env.REACT_APP_API_URL}/diary/community`, {
        params: {
          page: page,
          size: 5,
          sort: "createdAt,desc", 
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });

      const result = response.data;

      if (result.data && Array.isArray(result.data.content)) {
        const newCards = result.data.content.map((item) => ({
          id: item.id,
          title: item.title,
          date: item.createdAt,
          content: item.content,
          imageUrl: item.diaryImage || HihiImage,
          isLiked: item.isLiked || false,
        }));

        setCardsData((prevCards) => [...prevCards, ...newCards]); 

        if (newCards.length < 5) {
          setHasMore(false); 
        }
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      console.error("Error fetching community data:", error);
      setError("커뮤니티 데이터를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityData();
  }, [page]);

  const lastCardRef = (node) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect(); 

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1); 
      }
    });

    if (node) observer.current.observe(node); 
  };

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

      {error && <p className="error-message">실패했습니다: {error}</p>}
      {!loading && cardsData.length === 0 && !error && (
        <p className="no-data-message">아직 작성된 일기가 없습니다.</p>
      )}

      <div className="scrollable-cards-container">
        <div className="cards-container">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              ref={index === cardsData.length - 1 ? lastCardRef : null} 
              className="card"
            >
              <Card card={card} delay={index * 0.2} />
            </div>
          ))}
        </div>
      </div>

      {loading && <p>로딩 중...</p>}
      {!hasMore && <p className="end-of-list-message">모든 데이터를 불러왔습니다.</p>}
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
    const url = isLiked ? `/unlike/${card.id}` : `/like/${card.id}`;

    try {
      if (isLiked) {
        const response = await axios.delete(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          setIsLiked(false);
        } else {
          console.error("Failed to unlike the post.");
        }
      } else {
        const response = await axios.post(
          url,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setIsLiked(true);
        } else {
          console.error("Failed to like the post.");
        }
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
