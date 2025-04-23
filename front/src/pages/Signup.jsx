import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../style/Signup.css"

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);


    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users', {
                username,
                password,
                name,
            });

            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="signup-page">
            <h2>회원가입</h2>
            <form onSubmit={handleSignup} className="signup-form">
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
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                <button type="submit">회원가입</button>
                {error && <p className="error-message">{error}</p>}
                <p onClick={() => navigate("/login")} className="login-link">
                    이미 계정이 있으신가요? 로그인
                </p>
            </form>
        </div>
    );
}

export default Signup;