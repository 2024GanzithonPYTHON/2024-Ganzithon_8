import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./StyledLogin.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const payload = new URLSearchParams();
      payload.append("email", formData.email);
      payload.append("password", formData.password);

      const response = await axios.post("/api/login", payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.status === 200) {
        navigate("/main");
      } else {
        setErrorMessage(response.data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      setErrorMessage("이메일과 비밀번호 확인 후 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <div className="container">
        <img
          src={`${process.env.PUBLIC_URL}/img/main-bg.png`}
          alt="bg"
          className="main-bg"
        />
        <div className="login-form">
          <div className="login-greeting">
            <span className="login-greet1">안녕하세요😊</span>
            <span style={{ fontFamily: "Aboreto", fontWeight: "600" }}>
              RECORD WITH
            </span>{" "}
            입니다.
          </div>
          <div className="login-wp">
            <span className="login-email">이메일</span>
            <input
              style={{ marginBottom: "10px" }}
              className="login-input"
              placeholder="이메일 주소를 입력해 주세요."
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <span className="login-pw">비밀번호</span>
            <input
              type="password"
              className="login-input"
              placeholder="비밀번호를 입력해 주세요."
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              className="login-find-pw"
              onClick={() => {
                navigate("/findpw");
              }}
            >
              비밀번호를 잊으셨나요?
            </button>
            {errorMessage && (
              <p
                className="error-message"
                style={{
                  color: "red",
                  fontFamily: "Pretendard Variable",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: "180%",
                }}
              >
                {errorMessage}
              </p>
            )}
            <button className="login-btn" onClick={handleLogin}>
              로그인
            </button>
          </div>
          <span className="login-signup">레코윗이 처음이에요</span>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="login-signup-btn"
          >
            가입하기
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
