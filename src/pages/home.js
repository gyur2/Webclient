import { useNavigate } from "react-router-dom";
import styles from "./home.css";
import { useCallback } from "react";

const Home = () => {
    const navigate = useNavigate();
    const gologinClick = useCallback(() => {
        navigate("/login");
    }, []);

    const onGroupButtonClick = useCallback(() => {
        navigate("/signup");
    }, []);
    const goCanvasClick = useCallback(() => {
        navigate("/canvas");
    }, []);
    return (
        <div className="home-container">
            <header className="home-header">
                <img src="/mindmapcraft.png" alt="Minecraft Icon" className="minecraft-icon" />
                <div className="auth-buttons">
                    <button className="login-button" onClick={gologinClick}>로그인</button>
                    <button className="signup-button" onClick={onGroupButtonClick}>회원가입</button>
                </div>
            </header>
            <main className="home-main">
                <section className="intro-section">
                    <div className="intro-text">
                        <h2>당신을 위한 새로운 마인드맵</h2>
                        <p>ChatGPT 연동 단어 추천 마인드맵, <strong>Mindmapcraft</strong>에 오신 것을 환영합니다.</p>
                        <p>해당 프로젝트는 WebclientComputing 과제로 제작되었습니다.</p>
                        <button className="start-button" onClick={goCanvasClick}>시작하기</button>
                    </div>
                    <div className="intro-image">
                        <img src="/mindmapcraft_LOGO.png" alt="logo-image" className="logo-image" />
                    </div>
                </section>
                <section className="info-section">
                    <div className="info-content">
                        <div className="info-image">
                            <img src="/mindmap.png" alt="Mindmap Image" className="mindmap-image" />
                        </div>
                        <div className="info-text">
                            <h2>마인드맵이란?</h2>
                            <p>아이디어나 정보를 시각적으로 구조화하고 표현하는 도구입니다.</p>
                            <p>중심으로 뻗어나가는 가지들을 그림으로 나타내어 관련된 정보를 쉽게 시각화하여 보여줍니다.</p>
                        </div>
                    </div>
                </section>
                <section className="advantages-section">
                    <div className="advantages-grid">
                        <img src="/mindmapcraft.png" alt="Minecraft Icon" className="minecraft-icon2" />
                        <h2>의 이점</h2>
                    </div>
                    <div className="advantages-grid">
                        <div className="advantage-item">
                            <img src="/clock.png" alt="효율성" />
                            <h3>효율성</h3>
                            <p>추천받으므로써 시간과 노력을 절약</p>
                        </div>
                        <div className="advantage-item">
                            <img src="magic.png" alt="개인화" />
                            <h3>개인화</h3>
                            <p>스스로에게 적합한 단어를 추천</p>
                        </div>
                        <div className="advantage-item">
                            <img src="dart.png" alt="단일화" />
                            <h3>단일화</h3>
                            <p>한 기능에 집중함으로써 간편한 사용</p>
                        </div>
                        <div className="advantage-item">
                            <img src="light.png" alt="최신화" />
                            <h3>최신화</h3>
                            <p>계속 새로운 것으로 업데이트된 정보 수신</p>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="home-footer">
                <p>Mindmapcraft-Chatgpt연동 단어 추천 마인드맵</p>
                <p>이름: 김규리 | 학번: 20203031 | 과목: 웹클라이언트컴퓨팅 | 분반: 3</p>
                <p>메일: gyur2@kookmin.ac.kr</p>
            </footer>
        </div>
    );
};

export default Home;