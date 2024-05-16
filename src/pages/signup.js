import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signup.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');


  const navigate = useNavigate();

  const gologinClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="container">
      <div className="tips-container">
        <img alt="tips" src="/tip2.png" className="tip-image" />
        <div className="form-container">
          <img alt="brand" src="/Mindmapcraft.png" className="brand" />
          <p className="title">회원가입</p>

          <input type="text" className="Inputform" placeholder="이름" />
          <input type="email" className="Inputform" placeholder="이메일" />
          <input type="password" className="Inputform" placeholder="비밀번호" />
          <input type="password" className="Inputform" placeholder="비밀번호 확인" />
          <button type="submit" className="normalbutton">회원가입하기</button>

          <div className={styles.newUserContainer}>
            <div className={styles.parent}>
              <div className="go-signup" onClick={gologinClick}>
                로그인하러 가기
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
