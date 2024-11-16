import style from "./StyledSignup.css";

function Signup() {
  return (
    <>
      <div className="container">
        <img
          src={`${process.env.PUBLIC_URL}/img/main-bg.png`}
          alt="bg"
          className="main-bg"
        />
        <div className="signup-form">
          <div className="signup">회원가입</div>
          <div className="signup-wp">
            <span className="signup-email">이메일</span>
            <input
              style={{ marginBottom: "10px" }}
              className="signup-input"
              placeholder="이메일 주소를 입력해 주세요."
            />
            <span className="signup-pw">비밀번호</span>
            <input
              className="signup-input"
              placeholder="비밀번호를 입력해 주세요."
            />{" "}
            <span className="signup-pw">비밀번호 확인</span>
            <input
              className="signup-input"
              placeholder="다시 한번 입력해 주세요."
            />
          </div>
          <button className="signup-btn">회원가입</button>
        </div>
      </div>
    </>
  );
}

export default Signup;
