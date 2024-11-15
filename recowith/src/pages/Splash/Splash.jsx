import style from "./StyledSplash.css";

function Splash() {
  return (
    <>
      <div className="container">
        <img
          src={`${process.env.PUBLIC_URL}/img/main-bg.png`}
          alt="bg"
          className="main-bg"
        />
        <img
          src={`${process.env.PUBLIC_URL}/img/splash.png`}
          alt="splash"
          className="splash-logo"
        />{" "}
        <button className="btn-start">시작하기</button>
      </div>
    </>
  );
}

export default Splash;
