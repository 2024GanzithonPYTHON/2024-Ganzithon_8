import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const navItems = [
    {
      path: "/community",
      icon: "main-com.png",
      activeIcon: "main-com-col.png",
    },
    {
      path: "/write",
      icon: "main-write.png",
      activeIcon: "main-write-col.png",
    },
    { path: "/main", icon: "main-home.png", activeIcon: "main-home-col.png" },
    {
      path: "/diary-review",
      icon: "main-chart.png",
      activeIcon: "main-chart-col.png",
    },
  ];

  return (
    <div className="navigation-bar">
      {navItems.map((item) => (
        <div
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`nav-item ${activePage === item.path ? "active" : ""}`}
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
