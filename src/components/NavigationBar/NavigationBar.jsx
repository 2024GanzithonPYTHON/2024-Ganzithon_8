import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 라우트 정보 가져오기
  const [activePage, setActivePage] = useState(location.pathname); // 초기값: 현재 라우트 경로

  // 라우트 변경 시 activePage 업데이트
  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { path: '/community', icon: 'main-com.png', activeIcon: 'main-com-col.png' },
    { path: '/diary-compare', icon: 'main-write.png', activeIcon: 'main-write-col.png' },
    { path: '/home',  icon: 'main-home.png', activeIcon: 'main-home-col.png' },
    { path: '/diary-review', icon: 'main-chart.png', activeIcon: 'main-chart-col.png' },
  ];

  return (
    <div className="navigation-bar">
      {navItems.map((item) => (
        <div
          key={item.path}
          onClick={() => navigate(item.path)} // 클릭 시 바로 라우팅
          className={`nav-item ${activePage === item.path ? 'active' : ''}`} // 활성화된 아이템에 클래스 추가
        >
          <img
            src={
              activePage === item.path
                ? require(`../Images/${item.activeIcon}`)
                : require(`../Images/${item.icon}`)
            }
            alt={item.label}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default NavigationBar;
