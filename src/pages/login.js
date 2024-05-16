import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.css";

const Login = () => {
  const navigate = useNavigate();


  const onButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const gosinupClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);



  return (
    <div className="container">
      <div className="tips-container">
        <img alt="tips" src="/tip1.png" className="tip-image" />
        <div className="form-container">
          <img alt="brand" src="/Mindmapcraft.png" className="brand" />
          <p className="title">로그인</p>

          <input type="text" className="Inputform" placeholder="이메일" />
          <input type="password" className="Inputform" placeholder="비밀번호" />
          <button type="submit" className="normalbutton" onClick={onButtonClick}>로그인하기</button>
          <div className={styles.newUserContainer}>
            <div className={styles.parent}>
              <div className="go-signup" onClick={gosinupClick}>
                아직 회원이 아니신가요?
              </div>
            </div>
          </div>

          <div className="logo-container">
            <img alt="Logo" src="/mindmapcraft_LOGO.png" className="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
