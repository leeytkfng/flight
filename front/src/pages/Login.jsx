import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../style/Login.css"

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get("http://localhost:5000/users");

            const user = response.data.find(
                (user) => user.username === username && user.password === password
            );

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/");
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="login-page">
            <h2>로그인</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div>
                    <label htmlFor="username">이메일</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">로그인</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <p onClick={() => navigate("/signup")} className="signup-link">
                계정이 없으신가요? 회원가입
            </p>
        </div>
    );
}

export default Login;
