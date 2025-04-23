import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        setIsLoggedIn(!!user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <div className="header">
            <h1 onClick={() => navigate("/")} className="logo">Airplanit</h1>

            <nav className="nav-menu">
                <span onClick={() => navigate("/flight")}>항공권</span>
                <span onClick={() => navigate("/")}>공지사항</span>
                <span onClick={() => navigate("/")}>이벤트</span>
                <span onClick={() => navigate("/")}>고객센터</span>
            </nav>

            <div className="header-buttons">
                {isLoggedIn ? (
                    <>
                        <button className="mypage-btn" onClick={() => navigate("/mypage")}>마이 페이지</button>
                        <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <button className="login-btn" onClick={() => navigate("/login")}>로그인</button>
                        <button className="signup-btn" onClick={() => navigate("/signup")}>회원가입</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
