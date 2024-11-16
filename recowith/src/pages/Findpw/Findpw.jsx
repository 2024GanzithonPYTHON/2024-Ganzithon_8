import style from "./StyledFindpw.css";

function Findpw() {
  return (
    <>
      <div className="container">
        <img
          src={`${process.env.PUBLIC_URL}/img/main-bg.png`}
          alt="bg"
          className="main-bg"
        />
        <div className="findpw-form">
          <div className="findpw">비밀번호 찾기</div>
          <div className="findpw-greeting">
            기존에 기입하신 이메일을 입력하시면,
            <br />
            비밀번호 변경 메일을 발송해 드립니다.
          </div>
          <div className="findpw-wp">
            <span className="findpw-email">이메일</span>
            <input
              style={{ marginBottom: "10px" }}
              className="findpw-input"
              placeholder="이메일 주소를 입력해 주세요."
            />
          </div>
          <button className="findpw-email-btn">비밀번호 변경 메일 받기</button>
        </div>
      </div>
    </>
  );
}

export default Findpw;
