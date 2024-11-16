import style from "./StyledLogin.css";

function Login() {
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
            <span>RECORD WITH</span> 입니다.
          </div>
          <div className="login-wp">
            <span className="login-email">이메일</span>
            <input
              style={{ marginBottom: "10px" }}
              className="login-input"
              placeholder="이메일 주소를 입력해 주세요."
            />
            <span className="login-pw">비밀번호</span>
            <input
              className="login-input"
              placeholder="비밀번호를 입력해 주세요."
            />
            <button className="login-find-pw">비밀번호를 잊으셨나요?</button>
            <button className="login-btn">로그인</button>
          </div>
          <span className="login-signup">레코윗이 처음이에요</span>
          <button className="login-signup-btn">가입하기</button>
        </div>
      </div>
    </>
  );
}

export default Login;
