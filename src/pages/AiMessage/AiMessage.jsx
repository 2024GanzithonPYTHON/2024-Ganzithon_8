import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import BackButton from '../../components/BackButton/BackButton';
import './AiMessage.css';

const AiMessage = () => {
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); 
  const [confirmationMessage, setConfirmationMessage] = useState(''); 

  useEffect(() => {
    const fetchAiMessage = async () => {
      try {
        setLoading(true);
        // API URL 수정
        const response = await fetch('/gpt/message');
        const data = await response.json();
        setMessage(data.message || 'AI 메시지를 가져올 수 없습니다.');
        setImageUrl(data.imageUrl || '');
      } catch (error) {
        console.error('Error fetching AI message:', error);
        setMessage('메시지를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAiMessage();
  }, []);

  const handleSaveClick = () => {
    setShowPopup(true);
  };

  const handleCancelClick = () => {
    setShowPopup(false);
  };

  const handleConfirmClick = async () => {
    try {
      const response = await fetch('/api/save-positive-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, imageUrl }),
      });

      if (response.ok) {
        setConfirmationMessage('저장되었습니다.');
      } else {
        setConfirmationMessage('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      setConfirmationMessage('저장에 실패했습니다.');
    } finally {
      setShowPopup(false); 
    }
  };

  return (
    <div className="aimessage-container">
      <BackButton />
      <h2 className="aimessage-title">오늘의 긍정 메세지</h2>
      <p className="aimessage-subtitle">AI가 주는 오늘의 메세지를 확인해 보세요.</p>

      <div className="aimessage-card">
        <div className="image-container-wrapper">
          <div className="image-container">
            {imageUrl ? (
              <img src={imageUrl} alt="Diary entry" className="diary-image" />
            ) : (
              !loading && <p className="placeholder-text">이미지가 없습니다.</p>
            )}
          </div>
        </div>
        <div className="aimessage-content">
          {loading ? <p>로딩 중...</p> : <p>{message}</p>}
        </div>
        <NavigationBar />
      </div>
      <button className="submit-button" onClick={handleSaveClick}>저장하기</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>작성한 내용을 저장하시겠습니까?</p>
            <hr className="horizontal-divider" />
            <div className="popup-buttons">
              <button className="cancel-button" onClick={handleCancelClick}>취소</button>
              <div className="divider" />
              <button className="confirm-button" onClick={handleConfirmClick}>확인</button>
            </div>
          </div>
        </div>
      )}

      {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
    </div>
  );
};

export default AiMessage;
