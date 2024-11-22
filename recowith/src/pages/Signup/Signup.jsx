import React, { useState } from "react";
import axios from "axios";
import style from "./StyledSignup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  function Gologin() {
    navigate("/login");
  }

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/register",
        JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          checkPassword: formData.confirmPassword,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("회원가입이 성공적으로 완료되었습니다!");
      setErrorMessage("");
      setFormData({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      });

      Gologin();
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "회원가입에 실패했습니다."
        );
      } else if (error.request) {
        setErrorMessage("서버에서 응답이 없습니다. 다시 시도해 주세요.");
      } else {
        setErrorMessage(
          "요청을 처리하는 중 문제가 발생했습니다. 다시 시도해 주세요."
        );
      }
    }
  };

  return (
    <div className="container">
      <img
        src={`${process.env.PUBLIC_URL}/img/main-bg.png`}
        alt="bg"
        className="main-bg"
      />
      <div className="signup-form">
        <div className="signup">회원가입</div>
        <form className="signup-wp" onSubmit={handleSubmit}>
          <span className="signup-email">이메일</span>
          <input
            style={{ marginBottom: "10px" }}
            className="signup-input"
            placeholder="이메일 주소를 입력해 주세요."
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <span className="signup-name">이름</span>
          <input
            style={{ marginBottom: "10px" }}
            className="signup-input"
            placeholder="이름을 입력해 주세요."
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <span className="signup-pw">비밀번호</span>
          <input
            type="password"
            className="signup-input"
            placeholder="비밀번호를 8자 이상 입력해 주세요."
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="signup-pw">비밀번호 확인</span>
          <input
            type="password"
            className="signup-input"
            placeholder="다시 한번 입력해 주세요."
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
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
          {successMessage && (
            <p
              className="success-message"
              style={{
                color: "blue",
                fontFamily: "Pretendard Variable",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "180%",
              }}
            >
              {successMessage}
            </p>
          )}
          <button type="submit" className="signup-btn">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
