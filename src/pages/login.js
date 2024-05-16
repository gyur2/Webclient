import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../autho';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onButtonClick = useCallback(async () => {
    try {
      await signInWithEmailAndPassword(authService, email, password);
      navigate("/");
    } catch (error) {
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.");
    }
  }, [email, password, navigate]);

  const gosinupClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <div className="container">
      <div className="tips-container">
        <img alt="tips" src="/tip1.png" className="tip-image" />
        <div className="form-container">
          <p className="title">로그인</p>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            className="Inputform"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="Inputform"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="normalbutton" onClick={onButtonClick}>로그인하기</button>
          <div className="newUserContainer">
            <div className="parent">
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
