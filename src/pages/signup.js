import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../autho';
import styles from "./signup.css";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(authService, email, password);
      const user = userCredential.user;
      console.log(user);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const gologinClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="container">
      <div className="tips-container">
        <img alt="tips" src="/tip1.png" className="tip-image" />

        <div className="form-container">

          <p className="title">회원가입</p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={onSubmit}>
            <input
              type="text"
              className="Inputform"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              className="Inputform"
              placeholder="이메일주소"
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
            <input
              type="password"
              className="Inputform"
              placeholder="비밀번호 확인"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <button type="submit" className="normalbutton">회원가입하기</button>
          </form>
          <div className={styles.newUserContainer}>
            <div className={styles.parent}>
              <div className="go-signup" onClick={gologinClick}>
                이미 회원이시라면? 로그인하러 가기
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

export default Signup;
